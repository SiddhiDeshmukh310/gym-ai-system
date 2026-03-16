from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# Config
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///apexgym.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "apex_gym_ai_super_secure_secret_key_2026_system_backend"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=7)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ── MODELS ──

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    age = db.Column(db.Integer)
    weight = db.Column(db.Float)
    height = db.Column(db.String(20))
    gender = db.Column(db.String(20), default="male")
    goal = db.Column(db.String(50), default="muscle")
    plan = db.Column(db.String(20), default="Starter")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    sessions = db.relationship("Session", backref="user", lazy=True)

class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    exercise = db.Column(db.String(100), nullable=False)
    reps = db.Column(db.Integer, default=0)
    sets = db.Column(db.Integer, default=0)
    form_score = db.Column(db.Float, default=0)
    calories = db.Column(db.Float, default=0)
    duration = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ── AUTH ROUTES ──
@app.route("/")
def home():
    return "Gym AI Backend Running 🚀"
@app.route("/api/signup", methods=["POST"])
def signup():
    data = request.get_json()
    
    if not data.get("email") or not data.get("password") or not data.get("name"):
        return jsonify({"error": "Name, email and password are required"}), 400
    
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already registered"}), 409
    
    hashed = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    
    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed,
        age=data.get("age"),
        weight=data.get("weight"),
        gender=data.get("gender", "male"),
        goal=data.get("goal", "muscle"),
    )
    
    db.session.add(user)
    db.session.commit()
    
    token = create_access_token(identity=user.id)
    
    return jsonify({
        "message": "Account created successfully",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "gender": user.gender,
            "goal": user.goal,
        }
    }), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password required"}), 400
    
    user = User.query.filter_by(email=data["email"]).first()
    
    if not user or not bcrypt.check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid email or password"}), 401
    
    token = create_access_token(identity=user.id)
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "plan": user.plan,
            "gender": user.gender,
            "goal": user.goal,
        }
    }), 200


@app.route("/api/me", methods=["GET"])
@jwt_required()
def get_me():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "age": user.age,
        "weight": user.weight,
        "height": user.height,
        "gender": user.gender,
        "goal": user.goal,
        "plan": user.plan,
        "created_at": user.created_at.isoformat(),
    })


@app.route("/api/me", methods=["PUT"])
@jwt_required()
def update_me():
    user_id = get_jwt_identity()
    user = db.session.get(User, user_id)
    data = request.get_json()
    
    if data.get("name"): user.name = data["name"]
    if data.get("age"): user.age = data["age"]
    if data.get("weight"): user.weight = data["weight"]
    if data.get("height"): user.height = data["height"]
    if data.get("gender"): user.gender = data["gender"]
    if data.get("goal"): user.goal = data["goal"]
    
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})


# ── SESSION ROUTES ──

@app.route("/api/sessions", methods=["POST"])
@jwt_required()
def save_session():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    session = Session(
        user_id=user_id,
        exercise=data.get("exercise", "Unknown"),
        reps=data.get("reps", 0),
        sets=data.get("sets", 0),
        form_score=data.get("formScore", 0),
        calories=data.get("calories", 0),
        duration=data.get("duration", 0),
    )
    
    db.session.add(session)
    db.session.commit()
    
    return jsonify({
        "message": "Session saved",
        "session_id": session.id
    }), 201


@app.route("/api/sessions", methods=["GET"])
@jwt_required()
def get_sessions():
    user_id = get_jwt_identity()
    sessions = Session.query.filter_by(user_id=user_id).order_by(Session.created_at.desc()).limit(50).all()
    
    return jsonify([{
        "id": s.id,
        "exercise": s.exercise,
        "reps": s.reps,
        "sets": s.sets,
        "formScore": s.form_score,
        "calories": s.calories,
        "duration": s.duration,
        "date": s.created_at.isoformat(),
    } for s in sessions])


@app.route("/api/sessions/stats", methods=["GET"])
@jwt_required()
def get_stats():
    user_id = get_jwt_identity()
    sessions = Session.query.filter_by(user_id=user_id).all()
    
    if not sessions:
        return jsonify({
            "totalSessions": 0,
            "totalReps": 0,
            "totalCalories": 0,
            "avgFormScore": 0,
        })
    
    return jsonify({
        "totalSessions": len(sessions),
        "totalReps": sum(s.reps for s in sessions),
        "totalCalories": round(sum(s.calories for s in sessions)),
        "avgFormScore": round(sum(s.form_score for s in sessions) / len(sessions), 1),
    })


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "message": "APEX GYM API running"})
@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Route not found"}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        print("✅ Database created!")
    app.run(debug=True, port=5000)
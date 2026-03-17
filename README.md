# 🏋️ APEX GYM — AI-Powered Gym Management System

> India's most advanced gym management platform with real-time AI pose detection, personalized diet plans, class scheduling, and smart progress tracking.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)
![Python](https://img.shields.io/badge/Python-Flask-3776AB?style=flat&logo=python)
![MediaPipe](https://img.shields.io/badge/Google-MediaPipe-4285F4?style=flat&logo=google)
![SQLite](https://img.shields.io/badge/Database-SQLite-003B57?style=flat&logo=sqlite)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat&logo=jsonwebtokens)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat&logo=vite)
Link : 'gym-ai-system-git-main-siddhideshmukh310s-projects.vercel.app'
---

## 📖 What is APEX GYM?

APEX GYM is a **full-stack AI-powered gym management system** built with React + Vite on the frontend and Python Flask on the backend. It combines traditional gym management features like member tracking, class scheduling, and diet planning with cutting-edge **real-time AI pose detection** using Google MediaPipe — all in one premium dark-themed web application.

The system tracks 33 body landmarks in real time through your webcam, automatically counts reps, calculates form scores, and saves complete workout sessions to a database — making it a complete AI personal trainer accessible from any browser.

---

## ✨ Key Features

### 🤖 AI Trainer
- Real-time pose detection using Google MediaPipe
- 33-point body skeleton rendered on HTML Canvas
- Color-coded joints — green (good), amber (warning), red (danger)
- Automatic rep counting using joint angle thresholds
- Live form score 0–100 calculated every frame
- 5 exercises — Bicep Curl, Squat, Pushup, Shoulder Press, Tricep Extension
- Session timer, calorie tracker, rep history bars
- Complete session summary saved to database

### 📊 Dashboard
- 6 KPI cards with live data
- Gym occupancy bar chart
- Weekly revenue visualization
- Plan distribution donut chart
- Member growth SVG line chart
- Form score trend bars
- Recent sessions table
- Today's class schedule

### 👥 Members & Exercises
- Member cards with form score tracking
- Family profiles for Male, Female and Child
- Personalized workout plans per profile
- 70+ exercises across 8 categories
- Search and filter by muscle group
- Difficulty level badges

### 📅 Class Scheduling
- Full 7-day class schedule
- Real-time capacity tracking
- One-click class booking and cancellation
- Day timeline visualization
- Class type breakdown chart

### 🥗 Smart Diet Plans
- Separate plans for Male, Female and Child
- 3 goal options per profile
- Complete 7-day meal plans with 5 meals per day
- Macro split donut chart (protein/carbs/fats)
- Daily calorie progress bars
- Supplement recommendations
- Hydration tracker

### 📈 Analytics
- Sessions, calories, form score, reps charts
- Period selector — week, month, 3 months, year
- SVG line chart for form score trends
- Exercise breakdown with progress bars
- Muscle group donut chart
- Personal bests tracker
- Achievement badges system

### 👤 User Profile
- Editable personal information
- Gender and goal selector
- Session history with scores
- Notification toggle switches
- Password change
- Membership management

### 🔔 Notifications
- Slide-in panel from sidebar
- Filter by type — success, warning, info
- Mark all as read
- Click to navigate to relevant page
- Unread count badge

### 🔐 Authentication
- JWT token-based login
- Password hashing with Bcrypt
- 3-step signup with profile setup
- Protected API routes

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | UI framework |
| Routing | React Router DOM v6 | Page navigation |
| AI Detection | Google MediaPipe Pose | Body tracking |
| Rendering | HTML Canvas API | Skeleton overlay |
| Styling | CSS-in-JS inline styles | No dependencies |
| Backend | Python Flask | REST API |
| Database | SQLite + SQLAlchemy | Data storage |
| Auth | JWT + Flask-Bcrypt | Security |
| CORS | Flask-CORS | Cross-origin |

---

## 📁 Project Structure
gym-ai-system/
│
├── frontend/                        # React + Vite application
│   ├── public/
│   │   ├── gym-hero.jpeg            # Hero section background
│   │   ├── gym-sunset.jpeg          # AI section background
│   │   ├── gym-weights.jpeg         # Motivational banner
│   │   └── diet-chart.jpeg          # Diet section image
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── sidebar.jsx          # Navigation sidebar with notifications
│   │   │   └── Notifications.jsx    # Slide-in notification panel
│   │   │
│   │   ├── pages/
│   │   │   ├── home.jsx             # Landing page with 3D slider
│   │   │   ├── Login.jsx            # JWT login page
│   │   │   ├── Signup.jsx           # 3-step signup flow
│   │   │   ├── Dashboard.jsx        # KPIs and charts command center
│   │   │   ├── AITrainer.jsx        # Live MediaPipe detection session
│   │   │   ├── Members.jsx          # Members + exercise library
│   │   │   ├── Schedule.jsx         # Class booking system
│   │   │   ├── Diet.jsx             # Personalized meal plans
│   │   │   ├── Analytics.jsx        # Performance charts
│   │   │   └── Profile.jsx          # User profile and settings
│   │   │
│   │   ├── utils/
│   │   │   ├── api.js               # All API calls to Flask backend
│   │   │   └── mediapipePose.js     # MediaPipe utilities
│   │   │
│   │   ├── App.jsx                  # Route definitions
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global reset styles
│   │
│   ├── index.html
│   └── package.json
│
└── backend/                         # Python Flask REST API
├── app.py                       # Main app — routes and models
├── pose_detection.py            # MediaPipe pose detection logic
├── exercise_counter.py          # Rep and angle counting logic
└── requirements.txt             # Python dependencies

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.8+
- A modern browser with webcam

### 1. Clone the repository
```bash
git clone https://github.com/SiddhiDeshmukh310/gym-ai-system.git
cd apex-gym
```
[12:06 am, 17/03/2026] Siddhi: cd frontend
npm install
npm run dev
cd backend
pip install -r requirements.txt
python app.py
Backend runs at → http://localhost:5000
---

1. Browser requests webcam via getUserMedia()
        ↓
2. Video frames sent to MediaPipe Pose model
        ↓
3. Model returns 33 landmark coordinates (x, y, z)
        ↓
4. React draws skeleton lines on HTML <canvas>
        ↓
5. Elbow angles calculated:
   angle = Math.atan2(wrist - elbow) - Math.atan2(shoulder - elbow)
        ↓
6. Rep counted when angle crosses threshold:
   angle > 160° → stage = "down"
   angle < 40°  → stage = "up" → rep++
        ↓
7. Form score = 100 if angle 60-90°
              = 75  if angle 40-120°
              = 40  otherwise
        ↓
8. Session data saved to SQLite via Flask API
---

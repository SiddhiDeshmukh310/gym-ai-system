import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
 import { apiLogin } from "../utils/api"
export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPass, setShowPass] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError("")
  }

 

function handleLogin(e) {
  e.preventDefault()
  if (!form.email || !form.password) {
    setError("Please fill in all fields")
    return
  }
  setLoading(true)
  
  apiLogin({ email: form.email, password: form.password })
    .then(data => {
      setLoading(false)
      if (data.error) {
        setError(data.error)
      } else {
        navigate("/dashboard")
      }
    })
    .catch(() => {
      setLoading(false)
      setError("Server error. Make sure backend is running.")
    })
}

  const input = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.2s",
    fontFamily: "system-ui, sans-serif",
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080C14",
      display: "flex",
      fontFamily: "system-ui, sans-serif",
    }}>

      {/* LEFT PANEL */}
      <div style={{
        flex: 1,
        background: "linear-gradient(135deg, #0D1117 0%, #080C14 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Grid bg */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />

        {/* Glow */}
        <div style={{
          position: "absolute",
          top: "40%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(200,255,0,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "420px", width: "100%", textAlign: "center" }}>
          {/* Logo */}
          <div style={{
            width: "64px", height: "64px",
            background: "#C8FF00",
            borderRadius: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "28px", fontWeight: 900, color: "#080C14",
            margin: "0 auto 20px",
          }}>A</div>

          <h1 style={{
            fontSize: "32px", fontWeight: 900,
            color: "#C8FF00", letterSpacing: "4px",
            margin: "0 0 8px",
          }}>APEX GYM</h1>

          <p style={{ color: "#64748B", fontSize: "15px", marginBottom: "48px" }}>
            AI-Powered Fitness Platform
          </p>

          {/* Stats */}
          {[
            { icon: "🤖", text: "Real-time AI pose detection" },
            { icon: "📊", text: "Smart progress tracking" },
            { icon: "🥗", text: "Personalized diet plans" },
            { icon: "🏋️", text: "500+ guided exercises" },
          ].map(item => (
            <div key={item.text} style={{
              display: "flex", alignItems: "center",
              gap: "14px", marginBottom: "16px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "10px", padding: "12px 16px",
              textAlign: "left",
            }}>
              <span style={{ fontSize: "20px" }}>{item.icon}</span>
              <span style={{ color: "#94A3B8", fontSize: "14px" }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL - LOGIN FORM */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
      }}>
        <div style={{ maxWidth: "420px", width: "100%" }}>

          <div style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "32px", fontWeight: 900,
              margin: "0 0 8px", color: "white",
            }}>Welcome back</h2>
            <p style={{ color: "#64748B", fontSize: "15px", margin: 0 }}>
              Sign in to continue your fitness journey
            </p>
          </div>

          {/* Social login */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
            {["G  Google", "🍎  Apple"].map(btn => (
              <button key={btn} style={{
                flex: 1, padding: "12px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", color: "white",
                fontSize: "14px", cursor: "pointer",
                fontWeight: 600,
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.08)"}
                onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.04)"}
              >{btn}</button>
            ))}
          </div>

          {/* Divider */}
          <div style={{
            display: "flex", alignItems: "center",
            gap: "16px", marginBottom: "28px",
          }}>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
            <span style={{ color: "#64748B", fontSize: "13px" }}>or continue with email</span>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.06)" }} />
          </div>

          <form onSubmit={handleLogin}>

            {/* Email */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                color: "#94A3B8", marginBottom: "8px",
                letterSpacing: "1px",
              }}>EMAIL</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                style={input}
                onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: "8px" }}>
              <label style={{
                display: "block", fontSize: "13px",
                color: "#94A3B8", marginBottom: "8px",
                letterSpacing: "1px",
              }}>PASSWORD</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  style={{ ...input, paddingRight: "48px" }}
                  onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: "absolute", right: "14px", top: "50%",
                    transform: "translateY(-50%)",
                    background: "none", border: "none",
                    color: "#64748B", cursor: "pointer", fontSize: "16px",
                  }}
                >{showPass ? "🙈" : "👁"}</button>
              </div>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: "24px" }}>
              <span style={{
                color: "#C8FF00", fontSize: "13px",
                cursor: "pointer", fontWeight: 600,
              }}>Forgot password?</span>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "8px", padding: "12px 16px",
                color: "#EF4444", fontSize: "14px",
                marginBottom: "16px",
              }}>⚠ {error}</div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%", padding: "15px",
                background: loading ? "rgba(200,255,0,0.5)" : "#C8FF00",
                color: "#080C14", border: "none",
                borderRadius: "10px", fontSize: "15px",
                fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "2px", transition: "all 0.2s",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px",
              }}>
              {loading ? (
                <>
                  <div style={{
                    width: "16px", height: "16px",
                    border: "2px solid rgba(0,0,0,0.3)",
                    borderTop: "2px solid #080C14",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  SIGNING IN...
                </>
              ) : "SIGN IN →"}
            </button>
          </form>

          <p style={{
            textAlign: "center", marginTop: "24px",
            color: "#64748B", fontSize: "14px",
          }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{
              color: "#C8FF00", fontWeight: 700,
              textDecoration: "none",
            }}>Create one free</Link>
          </p>

          <p style={{
            textAlign: "center", marginTop: "12px",
          }}>
            <span
              onClick={() => navigate("/dashboard")}
              style={{
                color: "#475569", fontSize: "13px",
                cursor: "pointer", textDecoration: "underline",
              }}>
              Skip login → Enter as Guest
            </span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #475569; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #0D1117 inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  )
}
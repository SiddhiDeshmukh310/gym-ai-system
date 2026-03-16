import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { apiSignup } from "../utils/api"
export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "", email: "", password: "",
    gender: "", age: "", goal: "",
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleNext(e) {
  e.preventDefault()

  if (step < 3) {
    setStep(step + 1)
    return
  }

  // Step 3 → Call backend signup API
  setLoading(true)

  apiSignup({
    name: form.name,
    email: form.email,
    password: form.password,
    gender: form.gender,
    age: parseInt(form.age),
    goal: form.goal,
  })
    .then(data => {
      setLoading(false)

      if (data.error) {
        alert(data.error)
      } else {
        navigate("/dashboard")
      }
    })
    .catch(() => {
      setLoading(false)
      alert("Server error. Make sure backend is running.")
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
    fontFamily: "system-ui, sans-serif",
    transition: "border 0.2s",
  }

  const goals = [
    { id: "lose", icon: "🔥", label: "Lose Weight" },
    { id: "muscle", icon: "💪", label: "Build Muscle" },
    { id: "fit", icon: "⚡", label: "Stay Fit" },
    { id: "flex", icon: "🧘", label: "Flexibility" },
    { id: "sport", icon: "🏃", label: "Athletic" },
    { id: "health", icon: "❤️", label: "General Health" },
  ]

  const genders = [
    { id: "male", icon: "👨", label: "Male" },
    { id: "female", icon: "👩", label: "Female" },
    { id: "child", icon: "👦", label: "Child" },
  ]

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080C14",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
      padding: "40px 20px",
    }}>

      {/* Grid bg */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: `
          linear-gradient(rgba(200,255,0,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(200,255,0,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      <div style={{
        background: "#0D1117",
        border: "1px solid rgba(255,255,255,0.07)",
        borderRadius: "24px",
        padding: "48px",
        maxWidth: "520px",
        width: "100%",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "48px", height: "48px",
            background: "#C8FF00", borderRadius: "12px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "22px", fontWeight: 900, color: "#080C14",
            margin: "0 auto 12px",
          }}>A</div>
          <h2 style={{
            fontSize: "24px", fontWeight: 900,
            color: "white", margin: "0 0 4px",
          }}>Create your account</h2>
          <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>
            Start your AI-powered fitness journey
          </p>
        </div>

        {/* Step indicator */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "center", gap: "0",
          marginBottom: "36px",
        }}>
          {[1, 2, 3].map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{
                width: "32px", height: "32px",
                borderRadius: "50%",
                background: step >= s ? "#C8FF00" : "rgba(255,255,255,0.05)",
                border: step >= s
                  ? "none"
                  : "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "13px", fontWeight: 700,
                color: step >= s ? "#080C14" : "#64748B",
                transition: "all 0.3s",
              }}>{step > s ? "✓" : s}</div>
              {i < 2 && (
                <div style={{
                  width: "60px", height: "2px",
                  background: step > s
                    ? "#C8FF00"
                    : "rgba(255,255,255,0.06)",
                  transition: "background 0.3s",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Step labels */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          marginBottom: "32px", paddingBottom: "24px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}>
          {["Account", "Profile", "Goals"].map((label, i) => (
            <span key={label} style={{
              fontSize: "12px", letterSpacing: "1px",
              color: step === i + 1 ? "#C8FF00" : "#64748B",
              fontWeight: step === i + 1 ? 700 : 400,
              flex: 1, textAlign: "center",
              transition: "color 0.3s",
            }}>{label}</span>
          ))}
        </div>

        <form onSubmit={handleNext}>

          {/* STEP 1 — ACCOUNT */}
          {step === 1 && (
            <div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block", fontSize: "12px",
                  color: "#94A3B8", marginBottom: "8px",
                  letterSpacing: "1px",
                }}>FULL NAME</label>
                <input
                  name="name" type="text"
                  placeholder="John Doe"
                  value={form.name} onChange={handleChange}
                  required style={input}
                  onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                />
              </div>
              <div style={{ marginBottom: "16px" }}>
                <label style={{
                  display: "block", fontSize: "12px",
                  color: "#94A3B8", marginBottom: "8px",
                  letterSpacing: "1px",
                }}>EMAIL</label>
                <input
                  name="email" type="email"
                  placeholder="you@example.com"
                  value={form.email} onChange={handleChange}
                  required style={input}
                  onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <label style={{
                  display: "block", fontSize: "12px",
                  color: "#94A3B8", marginBottom: "8px",
                  letterSpacing: "1px",
                }}>PASSWORD</label>
                <input
                  name="password" type="password"
                  placeholder="Min 8 characters"
                  value={form.password} onChange={handleChange}
                  required style={input}
                  onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                  onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                />
              </div>

              {/* Password strength */}
              {form.password && (
                <div style={{ marginTop: "8px", marginBottom: "8px" }}>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[1,2,3,4].map(i => (
                      <div key={i} style={{
                        flex: 1, height: "3px", borderRadius: "2px",
                        background: form.password.length >= i * 2
                          ? i <= 1 ? "#EF4444"
                            : i <= 2 ? "#F59E0B"
                            : i <= 3 ? "#3B82F6" : "#22C55E"
                          : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }}/>
                    ))}
                  </div>
                  <p style={{ fontSize: "11px", color: "#64748B", margin: "4px 0 0" }}>
                    {form.password.length < 4 ? "Too short"
                      : form.password.length < 6 ? "Weak"
                      : form.password.length < 8 ? "Medium"
                      : "Strong password ✓"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 — PROFILE */}
          {step === 2 && (
            <div>
              <label style={{
                display: "block", fontSize: "12px",
                color: "#94A3B8", marginBottom: "12px",
                letterSpacing: "1px",
              }}>SELECT PROFILE</label>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                {genders.map(g => (
                  <div
                    key={g.id}
                    onClick={() => setForm({ ...form, gender: g.id })}
                    style={{
                      background: form.gender === g.id
                        ? "rgba(200,255,0,0.08)"
                        : "rgba(255,255,255,0.02)",
                      border: form.gender === g.id
                        ? "2px solid #C8FF00"
                        : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px", padding: "20px 12px",
                      textAlign: "center", cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    <div style={{ fontSize: "28px", marginBottom: "8px" }}>{g.icon}</div>
                    <div style={{
                      fontSize: "13px", fontWeight: 600,
                      color: form.gender === g.id ? "#C8FF00" : "#94A3B8",
                    }}>{g.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{
                    display: "block", fontSize: "12px",
                    color: "#94A3B8", marginBottom: "8px",
                    letterSpacing: "1px",
                  }}>AGE</label>
                  <input
                    name="age" type="number"
                    placeholder="25" min="5" max="100"
                    value={form.age} onChange={handleChange}
                    style={input}
                    onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                    onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                  />
                </div>
                <div>
                  <label style={{
                    display: "block", fontSize: "12px",
                    color: "#94A3B8", marginBottom: "8px",
                    letterSpacing: "1px",
                  }}>WEIGHT (kg)</label>
                  <input
                    name="weight" type="number"
                    placeholder="70"
                    onChange={handleChange}
                    style={input}
                    onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.4)"}
                    onBlur={e => e.target.style.border = "1px solid rgba(255,255,255,0.08)"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 — GOALS */}
          {step === 3 && (
            <div>
              <label style={{
                display: "block", fontSize: "12px",
                color: "#94A3B8", marginBottom: "12px",
                letterSpacing: "1px",
              }}>YOUR FITNESS GOAL</label>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}>
                {goals.map(g => (
                  <div
                    key={g.id}
                    onClick={() => setForm({ ...form, goal: g.id })}
                    style={{
                      background: form.goal === g.id
                        ? "rgba(200,255,0,0.08)"
                        : "rgba(255,255,255,0.02)",
                      border: form.goal === g.id
                        ? "2px solid #C8FF00"
                        : "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "12px",
                      padding: "16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      transition: "all 0.2s",
                    }}
                  >
                    <span style={{ fontSize: "22px" }}>{g.icon}</span>
                    <span style={{
                      fontSize: "14px", fontWeight: 600,
                      color: form.goal === g.id ? "#C8FF00" : "#94A3B8",
                    }}>{g.label}</span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: "20px",
                background: "rgba(200,255,0,0.04)",
                border: "1px solid rgba(200,255,0,0.1)",
                borderRadius: "10px",
                padding: "14px 16px",
                fontSize: "13px",
                color: "#94A3B8",
                lineHeight: 1.6,
              }}>
                ✨ Based on your profile, we'll generate a personalized diet plan,
                workout schedule and AI trainer settings just for you.
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: "flex", gap: "12px", marginTop: "32px" }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1, padding: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "white", borderRadius: "10px",
                  fontSize: "14px", fontWeight: 600,
                  cursor: "pointer",
                }}>← Back</button>
            )}
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 2, padding: "14px",
                background: loading ? "rgba(200,255,0,0.5)" : "#C8FF00",
                color: "#080C14", border: "none",
                borderRadius: "10px", fontSize: "15px",
                fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                letterSpacing: "1px",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "8px",
                transition: "all 0.2s",
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
                  CREATING...
                </>
              ) : step === 3 ? "CREATE ACCOUNT →" : "CONTINUE →"}
            </button>
          </div>

          {step === 1 && (
            <p style={{
              textAlign: "center", marginTop: "20px",
              color: "#64748B", fontSize: "14px",
            }}>
              Already have an account?{" "}
              <Link to="/login" style={{
                color: "#C8FF00", fontWeight: 700,
                textDecoration: "none",
              }}>Sign in</Link>
            </p>
          )}
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #475569; }
        input[type=number]::-webkit-inner-spin-button { opacity: 0; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 30px #0D1117 inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>
    </div>
  )
}
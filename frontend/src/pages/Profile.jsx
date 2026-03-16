import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [form, setForm] = useState({
    name: "Rahul Mehta",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    age: "28",
    weight: "75",
    height: "5'10\"",
    gender: "male",
    goal: "muscle",
    plan: "Pro",
    joinDate: "January 2024",
  })

  const [passwords, setPasswords] = useState({
    current: "", newPass: "", confirm: "",
  })

  const [notifications, setNotifications] = useState({
    sessionReminder: true,
    weeklyReport: true,
    classBooking: true,
    formTips: false,
    achievements: true,
    dietReminder: false,
  })

  function handleSave() {
    setSaved(true)
    setEditing(false)
    setTimeout(() => setSaved(false), 3000)
  }

  const recentSessions = [
    { exercise: "Bicep Curl", reps: 32, sets: 4, score: 94, duration: "18 min", date: "Today, 9:14 AM", color: "#C8FF00" },
    { exercise: "Squat", reps: 40, sets: 4, score: 88, duration: "22 min", date: "Yesterday, 6:30 PM", color: "#818CF8" },
    { exercise: "Pushup", reps: 25, sets: 3, score: 72, duration: "15 min", date: "Mar 14, 8:00 AM", color: "#34D399" },
    { exercise: "Shoulder Press", reps: 28, sets: 4, score: 91, duration: "20 min", date: "Mar 13, 7:45 PM", color: "#F59E0B" },
    { exercise: "Deadlift", reps: 18, sets: 3, score: 65, duration: "25 min", date: "Mar 12, 9:00 AM", color: "#F472B6" },
  ]

  const inputStyle = (editable) => ({
    width: "100%",
    padding: "12px 14px",
    background: editable ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
    border: editable ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.06)",
    borderRadius: "10px",
    color: editable ? "white" : "#94A3B8",
    fontSize: "14px",
    outline: "none",
    fontFamily: "system-ui",
    transition: "all 0.2s",
    boxSizing: "border-box",
  })

  const card = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "24px",
    marginBottom: "20px",
  }

  const label = {
    fontSize: "11px", color: "#64748B",
    letterSpacing: "1px", marginBottom: "6px",
    display: "block", textTransform: "uppercase",
  }

  return (
    <div style={{
      display: "grid", gridTemplateColumns: "220px 1fr",
      minHeight: "100vh", background: "#080C14",
      color: "white", fontFamily: "system-ui, sans-serif",
    }}>
      <Sidebar />

      <div style={{ overflowY: "auto", padding: "28px 32px" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "28px",
        }}>
          <div>
            <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "3px", marginBottom: "4px" }}>
              ACCOUNT
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, margin: 0 }}>MY PROFILE</h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {editing ? (
              <>
                <button onClick={() => setEditing(false)} style={{
                  padding: "10px 20px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 600, cursor: "pointer",
                }}>Cancel</button>
                <button onClick={handleSave} style={{
                  padding: "10px 20px", background: "#C8FF00",
                  color: "#080C14", border: "none", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 800, cursor: "pointer",
                }}>Save Changes ✓</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} style={{
                padding: "10px 20px",
                background: "rgba(200,255,0,0.08)",
                border: "1px solid rgba(200,255,0,0.2)",
                color: "#C8FF00", borderRadius: "10px",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
              }}>✏️ Edit Profile</button>
            )}
          </div>
        </div>

        {/* Saved toast */}
        {saved && (
          <div style={{
            position: "fixed", bottom: "30px", left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(34,197,94,0.4)",
            borderRadius: "10px", padding: "12px 24px",
            color: "white", fontWeight: 600, fontSize: "14px",
            backdropFilter: "blur(12px)", zIndex: 999,
          }}>
            ✅ Profile saved successfully!
          </div>
        )}

        {/* TABS */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
          {[
            { id: "profile", label: "👤 Profile" },
            { id: "sessions", label: "🤖 Sessions" },
            { id: "settings", label: "⚙️ Settings" },
          ].map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: "10px 20px", borderRadius: "10px",
              cursor: "pointer", fontWeight: 700, fontSize: "13px",
              background: activeTab === t.id ? "#C8FF00" : "rgba(255,255,255,0.03)",
              color: activeTab === t.id ? "#080C14" : "#64748B",
              border: activeTab === t.id ? "none" : "1px solid rgba(255,255,255,0.07)",
              transition: "all 0.2s",
            }}>
              <span style={{ pointerEvents: "none" }}>{t.label}</span>
            </button>
          ))}
        </div>

        {/* ── PROFILE TAB ── */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px" }}>

            {/* Left — Avatar card */}
            <div>
              <div style={{
                ...card,
                textAlign: "center",
                background: "rgba(200,255,0,0.04)",
                border: "1px solid rgba(200,255,0,0.12)",
              }}>
                {/* Avatar */}
                <div style={{
                  width: "96px", height: "96px", borderRadius: "50%",
                  background: "rgba(200,255,0,0.15)",
                  border: "3px solid rgba(200,255,0,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "36px", fontWeight: 900, color: "#C8FF00",
                  margin: "0 auto 16px",
                  boxShadow: "0 0 30px rgba(200,255,0,0.15)",
                }}>
                  {form.name.charAt(0)}
                </div>
                <div style={{ fontSize: "20px", fontWeight: 800, marginBottom: "4px" }}>{form.name}</div>
                <div style={{ fontSize: "13px", color: "#64748B", marginBottom: "16px" }}>{form.email}</div>

                {/* Plan badge */}
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  background: "rgba(200,255,0,0.1)",
                  border: "1px solid rgba(200,255,0,0.25)",
                  borderRadius: "20px", padding: "6px 16px",
                  fontSize: "12px", fontWeight: 700, color: "#C8FF00",
                  marginBottom: "20px",
                }}>
                  ⭐ {form.plan} Member
                </div>

                <div style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "16px",
                }}>
                  {[
                    { label: "Member Since", value: form.joinDate },
                    { label: "Total Sessions", value: "124" },
                    { label: "Current Streak", value: "12 days" },
                    { label: "Avg Form Score", value: "84/100" },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: "flex", justifyContent: "space-between",
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <span style={{ fontSize: "12px", color: "#64748B" }}>{item.label}</span>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: "white" }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => navigate("/ai-trainer")}
                  style={{
                    marginTop: "20px", width: "100%",
                    padding: "12px", background: "#C8FF00",
                    color: "#080C14", border: "none",
                    borderRadius: "10px", fontWeight: 800,
                    cursor: "pointer", fontSize: "14px",
                  }}>
                  🤖 Start AI Session
                </button>
              </div>

              {/* Fitness stats */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                  FITNESS STATS
                </div>
                {[
                  { label: "Weight", value: form.weight + " kg", icon: "⚖️", color: "#C8FF00" },
                  { label: "Height", value: form.height, icon: "📏", color: "#818CF8" },
                  { label: "Age", value: form.age + " yrs", icon: "🎂", color: "#34D399" },
                  { label: "Goal", value: form.goal === "muscle" ? "Build Muscle" : form.goal, icon: "🎯", color: "#F59E0B" },
                ].map(s => (
                  <div key={s.label} style={{
                    display: "flex", alignItems: "center",
                    gap: "12px", padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: `${s.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "16px", flexShrink: 0,
                    }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>{s.label}</div>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: s.color }}>{s.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Edit form */}
            <div>
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                  PERSONAL INFORMATION
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {[
                    { key: "name", label: "Full Name", type: "text" },
                    { key: "email", label: "Email Address", type: "email" },
                    { key: "phone", label: "Phone Number", type: "tel" },
                    { key: "age", label: "Age", type: "number" },
                    { key: "weight", label: "Weight (kg)", type: "number" },
                    { key: "height", label: "Height", type: "text" },
                  ].map(field => (
                    <div key={field.key}>
                      <label style={label}>{field.label}</label>
                      <input
                        type={field.type}
                        value={form[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        disabled={!editing}
                        style={inputStyle(editing)}
                        onFocus={e => editing && (e.target.style.border = "1px solid rgba(200,255,0,0.5)")}
                        onBlur={e => editing && (e.target.style.border = "1px solid rgba(200,255,0,0.3)")}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                  FITNESS PROFILE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  {/* Gender */}
                  <div>
                    <label style={label}>Profile Type</label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      {[
                        { id: "male", icon: "👨", label: "Male" },
                        { id: "female", icon: "👩", label: "Female" },
                        { id: "child", icon: "👦", label: "Child" },
                      ].map(g => (
                        <div
                          key={g.id}
                          onClick={() => editing && setForm({ ...form, gender: g.id })}
                          style={{
                            flex: 1, padding: "10px 8px",
                            background: form.gender === g.id
                              ? "rgba(200,255,0,0.08)" : "rgba(255,255,255,0.02)",
                            border: form.gender === g.id
                              ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "10px",
                            textAlign: "center", cursor: editing ? "pointer" : "default",
                            transition: "all 0.2s",
                          }}>
                          <div style={{ fontSize: "20px", marginBottom: "4px" }}>{g.icon}</div>
                          <div style={{
                            fontSize: "11px", fontWeight: 600,
                            color: form.gender === g.id ? "#C8FF00" : "#64748B",
                          }}>{g.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Goal */}
                  <div>
                    <label style={label}>Fitness Goal</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {[
                        { id: "muscle", label: "💪 Build Muscle" },
                        { id: "lose", label: "🔥 Lose Fat" },
                        { id: "maintain", label: "⚖️ Maintain" },
                        { id: "athletic", label: "⚡ Athletic" },
                      ].map(g => (
                        <div
                          key={g.id}
                          onClick={() => editing && setForm({ ...form, goal: g.id })}
                          style={{
                            padding: "8px 12px",
                            background: form.goal === g.id
                              ? "rgba(200,255,0,0.08)" : "rgba(255,255,255,0.02)",
                            border: form.goal === g.id
                              ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "8px",
                            fontSize: "13px", fontWeight: 600,
                            color: form.goal === g.id ? "#C8FF00" : "#64748B",
                            cursor: editing ? "pointer" : "default",
                            transition: "all 0.2s",
                          }}>{g.label}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Membership */}
              <div style={{
                ...card,
                background: "rgba(200,255,0,0.03)",
                border: "1px solid rgba(200,255,0,0.12)",
              }}>
                <div style={{ fontSize: "11px", color: "#C8FF00", letterSpacing: "2px", marginBottom: "16px" }}>
                  MEMBERSHIP
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: "22px", fontWeight: 900, color: "#C8FF00", marginBottom: "4px" }}>
                      PRO MEMBER
                    </div>
                    <div style={{ fontSize: "13px", color: "#64748B" }}>
                      Renews on April 1, 2026 · ₹1,999/month
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/")}
                    style={{
                      padding: "10px 20px",
                      background: "rgba(200,255,0,0.08)",
                      border: "1px solid rgba(200,255,0,0.2)",
                      color: "#C8FF00", borderRadius: "10px",
                      fontSize: "13px", fontWeight: 700, cursor: "pointer",
                    }}>
                    Upgrade to Elite →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SESSIONS TAB ── */}
        {activeTab === "sessions" && (
          <div>
            {/* Summary cards */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px", marginBottom: "24px",
            }}>
              {[
                { label: "Total Sessions", value: "124", icon: "🤖", color: "#C8FF00" },
                { label: "Total Reps", value: "4,820", icon: "💪", color: "#818CF8" },
                { label: "Calories Burned", value: "12,400", icon: "🔥", color: "#F59E0B" },
                { label: "Hours Trained", value: "48.5", icon: "⏱", color: "#34D399" },
              ].map((s, i) => (
                <div key={i} style={{
                  background: `${s.color}08`,
                  border: `1px solid ${s.color}20`,
                  borderRadius: "14px", padding: "20px",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "24px", fontWeight: 900, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Session history */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                RECENT SESSIONS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {recentSessions.map((s, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderLeft: `3px solid ${s.color}`,
                    borderRadius: "12px",
                    transition: "background 0.2s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  >
                    <div style={{
                      width: "44px", height: "44px", borderRadius: "12px",
                      background: `${s.color}15`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "20px", flexShrink: 0,
                    }}>🏋️</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "14px", fontWeight: 700, color: "white", marginBottom: "2px" }}>
                        {s.exercise}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        {s.reps} reps · {s.sets} sets · {s.duration}
                      </div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "2px" }}>FORM</div>
                      <div style={{
                        fontSize: "18px", fontWeight: 800,
                        color: s.score >= 85 ? "#22C55E" : s.score >= 70 ? "#F59E0B" : "#EF4444",
                      }}>{s.score}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "11px", color: "#475569" }}>{s.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate("/analytics")}
                style={{
                  marginTop: "16px", width: "100%",
                  padding: "12px",
                  background: "rgba(200,255,0,0.06)",
                  border: "1px solid rgba(200,255,0,0.15)",
                  color: "#C8FF00", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}>
                View Full Analytics →
              </button>
            </div>
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === "settings" && (
          <div>
            {/* Change password */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                CHANGE PASSWORD
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                {[
                  { key: "current", label: "Current Password" },
                  { key: "newPass", label: "New Password" },
                  { key: "confirm", label: "Confirm New Password" },
                ].map(f => (
                  <div key={f.key}>
                    <label style={label}>{f.label}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={passwords[f.key]}
                      onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                      style={inputStyle(true)}
                      onFocus={e => e.target.style.border = "1px solid rgba(200,255,0,0.5)"}
                      onBlur={e => e.target.style.border = "1px solid rgba(200,255,0,0.3)"}
                    />
                  </div>
                ))}
              </div>
              <button style={{
                marginTop: "16px", padding: "11px 24px",
                background: "#C8FF00", color: "#080C14",
                border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: 700, cursor: "pointer",
              }}>Update Password</button>
            </div>

            {/* Notifications */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                NOTIFICATIONS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {[
                  { key: "sessionReminder", label: "Session Reminders", desc: "Daily reminders to complete your workout" },
                  { key: "weeklyReport", label: "Weekly Report", desc: "Summary of your weekly performance" },
                  { key: "classBooking", label: "Class Booking Alerts", desc: "Notifications for class availability" },
                  { key: "formTips", label: "Form Tips", desc: "AI-powered tips to improve your form" },
                  { key: "achievements", label: "Achievements", desc: "Badge and milestone notifications" },
                  { key: "dietReminder", label: "Diet Reminders", desc: "Meal and nutrition reminders" },
                ].map(n => (
                  <div key={n.key} style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 16px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    borderRadius: "10px",
                  }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: 600, color: "white", marginBottom: "2px" }}>
                        {n.label}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>{n.desc}</div>
                    </div>
                    {/* Toggle */}
                    <div
                      onClick={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                      style={{
                        width: "44px", height: "24px", borderRadius: "12px",
                        background: notifications[n.key] ? "#C8FF00" : "rgba(255,255,255,0.1)",
                        position: "relative", cursor: "pointer",
                        transition: "background 0.3s", flexShrink: 0,
                      }}>
                      <div style={{
                        position: "absolute",
                        top: "3px",
                        left: notifications[n.key] ? "23px" : "3px",
                        width: "18px", height: "18px",
                        borderRadius: "50%",
                        background: notifications[n.key] ? "#080C14" : "#64748B",
                        transition: "left 0.3s",
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div style={{
              ...card,
              background: "rgba(239,68,68,0.04)",
              border: "1px solid rgba(239,68,68,0.15)",
            }}>
              <div style={{ fontSize: "11px", color: "#EF4444", letterSpacing: "2px", marginBottom: "16px" }}>
                DANGER ZONE
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button style={{
                  padding: "10px 20px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#EF4444", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}>Clear Session History</button>
                <button
                  onClick={() => navigate("/login")}
                  style={{
                    padding: "10px 20px",
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#EF4444", borderRadius: "10px",
                    fontSize: "13px", fontWeight: 700, cursor: "pointer",
                  }}>Sign Out</button>
                <button style={{
                  padding: "10px 20px",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  color: "#EF4444", borderRadius: "10px",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}>Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
        input::placeholder { color: #475569; }
        input:disabled { cursor: default; }
      `}</style>
    </div>
  )
}
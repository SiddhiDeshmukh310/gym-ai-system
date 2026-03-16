import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [ActiveTab, SetActiveTab] = useState("overview")

  const kpis = [
    { icon: "👥", label: "Total Members", value: "2,847", change: "+12%", up: true },
    { icon: "⚡", label: "Active Today", value: "143", change: "+8%", up: true },
    { icon: "📅", label: "Classes Today", value: "12", change: "2 full", up: true },
    { icon: "💰", label: "Revenue MTD", value: "₹4.2L", change: "+18%", up: true },
    { icon: "🤖", label: "AI Sessions", value: "89", change: "+24%", up: true },
    { icon: "⭐", label: "Avg Form Score", value: "76", change: "+3pts", up: true },
  ]

  const recentSessions = [
    { name: "Rahul M.", exercise: "Bicep Curl", score: 94, reps: 32, sets: 4, time: "09:14 AM", avatar: "R" },
    { name: "Priya S.", exercise: "Squat", score: 88, reps: 40, sets: 4, time: "09:32 AM", avatar: "P" },
    { name: "Arjun K.", exercise: "Pushup", score: 72, reps: 25, sets: 3, time: "10:05 AM", avatar: "A" },
    { name: "Sneha T.", exercise: "Shoulder Press", score: 91, reps: 28, sets: 4, time: "10:22 AM", avatar: "S" },
    { name: "Dev R.", exercise: "Deadlift", score: 65, reps: 18, sets: 3, time: "11:00 AM", avatar: "D" },
    { name: "Ananya B.", exercise: "Bicep Curl", score: 85, reps: 30, sets: 4, time: "11:15 AM", avatar: "A" },
  ]

  const todayClasses = [
    { time: "06:00", name: "MORNING HIIT", coach: "Coach Alex", duration: "45 min", booked: 18, total: 20, type: "Cardio" },
    { time: "07:00", name: "POWER YOGA", coach: "Maya S.", duration: "60 min", booked: 12, total: 15, type: "Yoga" },
    { time: "08:00", name: "CROSSFIT WOD", coach: "Coach Mike", duration: "60 min", booked: 24, total: 25, type: "CrossFit" },
    { time: "09:30", name: "SPIN CYCLE", coach: "Jenna T.", duration: "45 min", booked: 28, total: 30, type: "Cardio" },
    { time: "11:00", name: "STRENGTH TRAINING", coach: "Coach Alex", duration: "60 min", booked: 10, total: 20, type: "Strength" },
    { time: "12:30", name: "BOXING FUNDAMENTALS", coach: "Ray D.", duration: "45 min", booked: 8, total: 15, type: "Combat" },
  ]

  const topExercises = [
    { name: "Bicep Curl", count: 234, color: "#C8FF00" },
    { name: "Squat", count: 198, color: "#818CF8" },
    { name: "Pushup", count: 176, color: "#34D399" },
    { name: "Shoulder Press", count: 145, color: "#F59E0B" },
    { name: "Deadlift", count: 98, color: "#F472B6" },
  ]

  const occupancyData = [
    { hour: "6AM", value: 45 },
    { hour: "7AM", value: 72 },
    { hour: "8AM", value: 95 },
    { hour: "9AM", value: 88 },
    { hour: "10AM", value: 60 },
    { hour: "11AM", value: 70 },
    { hour: "12PM", value: 55 },
    { hour: "1PM", value: 40 },
    { hour: "2PM", value: 35 },
    { hour: "3PM", value: 48 },
    { hour: "4PM", value: 65 },
    { hour: "5PM", value: 90 },
    { hour: "6PM", value: 98 },
    { hour: "7PM", value: 85 },
    { hour: "8PM", value: 60 },
    { hour: "9PM", value: 30 },
  ]

  const weeklyScores = [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 78 },
    { day: "Wed", score: 74 },
    { day: "Thu", score: 82 },
    { day: "Fri", score: 88 },
    { day: "Sat", score: 76 },
    { day: "Sun", score: 80 },
  ]

  const card = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "24px",
  }

  const sectionTitle = {
    fontSize: "11px",
    color: "#64748B",
    letterSpacing: "3px",
    textTransform: "uppercase",
    marginBottom: "20px",
    fontWeight: 600,
  }

  function getCapacityColor(booked, total) {
    const pct = booked / total
    if (pct >= 0.95) return "#EF4444"
    if (pct >= 0.75) return "#F59E0B"
    return "#22C55E"
  }

  function getScoreColor(score) {
    if (score >= 85) return "#22C55E"
    if (score >= 70) return "#F59E0B"
    return "#EF4444"
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "220px 1fr",
      minHeight: "100vh",
      background: "#080C14",
      color: "white",
      fontFamily: "system-ui, sans-serif",
    }}>
      <Sidebar />

      {/* MAIN */}
      <div style={{ overflowY: "auto", padding: "32px" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
        }}>
          <div>
            <div style={{
              fontSize: "12px", color: "#64748B",
              letterSpacing: "2px", marginBottom: "4px",
            }}>
              MONDAY, MARCH 16 2026
            </div>
            <h1 style={{
              fontSize: "28px", fontWeight: 900,
              margin: 0, letterSpacing: "-0.5px",
            }}>
              COMMAND CENTER
            </h1>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            {/* Search */}
            <div style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              padding: "10px 16px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ color: "#64748B" }}>🔍</span>
              <input
                placeholder="Search members..."
                style={{
                  background: "none", border: "none",
                  color: "white", outline: "none",
                  fontSize: "14px", width: "160px",
                  fontFamily: "system-ui",
                }}
              />
            </div>

            {/* Start AI Session */}
            <button
              onClick={() => navigate("/ai-trainer")}
              style={{
                padding: "10px 20px",
                background: "#C8FF00",
                color: "#080C14",
                border: "none", borderRadius: "10px",
                fontSize: "14px", fontWeight: 800,
                cursor: "pointer", letterSpacing: "1px",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
              🤖 Start AI Session
            </button>

            {/* Notification bell */}
            <div style={{
              width: "40px", height: "40px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              🔔
              <div style={{
                position: "absolute", top: "6px", right: "6px",
                width: "8px", height: "8px",
                background: "#EF4444", borderRadius: "50%",
              }} />
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "16px",
          marginBottom: "28px",
        }}>
          {kpis.map((k, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "20px 16px",
              transition: "all 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(200,255,0,0.04)"
                e.currentTarget.style.border = "1px solid rgba(200,255,0,0.15)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "10px" }}>{k.icon}</div>
              <div style={{
                fontSize: "10px", color: "#64748B",
                letterSpacing: "1px", marginBottom: "6px",
              }}>{k.label}</div>
              <div style={{
                fontSize: "22px", fontWeight: 800,
                color: "white", marginBottom: "6px",
              }}>{k.value}</div>
              <div style={{
                fontSize: "11px", fontWeight: 600,
                color: k.up ? "#22C55E" : "#EF4444",
              }}>{k.up ? "↑" : "↓"} {k.change}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
          marginBottom: "24px",
        }}>

          {/* OCCUPANCY CHART */}
          <div style={card}>
            <p style={sectionTitle}>Gym Occupancy Today</p>
            <div style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              height: "160px",
              paddingBottom: "24px",
              position: "relative",
            }}>
              {/* Horizontal grid lines */}
              {[25, 50, 75, 100].map(line => (
                <div key={line} style={{
                  position: "absolute",
                  left: 0, right: 0,
                  bottom: `${line * 1.36 + 24}px`,
                  borderTop: "1px dashed rgba(255,255,255,0.04)",
                  zIndex: 0,
                }} />
              ))}

              {occupancyData.map((d, i) => (
                <div key={i} style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  height: "100%",
                  justifyContent: "flex-end",
                  zIndex: 1,
                }}>
                  <div style={{
                    width: "100%",
                    height: `${d.value * 1.36}px`,
                    background: d.value >= 90
                      ? "rgba(239,68,68,0.7)"
                      : d.value >= 70
                      ? "rgba(245,158,11,0.7)"
                      : "rgba(200,255,0,0.5)",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s",
                    cursor: "default",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: "30%",
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "4px 4px 0 0",
                    }} />
                  </div>
                  <div style={{
                    fontSize: "9px", color: "#475569",
                    whiteSpace: "nowrap",
                  }}>{d.hour}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: "20px", marginTop: "8px" }}>
              {[
                { color: "rgba(200,255,0,0.5)", label: "Normal" },
                { color: "rgba(245,158,11,0.7)", label: "Busy" },
                { color: "rgba(239,68,68,0.7)", label: "Full" },
              ].map(l => (
                <div key={l.label} style={{
                  display: "flex", alignItems: "center", gap: "6px",
                }}>
                  <div style={{
                    width: "10px", height: "10px",
                    borderRadius: "2px", background: l.color,
                  }} />
                  <span style={{ fontSize: "11px", color: "#64748B" }}>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TODAY'S SCHEDULE */}
          <div style={card}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "20px",
            }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Today's Classes</p>
              <span
                onClick={() => navigate("/schedule")}
                style={{
                  fontSize: "12px", color: "#C8FF00",
                  cursor: "pointer", fontWeight: 600,
                }}>View all →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {todayClasses.slice(0, 5).map((cls, i) => {
                const Pct = Math.round((cls.booked / cls.total) * 100)
                const color = getCapacityColor(cls.booked, cls.total)
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "center",
                    gap: "12px",
                    padding: "10px 12px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                    borderRadius: "10px",
                  }}>
                    <div style={{
                      fontSize: "15px", fontWeight: 800,
                      color: "#C8FF00", minWidth: "44px",
                      fontFamily: "monospace",
                    }}>{cls.time}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: "12px", fontWeight: 700,
                        color: "white", whiteSpace: "nowrap",
                        overflow: "hidden", textOverflow: "ellipsis",
                      }}>{cls.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>
                        {cls.coach} · {cls.duration}
                      </div>
                    </div>
                    <div style={{
                      background: `rgba(${color === "#22C55E" ? "34,197,94" : color === "#F59E0B" ? "245,158,11" : "239,68,68"},0.12)`,
                      border: `1px solid ${color}40`,
                      borderRadius: "6px",
                      padding: "3px 8px",
                      fontSize: "11px",
                      fontWeight: 700,
                      color: color,
                      whiteSpace: "nowrap",
                    }}>{cls.booked}/{cls.total}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 320px",
          gap: "24px",
        }}>

          {/* RECENT AI SESSIONS */}
          <div style={card}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "20px",
            }}>
              <p style={{ ...sectionTitle, margin: 0 }}>Recent AI Sessions</p>
              <button
                onClick={() => navigate("/ai-trainer")}
                style={{
                  padding: "6px 14px",
                  background: "rgba(200,255,0,0.08)",
                  border: "1px solid rgba(200,255,0,0.2)",
                  color: "#C8FF00", borderRadius: "6px",
                  fontSize: "12px", fontWeight: 700,
                  cursor: "pointer",
                }}>+ New Session</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {recentSessions.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  gap: "12px", padding: "10px 12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: "rgba(200,255,0,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "13px", fontWeight: 700, color: "#C8FF00",
                    flexShrink: 0,
                  }}>{s.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>
                      {s.exercise} · {s.reps} reps · {s.sets} sets
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{
                      fontSize: "15px", fontWeight: 800,
                      color: getScoreColor(s.score),
                    }}>{s.score}</div>
                    <div style={{ fontSize: "10px", color: "#475569" }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY FORM SCORE */}
          <div style={card}>
            <p style={sectionTitle}>Weekly Form Score</p>
            <div style={{
              display: "flex", alignItems: "flex-end",
              gap: "12px", height: "140px",
              marginBottom: "16px",
            }}>
              {weeklyScores.map((d, i) => (
                <div key={i} style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  height: "100%",
                  justifyContent: "flex-end",
                }}>
                  <div style={{
                    fontSize: "10px", color: "#64748B",
                    fontWeight: 600,
                  }}>{d.score}</div>
                  <div style={{
                    width: "100%",
                    height: `${(d.score / 100) * 110}px`,
                    background: i === 6
                      ? "#C8FF00"
                      : "rgba(200,255,0,0.25)",
                    borderRadius: "6px 6px 0 0",
                    transition: "height 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    {i === 6 && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: "40%",
                        background: "rgba(255,255,255,0.2)",
                        borderRadius: "6px 6px 0 0",
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: "10px", color: "#475569" }}>{d.day}</div>
                </div>
              ))}
            </div>
            <div style={{
              background: "rgba(200,255,0,0.04)",
              border: "1px solid rgba(200,255,0,0.1)",
              borderRadius: "8px", padding: "12px 14px",
              display: "flex", justifyContent: "space-between",
              alignItems: "center",
            }}>
              <span style={{ fontSize: "13px", color: "#94A3B8" }}>Weekly average</span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#C8FF00" }}>
                {Math.round(weeklyScores.reduce((a, b) => a + b.score, 0) / weeklyScores.length)}
              </span>
            </div>
          </div>

          {/* TOP EXERCISES */}
          <div style={card}>
            <p style={sectionTitle}>Top Exercises This Week</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {topExercises.map((ex, i) => (
                <div key={i}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "6px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        width: "20px", height: "20px", borderRadius: "50%",
                        background: `${ex.color}20`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "10px", color: ex.color, fontWeight: 800,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: "13px", color: "#94A3B8" }}>{ex.name}</span>
                    </div>
                    <span style={{
                      fontSize: "13px", fontWeight: 700, color: ex.color,
                    }}>{ex.count}</span>
                  </div>
                  <div style={{
                    height: "4px", background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(ex.count / topExercises[0].count) * 100}%`,
                      background: ex.color,
                      borderRadius: "2px",
                      transition: "width 0.5s ease",
                      opacity: 0.8,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <p style={{ ...sectionTitle, margin: "0 0 8px" }}>Quick Actions</p>
              {[
                { icon: "🤖", label: "Start AI Session", path: "/ai-trainer", color: "#C8FF00" },
                { icon: "🥗", label: "View Diet Plans", path: "/diet", color: "#34D399" },
                { icon: "📅", label: "View Schedule", path: "/schedule", color: "#818CF8" },
              ].map(action => (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  style={{
                    width: "100%", padding: "10px 14px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "white", borderRadius: "8px",
                    fontSize: "13px", fontWeight: 600,
                    cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "10px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${action.color}10`
                    e.currentTarget.style.border = `1px solid ${action.color}30`
                    e.currentTarget.style.color = action.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                    e.currentTarget.style.color = "white"
                  }}
                >
                  <span>{action.icon}</span>
                  {action.label} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: rgba(200,255,0,0.2);
          border-radius: 2px;
        }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  )
}
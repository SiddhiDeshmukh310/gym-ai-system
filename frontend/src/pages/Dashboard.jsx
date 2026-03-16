import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function Dashboard() {
  const navigate = useNavigate()
  const [ActiveChart, SetActiveChart] = useState("occupancy")

  const kpis = [
    { icon: "👥", label: "Total Members", value: "2,847", change: "+12%", up: true, color: "#C8FF00" },
    { icon: "⚡", label: "Active Today", value: "143", change: "+8%", up: true, color: "#38BDF8" },
    { icon: "📅", label: "Classes Today", value: "12", change: "2 full", up: true, color: "#818CF8" },
    { icon: "💰", label: "Revenue MTD", value: "₹4.2L", change: "+18%", up: true, color: "#34D399" },
    { icon: "🤖", label: "AI Sessions", value: "89", change: "+24%", up: true, color: "#F59E0B" },
    { icon: "⭐", label: "Avg Form Score", value: "76", change: "+3pts", up: true, color: "#F472B6" },
  ]

  const recentSessions = [
    { name: "Rahul M.", exercise: "Bicep Curl", score: 94, reps: 32, sets: 4, time: "09:14 AM", avatar: "R", color: "#C8FF00" },
    { name: "Priya S.", exercise: "Squat", score: 88, reps: 40, sets: 4, time: "09:32 AM", avatar: "P", color: "#F472B6" },
    { name: "Arjun K.", exercise: "Pushup", score: 72, reps: 25, sets: 3, time: "10:05 AM", avatar: "A", color: "#818CF8" },
    { name: "Sneha T.", exercise: "Shoulder Press", score: 91, reps: 28, sets: 4, time: "10:22 AM", avatar: "S", color: "#34D399" },
    { name: "Dev R.", exercise: "Deadlift", score: 65, reps: 18, sets: 3, time: "11:00 AM", avatar: "D", color: "#F59E0B" },
    { name: "Ananya B.", exercise: "Bicep Curl", score: 85, reps: 30, sets: 4, time: "11:15 AM", avatar: "A", color: "#38BDF8" },
  ]

  const todayClasses = [
    { time: "06:00", name: "MORNING HIIT", coach: "Coach Alex", duration: "45 min", booked: 18, total: 20, type: "Cardio", color: "#EF4444" },
    { time: "07:00", name: "POWER YOGA", coach: "Maya S.", duration: "60 min", booked: 12, total: 15, type: "Yoga", color: "#818CF8" },
    { time: "08:00", name: "CROSSFIT WOD", coach: "Coach Mike", duration: "60 min", booked: 24, total: 25, type: "CrossFit", color: "#F59E0B" },
    { time: "09:30", name: "SPIN CYCLE", coach: "Jenna T.", duration: "45 min", booked: 28, total: 30, type: "Cardio", color: "#EF4444" },
    { time: "11:00", name: "STRENGTH TRAINING", coach: "Coach Alex", duration: "60 min", booked: 10, total: 20, type: "Strength", color: "#C8FF00" },
    { time: "12:30", name: "BOXING", coach: "Ray D.", duration: "45 min", booked: 8, total: 15, type: "Combat", color: "#F472B6" },
  ]

  const occupancyData = [
    { hour: "6AM", value: 45 }, { hour: "7AM", value: 72 },
    { hour: "8AM", value: 95 }, { hour: "9AM", value: 88 },
    { hour: "10AM", value: 60 }, { hour: "11AM", value: 70 },
    { hour: "12PM", value: 55 }, { hour: "1PM", value: 40 },
    { hour: "2PM", value: 35 }, { hour: "3PM", value: 48 },
    { hour: "4PM", value: 65 }, { hour: "5PM", value: 90 },
    { hour: "6PM", value: 98 }, { hour: "7PM", value: 85 },
    { hour: "8PM", value: 60 }, { hour: "9PM", value: 30 },
  ]

  const weeklyRevenue = [
    { day: "Mon", value: 42000 }, { day: "Tue", value: 38000 },
    { day: "Wed", value: 55000 }, { day: "Thu", value: 48000 },
    { day: "Fri", value: 62000 }, { day: "Sat", value: 78000 },
    { day: "Sun", value: 35000 },
  ]

  const weeklyScores = [
    { day: "Mon", score: 72 }, { day: "Tue", score: 78 },
    { day: "Wed", score: 74 }, { day: "Thu", score: 82 },
    { day: "Fri", score: 88 }, { day: "Sat", score: 76 },
    { day: "Sun", score: 80 },
  ]

  const topExercises = [
    { name: "Bicep Curl", count: 234, color: "#C8FF00", pct: 100 },
    { name: "Squat", count: 198, color: "#818CF8", pct: 85 },
    { name: "Pushup", count: 176, color: "#34D399", pct: 75 },
    { name: "Shoulder Press", count: 145, color: "#F59E0B", pct: 62 },
    { name: "Deadlift", count: 98, color: "#F472B6", pct: 42 },
  ]

  const memberGrowth = [
    { month: "Aug", value: 2200 }, { month: "Sep", value: 2350 },
    { month: "Oct", value: 2480 }, { month: "Nov", value: 2600 },
    { month: "Dec", value: 2720 }, { month: "Jan", value: 2847 },
  ]

  const planDistribution = [
    { name: "Pro", value: 45, color: "#C8FF00" },
    { name: "Elite", value: 25, color: "#818CF8" },
    { name: "Starter", value: 20, color: "#64748B" },
    { name: "Family", value: 10, color: "#34D399" },
  ]

  function getScoreColor(score) {
    if (score >= 85) return "#22C55E"
    if (score >= 70) return "#F59E0B"
    return "#EF4444"
  }

  function getCapColor(booked, total) {
    const p = booked / total
    if (p >= 0.95) return "#EF4444"
    if (p >= 0.75) return "#F59E0B"
    return "#22C55E"
  }

  const card = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "20px",
  }

  const maxRevenue = Math.max(...weeklyRevenue.map(d => d.value))
  const maxGrowth = Math.max(...memberGrowth.map(d => d.value))
  const minGrowth = Math.min(...memberGrowth.map(d => d.value))

  // Build SVG line path for member growth
  const growthPath = memberGrowth.map((d, i) => {
    const x = (i / (memberGrowth.length - 1)) * 260 + 10
    const y = 80 - ((d.value - minGrowth) / (maxGrowth - minGrowth)) * 60
    return `${i === 0 ? "M" : "L"}${x},${y}`
  }).join(" ")

  const growthArea = growthPath + ` L270,80 L10,80 Z`

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

      <div style={{ overflowY: "auto", padding: "28px 32px" }}>

        {/* ── TOP BAR ── */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "28px",
        }}>
          <div>
            <div style={{
              fontSize: "11px", color: "#64748B",
              letterSpacing: "3px", marginBottom: "4px",
            }}>MONDAY, MARCH 16 2026</div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" }}>
              COMMAND CENTER
            </h1>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", padding: "9px 14px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span style={{ color: "#64748B" }}>🔍</span>
              <input
                placeholder="Search members..."
                style={{
                  background: "none", border: "none",
                  color: "white", outline: "none",
                  fontSize: "13px", width: "150px",
                  fontFamily: "system-ui",
                }}
              />
            </div>
            <button
              onClick={() => navigate("/ai-trainer")}
              style={{
                padding: "10px 18px",
                background: "#C8FF00", color: "#080C14",
                border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: 800,
                cursor: "pointer",
                display: "flex", alignItems: "center", gap: "6px",
              }}>
              🤖 Start AI Session
            </button>
            <div style={{
              width: "38px", height: "38px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", position: "relative",
            }}>
              🔔
              <div style={{
                position: "absolute", top: "6px", right: "6px",
                width: "7px", height: "7px",
                background: "#EF4444", borderRadius: "50%",
              }} />
            </div>
          </div>
        </div>

        {/* ── KPI CARDS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "12px", marginBottom: "24px",
        }}>
          {kpis.map((k, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px", padding: "16px",
              transition: "all 0.2s", cursor: "default",
              position: "relative", overflow: "hidden",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${k.color}08`
                e.currentTarget.style.border = `1px solid ${k.color}25`
                e.currentTarget.style.transform = "translateY(-2px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {/* Background glow */}
              <div style={{
                position: "absolute", top: "-20px", right: "-20px",
                width: "60px", height: "60px",
                background: `radial-gradient(circle, ${k.color}15 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />
              <div style={{ fontSize: "20px", marginBottom: "10px" }}>{k.icon}</div>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px", marginBottom: "4px" }}>
                {k.label}
              </div>
              <div style={{ fontSize: "20px", fontWeight: 900, color: "white", marginBottom: "4px" }}>
                {k.value}
              </div>
              <div style={{
                fontSize: "11px", fontWeight: 600,
                color: k.up ? "#22C55E" : "#EF4444",
                display: "flex", alignItems: "center", gap: "3px",
              }}>
                <span>{k.up ? "↑" : "↓"}</span>
                <span>{k.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── ROW 1: CHARTS ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 300px",
          gap: "16px", marginBottom: "16px",
        }}>

          {/* OCCUPANCY CHART */}
          <div style={card}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px",
            }}>
              <div>
                <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>LIVE DATA</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>Gym Occupancy Today</div>
              </div>
              <div style={{
                display: "flex", gap: "6px",
              }}>
                {[
                  { color: "rgba(200,255,0,0.6)", label: "Low" },
                  { color: "rgba(245,158,11,0.7)", label: "Busy" },
                  { color: "rgba(239,68,68,0.7)", label: "Full" },
                ].map(l => (
                  <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: l.color }} />
                    <span style={{ fontSize: "10px", color: "#64748B" }}>{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{
              display: "flex", alignItems: "flex-end",
              gap: "5px", height: "140px",
              paddingBottom: "20px", position: "relative",
            }}>
              {[25, 50, 75].map(line => (
                <div key={line} style={{
                  position: "absolute", left: 0, right: 0,
                  bottom: `${line * 1.2 + 20}px`,
                  borderTop: "1px dashed rgba(255,255,255,0.04)",
                }} />
              ))}
              {occupancyData.map((d, i) => (
                <div key={i} style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "4px",
                  height: "100%", justifyContent: "flex-end", zIndex: 1,
                }}>
                  <div style={{
                    width: "100%",
                    height: `${d.value * 1.2}px`,
                    background: d.value >= 90
                      ? "rgba(239,68,68,0.7)"
                      : d.value >= 70
                      ? "rgba(245,158,11,0.7)"
                      : "rgba(200,255,0,0.5)",
                    borderRadius: "3px 3px 0 0",
                    transition: "height 0.3s",
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0,
                      height: "30%", background: "rgba(255,255,255,0.15)",
                      borderRadius: "3px 3px 0 0",
                    }} />
                  </div>
                  <div style={{ fontSize: "8px", color: "#475569" }}>{d.hour}</div>
                </div>
              ))}
            </div>
          </div>

          {/* WEEKLY REVENUE */}
          <div style={card}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>THIS WEEK</div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>Revenue Overview</div>
            </div>
            <div style={{
              display: "flex", alignItems: "flex-end",
              gap: "8px", height: "140px",
              paddingBottom: "20px", position: "relative",
            }}>
              {weeklyRevenue.map((d, i) => (
                <div key={i} style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "4px",
                  height: "100%", justifyContent: "flex-end",
                }}>
                  <div style={{ fontSize: "9px", color: "#64748B" }}>
                    ₹{Math.round(d.value / 1000)}k
                  </div>
                  <div style={{
                    width: "100%",
                    height: `${(d.value / maxRevenue) * 100}px`,
                    background: i === 5
                      ? "#C8FF00"
                      : "rgba(200,255,0,0.2)",
                    borderRadius: "4px 4px 0 0",
                    position: "relative", overflow: "hidden",
                    transition: "height 0.3s",
                    boxShadow: i === 5 ? "0 0 12px rgba(200,255,0,0.3)" : "none",
                  }}>
                    {i === 5 && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: "35%", background: "rgba(255,255,255,0.2)",
                        borderRadius: "4px 4px 0 0",
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: "9px", color: "#475569" }}>{d.day}</div>
                </div>
              ))}
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 12px",
              background: "rgba(200,255,0,0.04)",
              border: "1px solid rgba(200,255,0,0.1)",
              borderRadius: "8px",
            }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>Weekly total</span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#C8FF00" }}>
                ₹{(weeklyRevenue.reduce((a, b) => a + b.value, 0) / 1000).toFixed(0)}k
              </span>
            </div>
          </div>

          {/* PLAN DISTRIBUTION — Donut */}
          <div style={card}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>BREAKDOWN</div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>Plan Distribution</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
              <svg viewBox="0 0 120 120" width="120" height="120">
                {(() => {
                  let offset = 0
                  const total = planDistribution.reduce((a, b) => a + b.value, 0)
                  const circumference = 2 * Math.PI * 40
                  return planDistribution.map((p, i) => {
                    const dash = (p.value / total) * circumference
                    const gap = circumference - dash
                    const rotation = -90 + (offset / total) * 360
                    offset += p.value
                    return (
                      <circle key={i} cx="60" cy="60" r="40"
                        fill="none"
                        stroke={p.color}
                        strokeWidth="18"
                        strokeDasharray={`${dash} ${gap}`}
                        transform={`rotate(${rotation} 60 60)`}
                        strokeLinecap="butt"
                      />
                    )
                  })
                })()}
                <circle cx="60" cy="60" r="28" fill="#0D1117" />
                <text x="60" y="56" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">2847</text>
                <text x="60" y="68" textAnchor="middle" fill="#64748B" fontSize="8">members</text>
              </svg>
            </div>
            {planDistribution.map((p, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: "6px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{
                    width: "10px", height: "10px",
                    borderRadius: "2px", background: p.color,
                  }} />
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>{p.name}</span>
                </div>
                <span style={{ fontSize: "12px", fontWeight: 700, color: p.color }}>{p.value}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── ROW 2 ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px", marginBottom: "16px",
        }}>

          {/* MEMBER GROWTH LINE CHART */}
          <div style={card}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>6 MONTHS</div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>Member Growth</div>
            </div>
            <div style={{ position: "relative", height: "100px" }}>
              <svg width="100%" height="100" viewBox="0 0 280 90" preserveAspectRatio="none">
                {/* Area fill */}
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C8FF00" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                <path d={growthArea} fill="url(#growthGrad)" />
                <path d={growthPath} fill="none" stroke="#C8FF00" strokeWidth="2.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                {/* Data points */}
                {memberGrowth.map((d, i) => {
                  const x = (i / (memberGrowth.length - 1)) * 260 + 10
                  const y = 80 - ((d.value - minGrowth) / (maxGrowth - minGrowth)) * 60
                  return (
                    <g key={i}>
                      <circle cx={x} cy={y} r="4" fill="#C8FF00"
                        filter="drop-shadow(0 0 4px #C8FF00)" />
                    </g>
                  )
                })}
              </svg>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              marginTop: "8px",
            }}>
              {memberGrowth.map((d, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "9px", color: "#475569" }}>{d.month}</div>
                  {i === memberGrowth.length - 1 && (
                    <div style={{ fontSize: "10px", color: "#C8FF00", fontWeight: 700 }}>
                      {d.value.toLocaleString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* FORM SCORE TREND */}
          <div style={card}>
            <div style={{ marginBottom: "16px" }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>THIS WEEK</div>
              <div style={{ fontSize: "15px", fontWeight: 700 }}>Avg Form Score Trend</div>
            </div>
            <div style={{
              display: "flex", alignItems: "flex-end",
              gap: "10px", height: "100px", marginBottom: "12px",
            }}>
              {weeklyScores.map((d, i) => (
                <div key={i} style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "4px",
                  height: "100%", justifyContent: "flex-end",
                }}>
                  <div style={{ fontSize: "10px", color: "#64748B", fontWeight: 600 }}>{d.score}</div>
                  <div style={{
                    width: "100%",
                    height: `${(d.score / 100) * 80}px`,
                    background: i === 6
                      ? "#C8FF00"
                      : `rgba(200,255,0,${0.15 + (i / 7) * 0.25})`,
                    borderRadius: "6px 6px 0 0",
                    position: "relative", overflow: "hidden",
                    boxShadow: i === 6 ? "0 0 12px rgba(200,255,0,0.4)" : "none",
                  }}>
                    {i === 6 && (
                      <div style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        height: "40%", background: "rgba(255,255,255,0.2)",
                        borderRadius: "6px 6px 0 0",
                      }} />
                    )}
                  </div>
                  <div style={{ fontSize: "9px", color: "#475569" }}>{d.day}</div>
                </div>
              ))}
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 12px",
              background: "rgba(200,255,0,0.04)",
              border: "1px solid rgba(200,255,0,0.1)",
              borderRadius: "8px",
            }}>
              <span style={{ fontSize: "12px", color: "#64748B" }}>Weekly average</span>
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#C8FF00" }}>
                {Math.round(weeklyScores.reduce((a, b) => a + b.score, 0) / weeklyScores.length)}
              </span>
            </div>
          </div>
        </div>

        {/* ── ROW 3 ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 280px",
          gap: "16px",
        }}>

          {/* RECENT AI SESSIONS */}
          <div style={card}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px",
            }}>
              <div>
                <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>TODAY</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>Recent AI Sessions</div>
              </div>
              <button
                onClick={() => navigate("/ai-trainer")}
                style={{
                  padding: "6px 12px",
                  background: "rgba(200,255,0,0.08)",
                  border: "1px solid rgba(200,255,0,0.2)",
                  color: "#C8FF00", borderRadius: "8px",
                  fontSize: "11px", fontWeight: 700, cursor: "pointer",
                }}>+ New</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {recentSessions.map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center",
                  gap: "10px", padding: "10px 12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  transition: "background 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                >
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "50%",
                    background: `${s.color}20`,
                    border: `1px solid ${s.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 800, color: s.color, flexShrink: 0,
                  }}>{s.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: "11px", color: "#64748B" }}>
                      {s.exercise} · {s.reps} reps · {s.sets} sets
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{
                      fontSize: "16px", fontWeight: 800,
                      color: getScoreColor(s.score),
                    }}>{s.score}</div>
                    <div style={{ fontSize: "10px", color: "#475569" }}>{s.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TODAY'S CLASSES */}
          <div style={card}>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: "16px",
            }}>
              <div>
                <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px" }}>SCHEDULE</div>
                <div style={{ fontSize: "15px", fontWeight: 700 }}>Today's Classes</div>
              </div>
              <span
                onClick={() => navigate("/schedule")}
                style={{
                  fontSize: "12px", color: "#C8FF00",
                  cursor: "pointer", fontWeight: 600,
                }}>View all →</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {todayClasses.map((cls, i) => {
                const pct = Math.round((cls.booked / cls.total) * 100)
                const color = getCapColor(cls.booked, cls.total)
                return (
                  <div
                    key={i}
                    onClick={() => navigate("/schedule")}
                    style={{
                      display: "flex", alignItems: "center",
                      gap: "10px", padding: "10px 12px",
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid rgba(255,255,255,0.04)`,
                      borderLeft: `3px solid ${cls.color}`,
                      borderRadius: "10px", cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.02)"}
                  >
                    <div style={{
                      fontSize: "13px", fontWeight: 800,
                      color: cls.color, minWidth: "40px",
                      fontFamily: "monospace",
                    }}>{cls.time}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "12px", fontWeight: 700 }}>{cls.name}</div>
                      <div style={{ fontSize: "10px", color: "#64748B" }}>
                        {cls.coach} · {cls.duration}
                      </div>
                      <div style={{ marginTop: "4px", height: "2px", background: "rgba(255,255,255,0.06)", borderRadius: "1px" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: "1px" }} />
                      </div>
                    </div>
                    <div style={{
                      fontSize: "11px", fontWeight: 700,
                      color: color, whiteSpace: "nowrap",
                    }}>{cls.booked}/{cls.total}</div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT SIDEBAR WIDGETS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Top exercises */}
            <div style={card}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "14px" }}>
                TOP EXERCISES
              </div>
              {topExercises.map((ex, i) => (
                <div key={i} style={{ marginBottom: "10px" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "4px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{
                        width: "16px", height: "16px", borderRadius: "50%",
                        background: `${ex.color}20`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "9px", color: ex.color, fontWeight: 800,
                      }}>{i + 1}</div>
                      <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ex.name}</span>
                    </div>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: ex.color }}>
                      {ex.count}
                    </span>
                  </div>
                  <div style={{ height: "3px", background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}>
                    <div style={{
                      height: "100%", width: `${ex.pct}%`,
                      background: ex.color, borderRadius: "2px",
                      transition: "width 0.5s",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={card}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "12px" }}>
                QUICK ACTIONS
              </div>
              {[
                { icon: "🤖", label: "AI Trainer", path: "/ai-trainer", color: "#C8FF00" },
                { icon: "🥗", label: "Diet Plans", path: "/diet", color: "#34D399" },
                { icon: "📅", label: "Schedule", path: "/schedule", color: "#818CF8" },
                { icon: "👥", label: "Members", path: "/members", color: "#F472B6" },
              ].map(a => (
                <button
                  key={a.label}
                  onClick={() => navigate(a.path)}
                  style={{
                    width: "100%", padding: "9px 12px",
                    marginBottom: "6px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    color: "white", borderRadius: "8px",
                    fontSize: "12px", fontWeight: 600,
                    cursor: "pointer", textAlign: "left",
                    display: "flex", alignItems: "center", gap: "8px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${a.color}10`
                    e.currentTarget.style.border = `1px solid ${a.color}30`
                    e.currentTarget.style.color = a.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                    e.currentTarget.style.color = "white"
                  }}
                >
                  {a.icon} {a.label} →
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.2); border-radius: 2px; }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  )
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function Analytics() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [activePeriod, setActivePeriod] = useState("week")

  const periods = ["week", "month", "3months", "year"]

  const weeklyData = {
    week: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      sessions: [3, 5, 4, 6, 8, 10, 7],
      calories: [320, 450, 380, 520, 680, 750, 490],
      formScore: [72, 76, 74, 80, 85, 88, 82],
      reps: [45, 60, 52, 70, 90, 110, 75],
    },
    month: {
      labels: ["W1", "W2", "W3", "W4"],
      sessions: [18, 22, 20, 25],
      calories: [2400, 2800, 2600, 3100],
      formScore: [74, 78, 80, 84],
      reps: [280, 340, 310, 390],
    },
    "3months": {
      labels: ["Jan", "Feb", "Mar"],
      sessions: [65, 72, 80],
      calories: [9200, 10400, 11800],
      formScore: [72, 78, 84],
      reps: [980, 1120, 1280],
    },
    year: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      sessions: [20, 24, 28, 25, 30, 32, 35, 38, 34, 36, 40, 42],
      calories: [2800, 3200, 3800, 3400, 4100, 4400, 4800, 5200, 4600, 4900, 5400, 5800],
      formScore: [68, 70, 72, 74, 76, 78, 80, 82, 81, 83, 85, 87],
      reps: [320, 380, 440, 400, 480, 510, 560, 610, 540, 580, 640, 700],
    },
  }

  const data = weeklyData[activePeriod]
  const maxSessions = Math.max(...data.sessions)
  const maxCalories = Math.max(...data.calories)
  const maxReps = Math.max(...data.reps)

  const exerciseBreakdown = [
    { name: "Bicep Curl", sessions: 28, color: "#C8FF00", pct: 100 },
    { name: "Squat", sessions: 24, color: "#818CF8", pct: 86 },
    { name: "Pushup", sessions: 20, color: "#34D399", pct: 71 },
    { name: "Shoulder Press", sessions: 16, color: "#F59E0B", pct: 57 },
    { name: "Deadlift", sessions: 12, color: "#F472B6", pct: 43 },
    { name: "Tricep Ext", sessions: 8, color: "#38BDF8", pct: 29 },
  ]

  const achievements = [
    { icon: "🏆", title: "100 Sessions", desc: "Completed 100 AI training sessions", earned: true, date: "Mar 10" },
    { icon: "🔥", title: "30 Day Streak", desc: "Trained 30 days in a row", earned: true, date: "Mar 5" },
    { icon: "💪", title: "Perfect Form", desc: "Scored 100 form score on 10 reps", earned: true, date: "Feb 28" },
    { icon: "⭐", title: "1000 Reps", desc: "Completed 1000 total reps", earned: true, date: "Feb 20" },
    { icon: "🎯", title: "Elite Member", desc: "Upgraded to Elite membership", earned: false, date: null },
    { icon: "🚀", title: "Speed Demon", desc: "Complete a session in under 10 mins", earned: false, date: null },
  ]

  const personalBests = [
    { exercise: "Bicep Curl", reps: 18, formScore: 96, date: "Mar 12", color: "#C8FF00" },
    { exercise: "Squat", reps: 22, formScore: 91, date: "Mar 8", color: "#818CF8" },
    { exercise: "Pushup", reps: 30, formScore: 88, date: "Mar 1", color: "#34D399" },
    { exercise: "Shoulder Press", reps: 15, formScore: 94, date: "Feb 25", color: "#F59E0B" },
  ]

  const card = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "16px",
    padding: "24px",
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
              YOUR PERFORMANCE
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, margin: 0 }}>ANALYTICS</h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/ai-trainer")}
              style={{
                padding: "10px 20px", background: "#C8FF00",
                color: "#080C14", border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: 800, cursor: "pointer",
              }}>
              🤖 New Session
            </button>
          </div>
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[
            { id: "overview", label: "📊 Overview" },
            { id: "exercises", label: "🏋️ Exercises" },
            { id: "achievements", label: "🏆 Achievements" },
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

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div>
            {/* Period selector */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              {periods.map(p => (
                <button key={p} onClick={() => setActivePeriod(p)} style={{
                  padding: "7px 16px", borderRadius: "8px",
                  cursor: "pointer", fontWeight: 700, fontSize: "12px",
                  background: activePeriod === p ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.03)",
                  color: activePeriod === p ? "#C8FF00" : "#64748B",
                  border: activePeriod === p ? "1px solid rgba(200,255,0,0.3)" : "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.2s", textTransform: "capitalize",
                }}>
                  {p === "3months" ? "3 Months" : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>

            {/* KPI row */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px", marginBottom: "24px",
            }}>
              {[
                { label: "Total Sessions", value: data.sessions.reduce((a, b) => a + b, 0), icon: "🤖", color: "#C8FF00", suffix: "" },
                { label: "Calories Burned", value: data.calories.reduce((a, b) => a + b, 0).toLocaleString(), icon: "🔥", color: "#F59E0B", suffix: " kcal" },
                { label: "Avg Form Score", value: Math.round(data.formScore.reduce((a, b) => a + b, 0) / data.formScore.length), icon: "⭐", color: "#34D399", suffix: "/100" },
                { label: "Total Reps", value: data.reps.reduce((a, b) => a + b, 0).toLocaleString(), icon: "💪", color: "#818CF8", suffix: "" },
              ].map((s, i) => (
                <div key={i} style={{
                  ...card,
                  transition: "all 0.2s",
                  position: "relative", overflow: "hidden",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `${s.color}08`
                    e.currentTarget.style.border = `1px solid ${s.color}25`
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "26px", fontWeight: 900, color: s.color }}>
                    {s.value}{s.suffix}
                  </div>
                </div>
              ))}
            </div>

            {/* Sessions chart */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                  SESSIONS PER {activePeriod === "week" ? "DAY" : activePeriod === "month" ? "WEEK" : "PERIOD"}
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-end",
                  gap: "8px", height: "140px", paddingBottom: "24px",
                }}>
                  {data.sessions.map((val, i) => (
                    <div key={i} style={{
                      flex: 1, display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "4px",
                      height: "100%", justifyContent: "flex-end",
                    }}>
                      <div style={{ fontSize: "9px", color: "#64748B", fontWeight: 600 }}>{val}</div>
                      <div style={{
                        width: "100%",
                        height: `${(val / maxSessions) * 100}px`,
                        background: `rgba(200,255,0,${0.3 + (val / maxSessions) * 0.7})`,
                        borderRadius: "4px 4px 0 0",
                        transition: "height 0.5s ease",
                        position: "relative", overflow: "hidden",
                        boxShadow: val === maxSessions ? "0 0 10px rgba(200,255,0,0.4)" : "none",
                      }}>
                        {val === maxSessions && (
                          <div style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            height: "35%", background: "rgba(255,255,255,0.2)",
                            borderRadius: "4px 4px 0 0",
                          }} />
                        )}
                      </div>
                      <div style={{ fontSize: "9px", color: "#475569" }}>{data.labels[i]}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form score line */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                  FORM SCORE TREND
                </div>
                <div style={{ position: "relative", height: "140px" }}>
                  <svg width="100%" height="140" viewBox={`0 0 ${data.labels.length * 60} 120`} preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="formGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C8FF00" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#C8FF00" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>
                    {/* Area */}
                    <path
                      d={
                        data.formScore.map((v, i) => {
                          const x = (i / (data.formScore.length - 1)) * (data.labels.length * 60 - 20) + 10
                          const y = 100 - ((v - 60) / 40) * 80
                          return `${i === 0 ? "M" : "L"}${x},${y}`
                        }).join(" ") +
                        ` L${(data.labels.length * 60 - 10)},100 L10,100 Z`
                      }
                      fill="url(#formGrad)"
                    />
                    {/* Line */}
                    <path
                      d={data.formScore.map((v, i) => {
                        const x = (i / (data.formScore.length - 1)) * (data.labels.length * 60 - 20) + 10
                        const y = 100 - ((v - 60) / 40) * 80
                        return `${i === 0 ? "M" : "L"}${x},${y}`
                      }).join(" ")}
                      fill="none" stroke="#C8FF00" strokeWidth="2.5"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                    {/* Points */}
                    {data.formScore.map((v, i) => {
                      const x = (i / (data.formScore.length - 1)) * (data.labels.length * 60 - 20) + 10
                      const y = 100 - ((v - 60) / 40) * 80
                      return <circle key={i} cx={x} cy={y} r="4" fill="#C8FF00" />
                    })}
                  </svg>
                  {/* Labels */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginTop: "4px",
                  }}>
                    {data.labels.map((l, i) => (
                      <span key={i} style={{ fontSize: "9px", color: "#475569" }}>{l}</span>
                    ))}
                  </div>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  padding: "10px 12px",
                  background: "rgba(200,255,0,0.04)",
                  border: "1px solid rgba(200,255,0,0.1)",
                  borderRadius: "8px", marginTop: "8px",
                }}>
                  <span style={{ fontSize: "12px", color: "#64748B" }}>Average</span>
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#C8FF00" }}>
                    {Math.round(data.formScore.reduce((a, b) => a + b, 0) / data.formScore.length)}/100
                  </span>
                </div>
              </div>
            </div>

            {/* Calories + Reps */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              {/* Calories */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                  CALORIES BURNED
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-end",
                  gap: "8px", height: "120px", paddingBottom: "20px",
                }}>
                  {data.calories.map((val, i) => (
                    <div key={i} style={{
                      flex: 1, display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "4px",
                      height: "100%", justifyContent: "flex-end",
                    }}>
                      <div style={{
                        width: "100%",
                        height: `${(val / maxCalories) * 90}px`,
                        background: val === maxCalories
                          ? "#F59E0B"
                          : "rgba(245,158,11,0.3)",
                        borderRadius: "4px 4px 0 0",
                        boxShadow: val === maxCalories ? "0 0 10px rgba(245,158,11,0.4)" : "none",
                      }} />
                      <div style={{ fontSize: "9px", color: "#475569" }}>{data.labels[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  fontSize: "13px", color: "#F59E0B", fontWeight: 700,
                  textAlign: "center",
                }}>
                  🔥 {data.calories.reduce((a, b) => a + b, 0).toLocaleString()} kcal total
                </div>
              </div>

              {/* Reps */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                  TOTAL REPS
                </div>
                <div style={{
                  display: "flex", alignItems: "flex-end",
                  gap: "8px", height: "120px", paddingBottom: "20px",
                }}>
                  {data.reps.map((val, i) => (
                    <div key={i} style={{
                      flex: 1, display: "flex", flexDirection: "column",
                      alignItems: "center", gap: "4px",
                      height: "100%", justifyContent: "flex-end",
                    }}>
                      <div style={{
                        width: "100%",
                        height: `${(val / maxReps) * 90}px`,
                        background: val === maxReps
                          ? "#818CF8"
                          : "rgba(129,140,248,0.3)",
                        borderRadius: "4px 4px 0 0",
                        boxShadow: val === maxReps ? "0 0 10px rgba(129,140,248,0.4)" : "none",
                      }} />
                      <div style={{ fontSize: "9px", color: "#475569" }}>{data.labels[i]}</div>
                    </div>
                  ))}
                </div>
                <div style={{
                  fontSize: "13px", color: "#818CF8", fontWeight: 700,
                  textAlign: "center",
                }}>
                  💪 {data.reps.reduce((a, b) => a + b, 0).toLocaleString()} total reps
                </div>
              </div>
            </div>

            {/* Personal bests */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "16px" }}>
                PERSONAL BESTS
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "12px",
              }}>
                {personalBests.map((pb, i) => (
                  <div key={i} style={{
                    background: `${pb.color}08`,
                    border: `1px solid ${pb.color}20`,
                    borderRadius: "12px", padding: "16px",
                    transition: "all 0.2s",
                  }}>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: pb.color, marginBottom: "10px", letterSpacing: "1px" }}>
                      {pb.exercise}
                    </div>
                    <div style={{ display: "flex", gap: "16px" }}>
                      <div>
                        <div style={{ fontSize: "10px", color: "#64748B" }}>Best Reps</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: "white" }}>{pb.reps}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "10px", color: "#64748B" }}>Best Form</div>
                        <div style={{ fontSize: "20px", fontWeight: 800, color: pb.color }}>{pb.formScore}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: "11px", color: "#475569", marginTop: "8px" }}>📅 {pb.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EXERCISES TAB ── */}
        {activeTab === "exercises" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              {/* Exercise breakdown */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                  MOST PRACTICED EXERCISES
                </div>
                {exerciseBreakdown.map((ex, i) => (
                  <div key={i} style={{ marginBottom: "16px" }}>
                    <div style={{
                      display: "flex", justifyContent: "space-between",
                      alignItems: "center", marginBottom: "6px",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{
                          width: "20px", height: "20px", borderRadius: "50%",
                          background: `${ex.color}20`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "10px", fontWeight: 800, color: ex.color,
                        }}>{i + 1}</div>
                        <span style={{ fontSize: "13px", color: "#94A3B8" }}>{ex.name}</span>
                      </div>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: ex.color }}>
                        {ex.sessions} sessions
                      </span>
                    </div>
                    <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                      <div style={{
                        height: "100%", width: `${ex.pct}%`,
                        background: ex.color, borderRadius: "3px",
                        boxShadow: `0 0 6px ${ex.color}60`,
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Donut chart */}
              <div style={card}>
                <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                  MUSCLE GROUP FOCUS
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                  <svg viewBox="0 0 160 160" width="160" height="160">
                    {(() => {
                      const groups = [
                        { label: "Arms", value: 35, color: "#C8FF00" },
                        { label: "Legs", value: 25, color: "#818CF8" },
                        { label: "Core", value: 20, color: "#34D399" },
                        { label: "Chest", value: 12, color: "#F59E0B" },
                        { label: "Back", value: 8, color: "#F472B6" },
                      ]
                      const total = groups.reduce((a, b) => a + b.value, 0)
                      const circumference = 2 * Math.PI * 55
                      let offset = 0
                      return groups.map((g, i) => {
                        const dash = (g.value / total) * circumference
                        const rotation = -90 + (offset / total) * 360
                        offset += g.value
                        return (
                          <circle key={i} cx="80" cy="80" r="55"
                            fill="none" stroke={g.color} strokeWidth="22"
                            strokeDasharray={`${dash} ${circumference - dash}`}
                            transform={`rotate(${rotation} 80 80)`}
                          />
                        )
                      })
                    })()}
                    <circle cx="80" cy="80" r="40" fill="#0D1117" />
                    <text x="80" y="76" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
                      108
                    </text>
                    <text x="80" y="90" textAnchor="middle" fill="#64748B" fontSize="9">
                      sessions
                    </text>
                  </svg>
                </div>
                {[
                  { label: "Arms", value: 35, color: "#C8FF00" },
                  { label: "Legs", value: 25, color: "#818CF8" },
                  { label: "Core", value: 20, color: "#34D399" },
                  { label: "Chest", value: 12, color: "#F59E0B" },
                  { label: "Back", value: 8, color: "#F472B6" },
                ].map((g, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "6px",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ width: "10px", height: "10px", borderRadius: "2px", background: g.color }} />
                      <span style={{ fontSize: "12px", color: "#94A3B8" }}>{g.label}</span>
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: g.color }}>{g.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Form score by exercise */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                AVG FORM SCORE BY EXERCISE
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "12px",
              }}>
                {[
                  { name: "Bicep Curl", score: 88, color: "#C8FF00" },
                  { name: "Squat", score: 82, color: "#818CF8" },
                  { name: "Pushup", score: 76, color: "#34D399" },
                  { name: "Shoulder Press", score: 91, color: "#F59E0B" },
                  { name: "Deadlift", score: 71, color: "#F472B6" },
                  { name: "Tricep Ext", score: 85, color: "#38BDF8" },
                ].map((ex, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px", padding: "16px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "8px" }}>{ex.name}</div>
                    <svg viewBox="0 0 80 80" width="80" height="80" style={{ margin: "0 auto", display: "block" }}>
                      <circle cx="40" cy="40" r="32" fill="none"
                        stroke="rgba(255,255,255,0.06)" strokeWidth="7" />
                      <circle cx="40" cy="40" r="32" fill="none"
                        stroke={ex.color} strokeWidth="7"
                        strokeDasharray={`${(ex.score / 100) * 201} 201`}
                        strokeLinecap="round"
                        transform="rotate(-90 40 40)"
                        style={{ transition: "stroke-dasharray 0.5s ease" }}
                      />
                      <text x="40" y="36" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">
                        {ex.score}
                      </text>
                      <text x="40" y="49" textAnchor="middle" fill="#64748B" fontSize="8">
                        /100
                      </text>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ACHIEVEMENTS TAB ── */}
        {activeTab === "achievements" && (
          <div>
            {/* Progress overview */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px", marginBottom: "24px",
            }}>
              {[
                { label: "Earned", value: 4, total: 6, color: "#C8FF00", icon: "🏆" },
                { label: "Sessions", value: 124, total: 200, color: "#818CF8", icon: "🤖" },
                { label: "Streak", value: 28, total: 30, color: "#F59E0B", icon: "🔥" },
              ].map((s, i) => (
                <div key={i} style={{
                  ...card,
                  background: `${s.color}06`,
                  border: `1px solid ${s.color}20`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px" }}>{s.label}</div>
                      <div style={{ fontSize: "28px", fontWeight: 900, color: s.color }}>
                        {s.value}<span style={{ fontSize: "14px", color: "#64748B" }}>/{s.total}</span>
                      </div>
                    </div>
                    <span style={{ fontSize: "28px" }}>{s.icon}</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                    <div style={{
                      height: "100%", width: `${(s.value / s.total) * 100}%`,
                      background: s.color, borderRadius: "2px",
                      boxShadow: `0 0 8px ${s.color}60`,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Achievement badges */}
            <div style={card}>
              <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "2px", marginBottom: "20px" }}>
                BADGES
              </div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "12px",
              }}>
                {achievements.map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "16px",
                    padding: "16px",
                    background: a.earned ? "rgba(200,255,0,0.04)" : "rgba(255,255,255,0.02)",
                    border: a.earned ? "1px solid rgba(200,255,0,0.15)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "12px",
                    opacity: a.earned ? 1 : 0.5,
                    transition: "all 0.2s",
                  }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "14px",
                      background: a.earned ? "rgba(200,255,0,0.12)" : "rgba(255,255,255,0.04)",
                      border: a.earned ? "1px solid rgba(200,255,0,0.25)" : "1px solid rgba(255,255,255,0.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "24px", flexShrink: 0,
                    }}>{a.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: "14px", fontWeight: 700,
                        color: a.earned ? "white" : "#64748B",
                        marginBottom: "4px",
                      }}>{a.title}</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>{a.desc}</div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {a.earned ? (
                        <>
                          <div style={{ fontSize: "18px" }}>✅</div>
                          <div style={{ fontSize: "10px", color: "#64748B" }}>{a.date}</div>
                        </>
                      ) : (
                        <div style={{
                          fontSize: "11px", color: "#475569",
                          background: "rgba(255,255,255,0.04)",
                          padding: "4px 8px", borderRadius: "6px",
                        }}>Locked</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}
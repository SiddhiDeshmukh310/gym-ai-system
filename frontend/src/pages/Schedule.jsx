import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function Schedule() {
  const navigate = useNavigate()
  const [activeDay, setActiveDay] = useState("Monday")
  const [selectedClass, setSelectedClass] = useState(null)
  const [bookedClasses, setBookedClasses] = useState([])

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const schedule = {
    Monday: [
      { id: 1, time: "06:00", name: "MORNING HIIT", coach: "Coach Alex", duration: "45 min", booked: 18, total: 20, type: "Cardio", color: "#EF4444", desc: "High intensity interval training to kickstart your metabolism.", level: "Advanced", calories: 450 },
      { id: 2, time: "07:00", name: "POWER YOGA", coach: "Maya S.", duration: "60 min", booked: 12, total: 15, type: "Yoga", color: "#818CF8", desc: "Strength-focused yoga for flexibility and mental clarity.", level: "All levels", calories: 200 },
      { id: 3, time: "08:00", name: "CROSSFIT WOD", coach: "Coach Mike", duration: "60 min", booked: 24, total: 25, type: "CrossFit", color: "#F59E0B", desc: "Workout of the day — functional movements at high intensity.", level: "Intermediate", calories: 500 },
      { id: 4, time: "09:30", name: "SPIN CYCLE", coach: "Jenna T.", duration: "45 min", booked: 28, total: 30, type: "Cardio", color: "#EF4444", desc: "Indoor cycling to build endurance and burn fat.", level: "All levels", calories: 400 },
      { id: 5, time: "11:00", name: "STRENGTH TRAINING", coach: "Coach Alex", duration: "60 min", booked: 10, total: 20, type: "Strength", color: "#C8FF00", desc: "Compound lifts and progressive overload for muscle building.", level: "Intermediate", calories: 300 },
      { id: 6, time: "12:30", name: "BOXING FUNDAMENTALS", coach: "Ray D.", duration: "45 min", booked: 8, total: 15, type: "Combat", color: "#F472B6", desc: "Learn boxing technique, footwork and combinations.", level: "Beginner", calories: 350 },
      { id: 7, time: "17:00", name: "EVENING ZUMBA", coach: "Priya K.", duration: "45 min", booked: 20, total: 25, type: "Dance", color: "#34D399", desc: "Dance your way to fitness with Latin-inspired moves.", level: "All levels", calories: 280 },
      { id: 8, time: "18:30", name: "POWERLIFTING", coach: "Coach Mike", duration: "90 min", booked: 6, total: 10, type: "Strength", color: "#C8FF00", desc: "Squat, bench, deadlift — train for maximum strength.", level: "Advanced", calories: 250 },
    ],
    Tuesday: [
      { id: 9, time: "06:30", name: "PILATES CORE", coach: "Maya S.", duration: "45 min", booked: 10, total: 15, type: "Yoga", color: "#818CF8", desc: "Core strengthening and postural alignment.", level: "All levels", calories: 180 },
      { id: 10, time: "08:00", name: "FUNCTIONAL FITNESS", coach: "Coach Alex", duration: "60 min", booked: 15, total: 20, type: "Strength", color: "#C8FF00", desc: "Real-world movement patterns for everyday strength.", level: "Intermediate", calories: 320 },
      { id: 11, time: "10:00", name: "AQUA AEROBICS", coach: "Jenna T.", duration: "45 min", booked: 8, total: 12, type: "Cardio", color: "#38BDF8", desc: "Low-impact water workout — easy on joints.", level: "All levels", calories: 220 },
      { id: 12, time: "17:30", name: "KICKBOXING", coach: "Ray D.", duration: "60 min", booked: 18, total: 20, type: "Combat", color: "#F472B6", desc: "Kicks, punches and combos for full body conditioning.", level: "Intermediate", calories: 480 },
    ],
    Wednesday: [
      { id: 13, time: "06:00", name: "MORNING HIIT", coach: "Coach Alex", duration: "45 min", booked: 16, total: 20, type: "Cardio", color: "#EF4444", desc: "High intensity interval training.", level: "Advanced", calories: 450 },
      { id: 14, time: "09:00", name: "MEDITATION & BREATHWORK", coach: "Maya S.", duration: "30 min", booked: 5, total: 20, type: "Wellness", color: "#818CF8", desc: "Mindfulness and breathing for recovery.", level: "All levels", calories: 50 },
      { id: 15, time: "11:00", name: "OLYMPIC LIFTING", coach: "Coach Mike", duration: "90 min", booked: 7, total: 10, type: "Strength", color: "#C8FF00", desc: "Snatch and clean & jerk technique and training.", level: "Advanced", calories: 300 },
      { id: 16, time: "18:00", name: "BODY PUMP", coach: "Priya K.", duration: "60 min", booked: 22, total: 25, type: "Strength", color: "#C8FF00", desc: "Barbell workout for total body toning.", level: "All levels", calories: 350 },
    ],
    Thursday: [
      { id: 17, time: "07:00", name: "YOGA FLOW", coach: "Maya S.", duration: "60 min", booked: 11, total: 15, type: "Yoga", color: "#818CF8", desc: "Dynamic yoga connecting breath and movement.", level: "All levels", calories: 190 },
      { id: 18, time: "09:30", name: "SPIN CYCLE", coach: "Jenna T.", duration: "45 min", booked: 25, total: 30, type: "Cardio", color: "#EF4444", desc: "Indoor cycling endurance session.", level: "All levels", calories: 400 },
      { id: 19, time: "17:00", name: "CROSSFIT WOD", coach: "Coach Mike", duration: "60 min", booked: 20, total: 25, type: "CrossFit", color: "#F59E0B", desc: "Intense functional workout of the day.", level: "Intermediate", calories: 500 },
    ],
    Friday: [
      { id: 20, time: "06:00", name: "FRIDAY FIRE HIIT", coach: "Coach Alex", duration: "45 min", booked: 19, total: 20, type: "Cardio", color: "#EF4444", desc: "End the week strong with maximum intensity.", level: "Advanced", calories: 480 },
      { id: 21, time: "10:00", name: "STRETCH & RECOVER", coach: "Maya S.", duration: "45 min", booked: 8, total: 20, type: "Wellness", color: "#34D399", desc: "Deep stretching for muscle recovery and flexibility.", level: "All levels", calories: 100 },
      { id: 22, time: "17:30", name: "BOXING SPARRING", coach: "Ray D.", duration: "60 min", booked: 8, total: 10, type: "Combat", color: "#F472B6", desc: "Controlled sparring with coaching.", level: "Intermediate", calories: 420 },
      { id: 23, time: "19:00", name: "EVENING STRENGTH", coach: "Coach Mike", duration: "60 min", booked: 12, total: 20, type: "Strength", color: "#C8FF00", desc: "Friday evening powerlifting session.", level: "Intermediate", calories: 280 },
    ],
    Saturday: [
      { id: 24, time: "08:00", name: "WEEKEND WARRIOR", coach: "Coach Alex", duration: "90 min", booked: 18, total: 20, type: "CrossFit", color: "#F59E0B", desc: "Long intense weekend session for hardcore athletes.", level: "Advanced", calories: 600 },
      { id: 25, time: "10:00", name: "FAMILY FITNESS", coach: "Priya K.", duration: "60 min", booked: 12, total: 20, type: "Family", color: "#34D399", desc: "Fun fitness for the whole family — all ages welcome.", level: "All levels", calories: 200 },
      { id: 26, time: "12:00", name: "DANCE CARDIO", coach: "Priya K.", duration: "45 min", booked: 20, total: 25, type: "Dance", color: "#F472B6", desc: "High energy dance workout.", level: "All levels", calories: 300 },
    ],
    Sunday: [
      { id: 27, time: "09:00", name: "SUNDAY YOGA", coach: "Maya S.", duration: "75 min", booked: 10, total: 15, type: "Yoga", color: "#818CF8", desc: "Restorative Sunday yoga for mind and body reset.", level: "All levels", calories: 150 },
      { id: 28, time: "11:00", name: "MOBILITY & RECOVERY", coach: "Coach Alex", duration: "45 min", booked: 7, total: 20, type: "Wellness", color: "#34D399", desc: "Full body mobility work and foam rolling.", level: "All levels", calories: 80 },
    ],
  }

  const typeColors = {
    Cardio: "#EF4444", Yoga: "#818CF8", CrossFit: "#F59E0B",
    Strength: "#C8FF00", Combat: "#F472B6", Dance: "#34D399",
    Wellness: "#38BDF8", Family: "#34D399",
  }

  function getCapColor(booked, total) {
    const p = booked / total
    if (p >= 0.95) return "#EF4444"
    if (p >= 0.75) return "#F59E0B"
    return "#22C55E"
  }

  function handleBook(cls) {
    if (bookedClasses.includes(cls.id)) {
      setBookedClasses(b => b.filter(id => id !== cls.id))
    } else {
      setBookedClasses(b => [...b, cls.id])
    }
  }

  const todayClasses = schedule[activeDay] || []
  const typeStats = Object.entries(
    todayClasses.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1
      return acc
    }, {})
  )

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

        {/* TOP BAR */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", marginBottom: "28px",
        }}>
          <div>
            <div style={{ fontSize: "11px", color: "#64748B", letterSpacing: "3px", marginBottom: "4px" }}>
              CLASS SCHEDULE
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, margin: 0, letterSpacing: "-0.5px" }}>
              BOOK A CLASS
            </h1>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/ai-trainer")}
              style={{
                padding: "10px 20px", background: "#C8FF00",
                color: "#080C14", border: "none", borderRadius: "10px",
                fontSize: "13px", fontWeight: 800, cursor: "pointer",
              }}>
              🤖 AI Trainer
            </button>
          </div>
        </div>

        {/* DAY SELECTOR */}
        <div style={{
          display: "flex", gap: "8px",
          marginBottom: "24px", overflowX: "auto",
          paddingBottom: "4px",
        }}>
          {days.map(day => {
            const count = (schedule[day] || []).length
            const isActive = activeDay === day
            return (
              <button
                key={day}
                onClick={() => { setActiveDay(day); setSelectedClass(null) }}
                style={{
                  padding: "12px 20px", borderRadius: "12px",
                  cursor: "pointer", fontWeight: 700,
                  background: isActive ? "#C8FF00" : "rgba(255,255,255,0.03)",
                  color: isActive ? "#080C14" : "#64748B",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.07)",
                  transition: "all 0.2s", flexShrink: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", gap: "2px",
                }}>
                <span style={{ fontSize: "13px" }}>{day.slice(0, 3).toUpperCase()}</span>
                <span style={{
                  fontSize: "10px",
                  color: isActive ? "#080C14" : "#475569",
                }}>{count} classes</span>
              </button>
            )
          })}
        </div>

        {/* STATS ROW */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px", marginBottom: "24px",
        }}>
          {[
            { label: "Total Classes", value: todayClasses.length, icon: "📅", color: "#C8FF00" },
            { label: "Available Spots", value: todayClasses.reduce((a, c) => a + (c.total - c.booked), 0), icon: "✅", color: "#22C55E" },
            { label: "My Bookings", value: bookedClasses.length, icon: "🎯", color: "#818CF8" },
            { label: "Est. Calories", value: todayClasses.reduce((a, c) => a + c.calories, 0), icon: "🔥", color: "#F59E0B" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px", padding: "16px 20px",
            }}>
              <div style={{ fontSize: "20px", marginBottom: "6px" }}>{s.icon}</div>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "26px", fontWeight: 900, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>

          {/* CLASS LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {todayClasses.map(cls => {
              const capColor = getCapColor(cls.booked, cls.total)
              const pct = Math.round((cls.booked / cls.total) * 100)
              const isFull = cls.booked >= cls.total
              const isBooked = bookedClasses.includes(cls.id)
              const isSelected = selectedClass?.id === cls.id

              return (
                <div
                  key={cls.id}
                  onClick={() => setSelectedClass(isSelected ? null : cls)}
                  style={{
                    background: isSelected
                      ? "rgba(200,255,0,0.04)"
                      : "rgba(255,255,255,0.02)",
                    border: isSelected
                      ? "1px solid rgba(200,255,0,0.25)"
                      : isBooked
                      ? "1px solid rgba(129,140,248,0.25)"
                      : "1px solid rgba(255,255,255,0.06)",
                    borderLeft: `3px solid ${cls.color}`,
                    borderRadius: "14px",
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={e => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }}
                  onMouseLeave={e => {
                    if (!isSelected) e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    {/* Time */}
                    <div style={{
                      fontSize: "18px", fontWeight: 900,
                      color: cls.color, minWidth: "56px",
                      fontFamily: "monospace",
                    }}>{cls.time}</div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "15px", fontWeight: 800, color: "white", letterSpacing: "1px" }}>
                          {cls.name}
                        </span>
                        {isBooked && (
                          <span style={{
                            fontSize: "10px", padding: "2px 8px",
                            background: "rgba(129,140,248,0.15)",
                            border: "1px solid rgba(129,140,248,0.3)",
                            borderRadius: "10px", color: "#818CF8",
                            fontWeight: 700,
                          }}>BOOKED</span>
                        )}
                      </div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        {cls.coach} · {cls.duration} · {cls.level}
                      </div>
                    </div>

                    {/* Type badge */}
                    <div style={{
                      padding: "4px 12px",
                      background: `${cls.color}15`,
                      border: `1px solid ${cls.color}30`,
                      borderRadius: "8px",
                      fontSize: "11px", fontWeight: 700,
                      color: cls.color,
                    }}>{cls.type}</div>

                    {/* Capacity */}
                    <div style={{ textAlign: "center", minWidth: "60px" }}>
                      <div style={{
                        fontSize: "14px", fontWeight: 800, color: capColor,
                      }}>{cls.booked}/{cls.total}</div>
                      <div style={{ fontSize: "10px", color: "#475569" }}>{pct}% full</div>
                    </div>

                    {/* Book button */}
                    <button
                      onClick={e => { e.stopPropagation(); handleBook(cls) }}
                      style={{
                        padding: "8px 16px", borderRadius: "8px",
                        fontWeight: 700, fontSize: "12px", cursor: "pointer",
                        background: isBooked
                          ? "rgba(129,140,248,0.1)"
                          : isFull
                          ? "rgba(239,68,68,0.08)"
                          : "rgba(200,255,0,0.08)",
                        border: isBooked
                          ? "1px solid rgba(129,140,248,0.3)"
                          : isFull
                          ? "1px solid rgba(239,68,68,0.2)"
                          : "1px solid rgba(200,255,0,0.2)",
                        color: isBooked ? "#818CF8" : isFull ? "#EF4444" : "#C8FF00",
                        transition: "all 0.2s",
                        whiteSpace: "nowrap",
                      }}>
                      {isBooked ? "✓ Booked" : isFull ? "Waitlist" : "Book →"}
                    </button>
                  </div>

                  {/* Capacity bar */}
                  <div style={{
                    marginTop: "10px", height: "3px",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%", width: `${pct}%`,
                      background: capColor, borderRadius: "2px",
                      transition: "width 0.5s",
                    }} />
                  </div>

                  {/* Expanded details */}
                  {isSelected && (
                    <div style={{
                      marginTop: "14px",
                      paddingTop: "14px",
                      borderTop: "1px solid rgba(255,255,255,0.06)",
                      display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "12px",
                    }}>
                      <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "10px", padding: "12px",
                      }}>
                        <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>🔥 CALORIES</div>
                        <div style={{ fontSize: "18px", fontWeight: 800, color: "#F59E0B" }}>{cls.calories}</div>
                      </div>
                      <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "10px", padding: "12px",
                      }}>
                        <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>⏱ DURATION</div>
                        <div style={{ fontSize: "18px", fontWeight: 800, color: "#38BDF8" }}>{cls.duration}</div>
                      </div>
                      <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "10px", padding: "12px",
                      }}>
                        <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>📊 LEVEL</div>
                        <div style={{ fontSize: "15px", fontWeight: 800, color: "#C8FF00" }}>{cls.level}</div>
                      </div>
                      <div style={{
                        gridColumn: "1 / -1",
                        background: "rgba(255,255,255,0.02)",
                        borderRadius: "10px", padding: "12px",
                        fontSize: "13px", color: "#94A3B8", lineHeight: 1.6,
                      }}>
                        {cls.desc}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Class type breakdown */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>
                CLASS TYPES TODAY
              </div>
              {typeStats.map(([type, count]) => (
                <div key={type} style={{ marginBottom: "12px" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginBottom: "5px",
                  }}>
                    <span style={{ fontSize: "13px", color: "#94A3B8" }}>{type}</span>
                    <span style={{
                      fontSize: "13px", fontWeight: 700,
                      color: typeColors[type] || "#C8FF00",
                    }}>{count}</span>
                  </div>
                  <div style={{
                    height: "4px", background: "rgba(255,255,255,0.06)",
                    borderRadius: "2px", overflow: "hidden",
                  }}>
                    <div style={{
                      height: "100%",
                      width: `${(count / todayClasses.length) * 100}%`,
                      background: typeColors[type] || "#C8FF00",
                      borderRadius: "2px",
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline visualization */}
            <div style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px", padding: "20px",
            }}>
              <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>
                DAY TIMELINE
              </div>
              <div style={{ position: "relative", paddingLeft: "40px" }}>
                {/* Vertical line */}
                <div style={{
                  position: "absolute", left: "16px", top: 0, bottom: 0,
                  width: "2px",
                  background: "rgba(255,255,255,0.06)",
                }} />
                {todayClasses.map((cls) => (
                  <div
                    key={cls.id}
                    onClick={() => setSelectedClass(selectedClass?.id === cls.id ? null : cls)}
                    style={{
                      position: "relative", marginBottom: "16px",
                      cursor: "pointer",
                    }}>
                    {/* Dot on timeline */}
                    <div style={{
                      position: "absolute", left: "-28px", top: "4px",
                      width: "10px", height: "10px", borderRadius: "50%",
                      background: cls.color,
                      boxShadow: `0 0 8px ${cls.color}60`,
                    }} />
                    <div style={{
                      background: selectedClass?.id === cls.id
                        ? `${cls.color}15` : "rgba(255,255,255,0.02)",
                      border: `1px solid ${selectedClass?.id === cls.id ? cls.color + "40" : "rgba(255,255,255,0.05)"}`,
                      borderRadius: "10px", padding: "10px 12px",
                      transition: "all 0.2s",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>{cls.name}</span>
                        <span style={{ fontSize: "11px", color: cls.color, fontFamily: "monospace" }}>{cls.time}</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "#64748B", marginTop: "2px" }}>
                        {cls.coach} · {cls.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* My bookings */}
            {bookedClasses.length > 0 && (
              <div style={{
                background: "rgba(129,140,248,0.04)",
                border: "1px solid rgba(129,140,248,0.15)",
                borderRadius: "16px", padding: "20px",
              }}>
                <div style={{ fontSize: "10px", color: "#818CF8", letterSpacing: "3px", marginBottom: "12px" }}>
                  MY BOOKINGS ({bookedClasses.length})
                </div>
                {todayClasses.filter(c => bookedClasses.includes(c.id)).map(cls => (
                  <div key={cls.id} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", marginBottom: "8px",
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "8px",
                  }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "white" }}>{cls.name}</div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>{cls.time} · {cls.duration}</div>
                    </div>
                    <button
                      onClick={() => handleBook(cls)}
                      style={{
                        background: "none", border: "none",
                        color: "#EF4444", cursor: "pointer", fontSize: "12px",
                      }}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}
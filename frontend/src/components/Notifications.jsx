import { useState } from "react"
import { useNavigate } from "react-router-dom"

const allNotifications = [
  { id: 1, type: "success", icon: "🏆", title: "Achievement Unlocked!", desc: "You completed 100 AI training sessions", time: "2 min ago", read: false, path: "/analytics" },
  { id: 2, type: "info", icon: "📅", title: "Class Reminder", desc: "Morning HIIT starts in 30 minutes — Coach Alex", time: "28 min ago", read: false, path: "/schedule" },
  { id: 3, type: "warning", icon: "⚠️", title: "Form Alert", desc: "Your elbow angle needs improvement in Bicep Curl", time: "1 hr ago", read: false, path: "/ai-trainer" },
  { id: 4, type: "success", icon: "🔥", title: "Streak Milestone!", desc: "You are on a 12 day workout streak. Keep going!", time: "3 hr ago", read: true, path: "/analytics" },
  { id: 5, type: "info", icon: "🥗", title: "Diet Reminder", desc: "Don't forget your post-workout protein meal", time: "5 hr ago", read: true, path: "/diet" },
  { id: 6, type: "success", icon: "💪", title: "Personal Best!", desc: "New record: 18 reps with 96 form score on Bicep Curl", time: "Yesterday", read: true, path: "/analytics" },
  { id: 7, type: "info", icon: "📊", title: "Weekly Report Ready", desc: "Your week 11 performance report is available", time: "2 days ago", read: true, path: "/analytics" },
  { id: 8, type: "warning", icon: "📅", title: "Class Almost Full", desc: "CrossFit WOD tomorrow — only 1 spot left!", time: "2 days ago", read: true, path: "/schedule" },
  { id: 9, type: "success", icon: "⭐", title: "Form Score Up!", desc: "Your average form score improved by 8 points this week", time: "3 days ago", read: true, path: "/analytics" },
  { id: 10, type: "info", icon: "🤖", title: "AI Model Updated", desc: "MediaPipe detection accuracy improved to 99.2%", time: "5 days ago", read: true, path: "/ai-trainer" },
]

export default function NotificationsPanel({ onClose }) {
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState(allNotifications)
  const [filter, setFilter] = useState("all")

  const unreadCount = notifications.filter(n => !n.read).length

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  function deleteNotification(id) {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  function handleClick(n) {
    markRead(n.id)
    onClose()
    navigate(n.path)
  }

  const filtered = filter === "all"
    ? notifications
    : filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  const typeColors = {
    success: { bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", dot: "#22C55E" },
    info: { bg: "rgba(56,189,248,0.08)", border: "rgba(56,189,248,0.2)", dot: "#38BDF8" },
    warning: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", dot: "#F59E0B" },
  }

  return (
    <div style={{
      position: "fixed", top: 0, right: 0,
      width: "400px", height: "100vh",
      background: "#0D1117",
      borderLeft: "1px solid rgba(255,255,255,0.08)",
      zIndex: 999,
      display: "flex", flexDirection: "column",
      fontFamily: "system-ui, sans-serif",
      boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
      animation: "slideInRight 0.3s ease",
    }}>

      {/* Header */}
      <div style={{
        padding: "20px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexShrink: 0,
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h2 style={{ fontSize: "18px", fontWeight: 800, color: "white", margin: 0 }}>
              Notifications
            </h2>
            {unreadCount > 0 && (
              <div style={{
                background: "#C8FF00", color: "#080C14",
                borderRadius: "10px", padding: "2px 8px",
                fontSize: "11px", fontWeight: 800,
              }}>{unreadCount}</div>
            )}
          </div>
          <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
            {unreadCount} unread notifications
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {unreadCount > 0 && (
            <button onClick={markAllRead} style={{
              fontSize: "12px", color: "#C8FF00",
              background: "none", border: "none",
              cursor: "pointer", fontWeight: 600,
            }}>Mark all read</button>
          )}
          <button onClick={onClose} style={{
            width: "32px", height: "32px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "8px", color: "white",
            cursor: "pointer", fontSize: "16px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>
        </div>
      </div>

      {/* Filter tabs */}
      <div style={{
        display: "flex", gap: "6px", padding: "12px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0, overflowX: "auto",
      }}>
        {[
          { id: "all", label: "All" },
          { id: "unread", label: "Unread" },
          { id: "success", label: "✅ Success" },
          { id: "warning", label: "⚠️ Alerts" },
          { id: "info", label: "ℹ️ Info" },
        ].map(f => (
          <button key={f.id} onClick={() => setFilter(f.id)} style={{
            padding: "5px 12px", borderRadius: "8px",
            cursor: "pointer", fontWeight: 600, fontSize: "12px",
            background: filter === f.id ? "#C8FF00" : "rgba(255,255,255,0.04)",
            color: filter === f.id ? "#080C14" : "#64748B",
            border: filter === f.id ? "none" : "1px solid rgba(255,255,255,0.07)",
            transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0,
          }}>{f.label}</button>
        ))}
      </div>

      {/* Notifications list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {filtered.length === 0 ? (
          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            height: "200px", color: "#475569",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔔</div>
            <div style={{ fontSize: "14px" }}>No notifications here</div>
          </div>
        ) : (
          filtered.map(n => {
            const colors = typeColors[n.type]
            return (
              <div
                key={n.id}
                style={{
                  display: "flex", gap: "12px",
                  padding: "12px 14px",
                  marginBottom: "8px",
                  background: n.read ? "rgba(255,255,255,0.02)" : colors.bg,
                  border: n.read ? "1px solid rgba(255,255,255,0.05)" : `1px solid ${colors.border}`,
                  borderRadius: "12px",
                  cursor: "pointer", transition: "all 0.2s",
                  position: "relative",
                }}
                onMouseEnter={e => e.currentTarget.style.background = n.read ? "rgba(255,255,255,0.04)" : colors.bg.replace("0.08", "0.12")}
                onMouseLeave={e => e.currentTarget.style.background = n.read ? "rgba(255,255,255,0.02)" : colors.bg}
                onClick={() => handleClick(n)}
              >
                {/* Unread dot */}
                {!n.read && (
                  <div style={{
                    position: "absolute", top: "12px", right: "12px",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: colors.dot,
                    boxShadow: `0 0 6px ${colors.dot}`,
                  }} />
                )}

                {/* Icon */}
                <div style={{
                  width: "40px", height: "40px", borderRadius: "10px",
                  background: n.read ? "rgba(255,255,255,0.04)" : colors.bg,
                  border: n.read ? "1px solid rgba(255,255,255,0.06)" : `1px solid ${colors.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "18px", flexShrink: 0,
                }}>{n.icon}</div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "13px", fontWeight: n.read ? 600 : 700,
                    color: n.read ? "#94A3B8" : "white",
                    marginBottom: "3px",
                    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                  }}>{n.title}</div>
                  <div style={{
                    fontSize: "12px", color: "#64748B",
                    lineHeight: 1.4, marginBottom: "4px",
                  }}>{n.desc}</div>
                  <div style={{ fontSize: "11px", color: "#475569" }}>{n.time}</div>
                </div>

                {/* Delete button */}
                <button
                  onClick={e => { e.stopPropagation(); deleteNotification(n.id) }}
                  style={{
                    background: "none", border: "none",
                    color: "#475569", cursor: "pointer",
                    fontSize: "14px", padding: "2px 4px",
                    flexShrink: 0, alignSelf: "flex-start",
                    opacity: 0,
                  }}
                  onMouseEnter={e => e.target.style.opacity = "1"}
                  onMouseLeave={e => e.target.style.opacity = "0"}
                >✕</button>
              </div>
            )
          })
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding: "16px 24px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        flexShrink: 0,
      }}>
        <button
          onClick={() => { setNotifications([]); }}
          style={{
            width: "100%", padding: "10px",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.15)",
            color: "#EF4444", borderRadius: "8px",
            fontSize: "12px", fontWeight: 600, cursor: "pointer",
          }}>
          Clear All Notifications
        </button>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}
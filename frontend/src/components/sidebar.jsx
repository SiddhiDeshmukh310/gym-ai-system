import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import NotificationsPanel from "./Notifications"

export default function Sidebar() {
  const location = useLocation()
  const [showNotifications, setShowNotifications] = useState(false)

  const navItems = [
    { label: "🏠 Dashboard", path: "/dashboard" },
    { label: "👤 Profile", path: "/profile" },
    { label: "👥 Members", path: "/members" },
    { label: "📅 Schedule", path: "/schedule" },
    { label: "🥗 Diet Plans", path: "/diet" },
    { label: "📊 Analytics", path: "/analytics" },
    { label: "🤖 AI Trainer", path: "/ai-trainer" },
  ]

  const unreadCount = 3

  return (
    <>
      <div style={{
        width: "220px", height: "100vh",
        background: "#0A0F1A",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex", flexDirection: "column",
        flexShrink: 0, position: "sticky", top: 0,
        fontFamily: "system-ui, sans-serif",
      }}>
        {/* Logo */}
        <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "4px" }}>
            POWERED BY AI
          </div>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h2 style={{
              color: "#C8FF00", margin: 0,
              fontSize: "20px", letterSpacing: "4px", fontWeight: 900,
            }}>APEX GYM</h2>
          </Link>
        </div>

        {/* Nav */}
        <div style={{ padding: "16px 12px", flex: 1, overflowY: "auto" }}>
          <div style={{
            fontSize: "10px", color: "#64748B",
            letterSpacing: "2px", padding: "0 8px",
            marginBottom: "8px",
          }}>NAVIGATION</div>

          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "block", padding: "10px 12px",
                  borderRadius: "8px", textDecoration: "none",
                  fontWeight: isActive ? 700 : 400,
                  fontSize: "14px",
                  color: isActive ? "#C8FF00" : "#64748B",
                  background: isActive ? "rgba(200,255,0,0.08)" : "transparent",
                  borderLeft: isActive ? "3px solid #C8FF00" : "3px solid transparent",
                  transition: "all 0.2s",
                  marginBottom: "2px",
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#94A3B8"
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#64748B"
                    e.currentTarget.style.background = "transparent"
                  }
                }}
              >{item.label}</Link>
            )
          })}
        </div>

        {/* Bottom */}
        <div style={{
          padding: "12px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          {/* Notification bell */}
          <button
            onClick={() => setShowNotifications(true)}
            style={{
              width: "100%", padding: "10px 12px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "10px", color: "white",
              cursor: "pointer", fontSize: "13px",
              fontWeight: 600, marginBottom: "10px",
              display: "flex", alignItems: "center",
              gap: "10px", position: "relative",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(200,255,0,0.06)"
              e.currentTarget.style.borderColor = "rgba(200,255,0,0.2)"
              e.currentTarget.style.color = "#C8FF00"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)"
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"
              e.currentTarget.style.color = "white"
            }}
          >
            <span style={{ fontSize: "16px" }}>🔔</span>
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span style={{
                marginLeft: "auto",
                background: "#C8FF00", color: "#080C14",
                borderRadius: "10px", padding: "1px 7px",
                fontSize: "11px", fontWeight: 800,
              }}>{unreadCount}</span>
            )}
          </button>

          {/* User card */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px", padding: "12px",
            display: "flex", alignItems: "center", gap: "10px",
            cursor: "pointer",
          }}
            onClick={() => window.location.href = "/profile"}
          >
            <div style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "rgba(200,255,0,0.15)",
              border: "2px solid rgba(200,255,0,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#C8FF00", fontWeight: 700, fontSize: "14px",
            }}>A</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13px", fontWeight: 600, color: "white" }}>Athlete</div>
              <div style={{ fontSize: "11px", color: "#C8FF00" }}>Pro Member</div>
            </div>
            <span style={{ color: "#475569", fontSize: "12px" }}>→</span>
          </div>
        </div>
      </div>

      {/* Notifications panel */}
      {showNotifications && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setShowNotifications(false)}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(4px)",
              zIndex: 998,
            }}
          />
          <NotificationsPanel onClose={() => setShowNotifications(false)} />
        </>
      )}
    </>
  )
}
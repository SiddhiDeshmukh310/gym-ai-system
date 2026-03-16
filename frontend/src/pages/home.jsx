import { useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"

export default function Home() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [ActiveStat, SetActiveStat] = useState(0)
  const [counters, setCounters] = useState({ members: 0, classes: 0, trainers: 0, success: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide(s => (s + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Counter animation
  useEffect(() => {
    const targets = { members: 10000, classes: 500, trainers: 50, success: 98 }
    const duration = 2000
    const steps = 60
    const increment = duration / steps
    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const ease = 1 - Math.pow(1 - progress, 3)
      setCounters({
        members: Math.round(targets.members * ease),
        classes: Math.round(targets.classes * ease),
        trainers: Math.round(targets.trainers * ease),
        success: Math.round(targets.success * ease),
      })
      if (step >= steps) clearInterval(timer)
    }, increment)
    return () => clearInterval(timer)
  }, [])

  const slides = [
    {
      title: "AI POSE DETECTION",
      subtitle: "Real-time skeleton tracking",
      desc: "Google MediaPipe tracks 33 body landmarks. Get instant form feedback every rep.",
      icon: "🤖",
      color: "#C8FF00",
      path: "/ai-trainer",
      stats: [{ label: "Accuracy", value: "99%" }, { label: "Landmarks", value: "33" }, { label: "FPS", value: "60" }],
    },
    {
      title: "SMART DIET PLANS",
      subtitle: "Personalized nutrition",
      desc: "Custom meal plans for men, women and children. Macro tracking built in.",
      icon: "🥗",
      color: "#34D399",
      path: "/diet",
      stats: [{ label: "Meals/Day", value: "5" }, { label: "Calories", value: "Smart" }, { label: "Profiles", value: "3" }],
    },
    {
      title: "CLASS SCHEDULING",
      subtitle: "Book in one click",
      desc: "HIIT, Yoga, CrossFit and more. Real-time capacity tracking and instant booking.",
      icon: "📅",
      color: "#818CF8",
      path: "/schedule",
      stats: [{ label: "Classes/Week", value: "40+" }, { label: "Coaches", value: "12" }, { label: "Styles", value: "8" }],
    },
    {
      title: "PROGRESS DASHBOARD",
      subtitle: "Track everything",
      desc: "Beautiful charts showing your strength, form scores and workout history.",
      icon: "📊",
      color: "#F59E0B",
      path: "/dashboard",
      stats: [{ label: "Metrics", value: "20+" }, { label: "Charts", value: "6" }, { label: "History", value: "∞" }],
    },
    {
      title: "500+ EXERCISES",
      subtitle: "Full library",
      desc: "Every exercise with AI-guided form tips, rep schemes and calorie tracking.",
      icon: "🏋️",
      color: "#F472B6",
      path: "/members",
      stats: [{ label: "Exercises", value: "500+" }, { label: "Categories", value: "9" }, { label: "Levels", value: "3" }],
    },
  ]

  const navLinks = [
    { label: "Features", action: () => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Plans", action: () => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" }) },
    { label: "Dashboard", action: () => navigate("/dashboard") },
    { label: "Diet", action: () => navigate("/diet") },
  ]

  const footerLinks = {
    PLATFORM: [
      { label: "Dashboard", path: "/dashboard" },
      { label: "AI Trainer", path: "/ai-trainer" },
      { label: "Diet Plans", path: "/diet" },
      { label: "Schedule", path: "/schedule" },
    ],
    MEMBERSHIP: [
      { label: "Starter Plan", path: "/signup" },
      { label: "Pro Plan", path: "/signup" },
      { label: "Elite Plan", path: "/signup" },
      { label: "Family Plan", path: "/signup" },
    ],
    COMPANY: [
      { label: "About", path: "/" },
      { label: "Members", path: "/members" },
      { label: "Analytics", path: "/analytics" },
      { label: "Contact", path: "/" },
    ],
  }

  function HandleFeatureClick(title) {
    if (title.includes("AI")) navigate("/ai-trainer")
    else if (title.includes("Diet")) navigate("/diet")
    else if (title.includes("Dashboard")) navigate("/dashboard")
    else if (title.includes("500")) navigate("/members", { state: { tab: "exercises" } })
    else if (title.includes("Family")) navigate("/members", { state: { tab: "family" } })
    else if (title.includes("Class")) navigate("/schedule")
  }

  const currentSlide = slides[activeSlide]

  return (
    <div style={{
      background: "#080C14",
      color: "white",
      fontFamily: "system-ui, -apple-system, sans-serif",
      width: "100%",
      overflowX: "hidden",
    }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? "rgba(8,12,20,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(12px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s",
        padding: "0 60px", height: "70px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%",
      }}>
        <div onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div style={{
            width: "36px", height: "36px", background: "#C8FF00", borderRadius: "8px",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", fontWeight: 900, color: "#080C14",
          }}>A</div>
          <span style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "3px", color: "#C8FF00" }}>APEX GYM</span>
        </div>
        <div style={{ display: "flex", gap: "40px" }}>
          {navLinks.map(l => (
            <span key={l.label} onClick={l.action} style={{
              color: "#94A3B8", fontSize: "14px", fontWeight: 500,
              letterSpacing: "1px", cursor: "pointer", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = "#C8FF00"}
              onMouseLeave={e => e.target.style.color = "#94A3B8"}
            >{l.label}</span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => navigate("/login")} style={{
            padding: "8px 20px", background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)", color: "white",
            borderRadius: "8px", cursor: "pointer", fontSize: "14px", fontWeight: 600,
          }}>Login</button>
          <button onClick={() => navigate("/signup")} style={{
            padding: "8px 20px", background: "#C8FF00", border: "none",
            color: "#080C14", borderRadius: "8px", cursor: "pointer",
            fontSize: "14px", fontWeight: 700,
          }}>Join Now</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        minHeight: "100vh", width: "100%",
        display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column",
        textAlign: "center", padding: "120px 40px 80px",
        position: "relative", overflow: "hidden",

        backgroundImage: "url('/gym-hero.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
}}>
    <div style={{
    position: "absolute", inset: 0,
    background: "linear-gradient(to bottom, rgba(8,12,20,0.75) 0%, rgba(8,12,20,0.85) 100%)",
    zIndex: 0,
  }} />
      
        {/* Animated grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(200,255,0,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(200,255,0,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px", zIndex: 0,
          animation: "gridMove 20s linear infinite",
        }} />

        {/* 3D floating orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "10%",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,255,0,0.06) 0%, transparent 70%)",
          animation: "float1 6s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", right: "8%",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)",
          animation: "float2 8s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", left: "20%",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(244,114,182,0.06) 0%, transparent 70%)",
          animation: "float3 7s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        {/* 3D rotating ring */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px", height: "800px",
          border: "1px solid rgba(200,255,0,0.04)",
          borderRadius: "50%",
          animation: "spin3d 20s linear infinite",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "600px",
          border: "1px solid rgba(200,255,0,0.06)",
          borderRadius: "50%",
          animation: "spin3d 15s linear infinite reverse",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: "1000px", width: "100%" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(200,255,0,0.08)", border: "1px solid rgba(200,255,0,0.2)",
            borderRadius: "20px", padding: "6px 16px",
            marginBottom: "32px", fontSize: "13px", color: "#C8FF00", letterSpacing: "1px",
          }}>
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "#C8FF00", animation: "pulse 1.5s infinite", display: "inline-block",
            }} />
            AI-POWERED FITNESS PLATFORM
          </div>

          <h1 style={{
            fontSize: "clamp(56px, 10vw, 120px)",
            fontWeight: 900, lineHeight: 0.95,
            margin: "0 0 32px", letterSpacing: "-3px",
          }}>
            TRAIN<span style={{ color: "#C8FF00", textShadow: "0 0 40px rgba(200,255,0,0.4)" }}> SMARTER.</span>
            <br />
            LIVE<span style={{ color: "#C8FF00", textShadow: "0 0 40px rgba(200,255,0,0.4)" }}> STRONGER.</span>
          </h1>

          <p style={{
            fontSize: "18px", color: "#94A3B8",
            maxWidth: "600px", margin: "0 auto 48px", lineHeight: 1.7,
          }}>
            India's most advanced gym management platform with real-time AI pose detection,
            personalized diet plans, and smart progress tracking.
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => navigate("/signup")} style={{
              padding: "18px 48px", background: "#C8FF00",
              color: "#080C14", border: "none", borderRadius: "12px",
              fontSize: "16px", fontWeight: 800, cursor: "pointer",
              letterSpacing: "1px", transition: "all 0.3s",
              boxShadow: "0 0 30px rgba(200,255,0,0.2)",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(200,255,0,0.4)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0) scale(1)"
                e.currentTarget.style.boxShadow = "0 0 30px rgba(200,255,0,0.2)"
              }}
            >START FREE TRIAL →</button>

            <button onClick={() => navigate("/ai-trainer")} style={{
              padding: "18px 48px",
              background: "rgba(255,255,255,0.05)",
              color: "white", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "12px", fontSize: "16px",
              fontWeight: 700, cursor: "pointer", transition: "all 0.3s",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)"
                e.currentTarget.style.transform = "translateY(-3px)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)"
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >🤖 Try AI Trainer</button>
          </div>

          {/* Quick nav pills */}
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "32px", flexWrap: "wrap" }}>
            {[
              { label: "🥗 Diet Plans", path: "/diet" },
              { label: "📅 Schedule", path: "/schedule" },
              { label: "👥 Members", path: "/members" },
              { label: "📊 Dashboard", path: "/dashboard" },
            ].map(item => (
              <span key={item.label} onClick={() => navigate(item.path)} style={{
                padding: "6px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px", fontSize: "13px",
                color: "#64748B", cursor: "pointer", transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = "#C8FF00"
                  e.currentTarget.style.borderColor = "rgba(200,255,0,0.3)"
                  e.currentTarget.style.background = "rgba(200,255,0,0.06)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "#64748B"
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)"
                }}
              >{item.label}</span>
            ))}
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: "40px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: "8px",
          color: "#64748B", fontSize: "12px",
          animation: "bounce 2s infinite",
        }}>
          <span>SCROLL</span>
          <span>↓</span>
        </div>
      </section>

      {/* ── ANIMATED STATS ── */}
      <section style={{
        width: "100%",
        background: "rgba(200,255,0,0.04)",
        borderTop: "1px solid rgba(200,255,0,0.1)",
        borderBottom: "1px solid rgba(200,255,0,0.1)",
        padding: "60px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "40px",
      }}>
        {[
          { value: counters.members.toLocaleString() + "+", label: "Active Members", icon: "👥", color: "#C8FF00" },
          { value: counters.classes + "+", label: "Classes Monthly", icon: "📅", color: "#818CF8" },
          { value: counters.trainers + "+", label: "Expert Trainers", icon: "🏆", color: "#34D399" },
          { value: counters.success + "%", label: "Success Rate", icon: "⭐", color: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} style={{
            textAlign: "center",
            padding: "32px 20px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "20px",
            transition: "all 0.3s",
            cursor: "default",
            position: "relative",
            overflow: "hidden",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = `${s.color}08`
              e.currentTarget.style.border = `1px solid ${s.color}30`
              e.currentTarget.style.transform = "translateY(-4px)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.02)"
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
              e.currentTarget.style.transform = "translateY(0)"
            }}
          >
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>{s.icon}</div>
            <div style={{
              fontSize: "52px", fontWeight: 900,
              color: s.color, letterSpacing: "-2px",
              lineHeight: 1, marginBottom: "8px",
              textShadow: `0 0 30px ${s.color}40`,
            }}>{s.value}</div>
            <div style={{ fontSize: "14px", color: "#64748B", letterSpacing: "1px" }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* ── 3D FEATURE SLIDER ── */}
      <section style={{
        width: "100%", padding: "100px 80px",
        background: "#080C14",
        overflow: "hidden",
      }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontSize: "12px", color: "#C8FF00", letterSpacing: "4px", marginBottom: "16px" }}>
            EXPLORE FEATURES
          </div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, margin: 0 }}>
            EVERYTHING YOU NEED<br />
            <span style={{ color: "#C8FF00" }}>TO DOMINATE</span>
          </h2>
        </div>

        {/* 3D Slide viewer */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "60px", alignItems: "center",
          maxWidth: "1400px", margin: "0 auto",
        }}>
          {/* Left — slide content */}
          <div style={{
            background: `${currentSlide.color}08`,
            border: `1px solid ${currentSlide.color}25`,
            borderRadius: "24px", padding: "48px",
            transition: "all 0.5s ease",
            position: "relative", overflow: "hidden",
            minHeight: "400px",
            display: "flex", flexDirection: "column",
            justifyContent: "space-between",
          }}>
            {/* Background glow */}
            <div style={{
              position: "absolute", top: "-50px", right: "-50px",
              width: "200px", height: "200px", borderRadius: "50%",
              background: `radial-gradient(circle, ${currentSlide.color}20 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />

            <div>
              <div style={{ fontSize: "64px", marginBottom: "20px" }}>{currentSlide.icon}</div>
              <div style={{
                fontSize: "11px", color: currentSlide.color,
                letterSpacing: "3px", marginBottom: "12px",
              }}>{currentSlide.subtitle.toUpperCase()}</div>
              <h3 style={{
                fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900,
                margin: "0 0 20px", color: "white", lineHeight: 1,
              }}>{currentSlide.title}</h3>
              <p style={{ color: "#94A3B8", fontSize: "16px", lineHeight: 1.7, marginBottom: "32px" }}>
                {currentSlide.desc}
              </p>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
              {currentSlide.stats.map((stat, i) => (
                <div key={i} style={{
                  flex: 1, background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "12px", padding: "14px",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: currentSlide.color }}>{stat.value}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px" }}>{stat.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate(currentSlide.path)}
              style={{
                padding: "14px 32px",
                background: currentSlide.color, color: "#080C14",
                border: "none", borderRadius: "10px",
                fontSize: "14px", fontWeight: 800,
                cursor: "pointer", letterSpacing: "1px",
                alignSelf: "flex-start",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              EXPLORE {currentSlide.title.split(" ")[0]} →
            </button>
          </div>

          {/* Right — 3D cards stack */}
          <div style={{ position: "relative", height: "400px" }}>
            {slides.map((slide, i) => {
              const offset = i - activeSlide
              const normalizedOffset = ((offset % slides.length) + slides.length) % slides.length
              const pos = normalizedOffset <= slides.length / 2 ? normalizedOffset : normalizedOffset - slides.length

              return (
                <div
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    position: "absolute",
                    width: "100%",
                    background: i === activeSlide
                      ? `${slide.color}12`
                      : "rgba(255,255,255,0.02)",
                    border: i === activeSlide
                      ? `1px solid ${slide.color}40`
                      : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px", padding: "24px",
                    cursor: "pointer",
                    transition: "all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: `
                      translateY(${pos * 60}px)
                      translateX(${Math.abs(pos) * 10}px)
                      scale(${1 - Math.abs(pos) * 0.08})
                      rotateX(${pos * 3}deg)
                    `,
                    zIndex: slides.length - Math.abs(pos),
                    opacity: 1 - Math.abs(pos) * 0.25,
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{
                      width: "52px", height: "52px", borderRadius: "14px",
                      background: `${slide.color}15`,
                      border: `1px solid ${slide.color}30`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "24px", flexShrink: 0,
                    }}>{slide.icon}</div>
                    <div>
                      <div style={{
                        fontSize: "15px", fontWeight: 800, color: "white",
                        marginBottom: "4px",
                      }}>{slide.title}</div>
                      <div style={{ fontSize: "12px", color: slide.color }}>{slide.subtitle}</div>
                    </div>
                    {i === activeSlide && (
                      <div style={{
                        marginLeft: "auto",
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: slide.color,
                        boxShadow: `0 0 8px ${slide.color}`,
                        animation: "pulse 1.5s infinite",
                      }} />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "48px" }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              onClick={() => setActiveSlide(i)}
              style={{
                height: "4px",
                width: i === activeSlide ? "32px" : "8px",
                borderRadius: "2px",
                background: i === activeSlide ? currentSlide.color : "rgba(255,255,255,0.15)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </section>

      {/* ── AI TRAINER 3D PREVIEW ── */}
      <section style={{
        backgroundImage: "url('/gym-sunset.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",  // parallax effect!
  position: "relative",
}}>

   <div style={{
    position: "absolute", inset: 0,
    background: "rgba(8,12,20,0.88)",
    zIndex: 0,
  }} />
  
        <div style={{
    display: "grid", gridTemplateColumns: "1fr 1fr",
    gap: "80px", alignItems: "center",
    maxWidth: "1400px", margin: "0 auto",
    position: "relative", zIndex: 1,   // ← ADD THIS
  }}>
          <div>
            <div style={{ fontSize: "12px", color: "#C8FF00", letterSpacing: "4px", marginBottom: "16px" }}>
              AI TECHNOLOGY
            </div>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, margin: "0 0 24px", lineHeight: 1.1 }}>
              REAL-TIME<br />
              <span style={{ color: "#C8FF00" }}>POSE DETECTION</span>
            </h2>
            <p style={{ color: "#64748B", fontSize: "16px", lineHeight: 1.8, marginBottom: "40px" }}>
              Google MediaPipe tracks 33 body landmarks in real time.
              Get instant form feedback, automatic rep counting, and a live form score.
            </p>

            {/* Feature list with animated bars */}
            {[
              { label: "Detection Accuracy", value: 99, color: "#C8FF00" },
              { label: "Form Score Precision", value: 94, color: "#34D399" },
              { label: "Rep Count Accuracy", value: 97, color: "#818CF8" },
              { label: "Real-time Speed", value: 60, color: "#F59E0B" },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "13px", color: "#94A3B8" }}>{item.label}</span>
                  <span style={{ fontSize: "13px", fontWeight: 700, color: item.color }}>
                    {item.value}{item.label.includes("Speed") ? " FPS" : "%"}
                  </span>
                </div>
                <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                  <div style={{
                    height: "100%", width: `${item.value}%`,
                    background: item.color, borderRadius: "2px",
                    boxShadow: `0 0 8px ${item.color}60`,
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>
            ))}

            <button onClick={() => navigate("/ai-trainer")} style={{
              marginTop: "32px", padding: "16px 40px",
              background: "#C8FF00", color: "#080C14",
              border: "none", borderRadius: "10px",
              fontSize: "15px", fontWeight: 700,
              cursor: "pointer", letterSpacing: "1px",
              transition: "all 0.3s",
              boxShadow: "0 0 20px rgba(200,255,0,0.2)",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-3px)"
                e.currentTarget.style.boxShadow = "0 8px 30px rgba(200,255,0,0.4)"
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)"
                e.currentTarget.style.boxShadow = "0 0 20px rgba(200,255,0,0.2)"
              }}
            >TRY AI TRAINER →</button>
          </div>

          {/* 3D mockup card */}
          <div onClick={() => navigate("/ai-trainer")} style={{
            background: "#0D1117",
            border: "1px solid rgba(200,255,0,0.2)",
            borderRadius: "24px", padding: "28px",
            boxShadow: "0 0 80px rgba(200,255,0,0.08), 0 40px 80px rgba(0,0,0,0.4)",
            cursor: "pointer", transition: "all 0.4s",
            transform: "perspective(1000px) rotateY(-5deg) rotateX(2deg)",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(-8px)"
              e.currentTarget.style.boxShadow = "0 0 100px rgba(200,255,0,0.15), 0 50px 100px rgba(0,0,0,0.5)"
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg) rotateX(2deg)"
              e.currentTarget.style.boxShadow = "0 0 80px rgba(200,255,0,0.08), 0 40px 80px rgba(0,0,0,0.4)"
            }}
          >
            {/* Camera preview */}
            <div style={{
              background: "#050A18", borderRadius: "16px",
              aspectRatio: "16/9", marginBottom: "20px",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              border: "1px solid rgba(200,255,0,0.1)",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(circle at 50% 60%, rgba(200,255,0,0.06) 0%, transparent 70%)",
              }} />
              {/* Skeleton visualization */}
              <svg width="200" height="140" viewBox="0 0 200 140" style={{ position: "relative", zIndex: 1 }}>
                {/* Body skeleton */}
                <line x1="100" y1="30" x2="100" y2="80" stroke="#C8FF00" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="45" x2="70" y2="70" stroke="#C8FF00" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="45" x2="130" y2="70" stroke="#C8FF00" strokeWidth="2" opacity="0.8" />
                <line x1="70" y1="70" x2="65" y2="95" stroke="#22C55E" strokeWidth="2" opacity="0.8" />
                <line x1="130" y1="70" x2="135" y2="95" stroke="#22C55E" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="80" x2="85" y2="110" stroke="#C8FF00" strokeWidth="2" opacity="0.8" />
                <line x1="100" y1="80" x2="115" y2="110" stroke="#C8FF00" strokeWidth="2" opacity="0.8" />
                {/* Joints */}
                {[[100,30],[100,45],[70,70],[130,70],[65,95],[135,95],[100,80],[85,110],[115,110]].map(([x,y], i) => (
                  <circle key={i} cx={x} cy={y} r="4" fill="#C8FF00"
                    style={{ filter: "drop-shadow(0 0 4px #C8FF00)" }} />
                ))}
                {/* Angle label */}
                <rect x="138" y="60" width="38" height="18" rx="4" fill="rgba(0,0,0,0.7)" />
                <text x="157" y="73" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">142°</text>
              </svg>

              {/* Corner brackets */}
              {[
                { top: 8, left: 8, borderTop: "2px solid #C8FF00", borderLeft: "2px solid #C8FF00" },
                { top: 8, right: 8, borderTop: "2px solid #C8FF00", borderRight: "2px solid #C8FF00" },
                { bottom: 8, left: 8, borderBottom: "2px solid #C8FF00", borderLeft: "2px solid #C8FF00" },
                { bottom: 8, right: 8, borderBottom: "2px solid #C8FF00", borderRight: "2px solid #C8FF00" },
              ].map((s, i) => (
                <div key={i} style={{ position: "absolute", width: "16px", height: "16px", ...s }} />
              ))}

              <div style={{
                position: "absolute", bottom: "10px", left: "50%",
                transform: "translateX(-50%)",
                background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(200,255,0,0.2)",
                borderRadius: "20px", padding: "4px 14px",
                fontSize: "11px", color: "#C8FF00", fontWeight: 600,
                whiteSpace: "nowrap",
              }}>💡 Keep elbows fixed</div>
            </div>

            {/* Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {[
                { label: "REPS", value: "12", color: "#C8FF00" },
                { label: "FORM", value: "94", color: "#22C55E" },
                { label: "SET", value: "2/4", color: "#818CF8" },
                { label: "KCAL", value: "48", color: "#F59E0B" },
              ].map(m => (
                <div key={m.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "12px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "4px" }}>{m.label}</div>
                  <div style={{ fontSize: "20px", fontWeight: 800, color: m.color }}>{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANS ── */}
      <section id="plans" style={{ padding: "100px 80px", width: "100%", ackgroundImage: "url('/gym-weights.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  position: "relative",
}}> 
 <div style={{
    position: "absolute", inset: 0,
    background: "rgba(8,12,20,0.92)",
    zIndex: 0,
  }} />
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontSize: "12px", color: "#C8FF00", letterSpacing: "4px", marginBottom: "16px" }}>MEMBERSHIP</div>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900, margin: 0 }}>
            CHOOSE YOUR<span style={{ color: "#C8FF00" }}> PLAN</span>
          </h2>
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
    {/* title + cards go here */}
  </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px", maxWidth: "1200px", margin: "0 auto",
        }}>
          {[
            {
              name: "STARTER", price: "₹999", period: "/month", color: "#64748B",
              features: ["Access to gym floor", "Basic diet plan", "Class booking", "Progress tracking"],
              cta: "Get Started",
            },
            {
              name: "PRO", price: "₹1,999", period: "/month", color: "#C8FF00", popular: true,
              features: ["Everything in Starter", "AI Trainer sessions", "Custom diet plans", "Priority booking", "Form score tracking"],
              cta: "Go Pro",
            },
            {
              name: "ELITE", price: "₹3,499", period: "/month", color: "#818CF8",
              features: ["Everything in Pro", "Personal trainer", "Family profiles (4)", "Nutrition coaching", "Unlimited classes", "Monthly body scan"],
              cta: "Go Elite",
            },
          ].map((plan, i) => (
            <div key={i} style={{
              background: plan.popular ? "rgba(200,255,0,0.04)" : "rgba(255,255,255,0.02)",
              border: plan.popular ? "2px solid rgba(200,255,0,0.4)" : "1px solid rgba(255,255,255,0.06)",
              borderRadius: "20px", padding: "40px 32px",
              position: "relative", transition: "all 0.3s",
              transform: plan.popular ? "scale(1.05)" : "scale(1)",
            }}
              onMouseEnter={e => e.currentTarget.style.transform = plan.popular ? "scale(1.08) translateY(-4px)" : "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = plan.popular ? "scale(1.05)" : "scale(1)"}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute", top: "-16px", left: "50%",
                  transform: "translateX(-50%)",
                  background: "#C8FF00", color: "#080C14",
                  fontSize: "11px", fontWeight: 800,
                  padding: "4px 20px", borderRadius: "20px", letterSpacing: "2px",
                  boxShadow: "0 0 20px rgba(200,255,0,0.4)",
                }}>MOST POPULAR</div>
              )}
              <div style={{ fontSize: "12px", letterSpacing: "3px", color: plan.color, marginBottom: "12px" }}>{plan.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "28px" }}>
                <span style={{ fontSize: "48px", fontWeight: 900, color: "white" }}>{plan.price}</span>
                <span style={{ color: "#64748B", fontSize: "14px" }}>{plan.period}</span>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "28px", marginBottom: "32px" }}>
                {plan.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                    <div style={{
                      width: "18px", height: "18px", borderRadius: "50%",
                      background: `${plan.color}20`, border: `1px solid ${plan.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "10px", color: plan.color, flexShrink: 0,
                    }}>✓</div>
                    <span style={{ color: "#94A3B8", fontSize: "14px" }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate("/signup")} style={{
                width: "100%", padding: "16px",
                background: plan.popular ? "#C8FF00" : "rgba(255,255,255,0.05)",
                color: plan.popular ? "#080C14" : "white",
                border: plan.popular ? "none" : "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px", fontSize: "15px",
                fontWeight: 700, cursor: "pointer", letterSpacing: "1px",
                transition: "all 0.2s",
                boxShadow: plan.popular ? "0 0 20px rgba(200,255,0,0.2)" : "none",
              }}>
                {plan.cta} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "60px 80px 40px",
        background: "#050A12", width: "100%",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "60px", marginBottom: "60px" }}>
          <div>
            <div onClick={() => navigate("/")} style={{
              fontSize: "20px", fontWeight: 800, color: "#C8FF00",
              letterSpacing: "3px", marginBottom: "16px", cursor: "pointer",
            }}>APEX GYM</div>
            <p style={{ color: "#64748B", fontSize: "14px", lineHeight: 1.8, maxWidth: "280px" }}>
              India's most advanced AI-powered gym platform. Train smarter, live stronger.
            </p>
            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              {[{ label: "Login", path: "/login" }, { label: "Sign Up", path: "/signup" }].map(b => (
                <button key={b.label} onClick={() => navigate(b.path)} style={{
                  padding: "8px 16px",
                  background: b.label === "Sign Up" ? "#C8FF00" : "transparent",
                  border: b.label === "Sign Up" ? "none" : "1px solid rgba(255,255,255,0.15)",
                  color: b.label === "Sign Up" ? "#080C14" : "white",
                  borderRadius: "8px", fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}>{b.label}</button>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div style={{ fontSize: "11px", letterSpacing: "3px", color: "#C8FF00", marginBottom: "20px" }}>{title}</div>
              {links.map(l => (
                <div key={l.label} onClick={() => navigate(l.path)} style={{
                  color: "#64748B", fontSize: "14px", marginBottom: "10px",
                  cursor: "pointer", transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#C8FF00"}
                  onMouseLeave={e => e.target.style.color = "#64748B"}
                >{l.label}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px",
          display: "flex", justifyContent: "space-between",
          alignItems: "center", color: "#64748B", fontSize: "13px",
        }}>
          <span>© 2025 APEX GYM. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <span onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }}>Dashboard</span>
            <span onClick={() => navigate("/ai-trainer")} style={{ cursor: "pointer" }}>AI Trainer</span>
            <span onClick={() => navigate("/diet")} style={{ cursor: "pointer" }}>Diet Plans</span>
          </div>
          <span>Made with 💪 in India</span>
        </div>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-30px) translateX(20px); }
          66% { transform: translateY(20px) translateX(-10px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-40px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
        }
        @keyframes spin3d {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes gridMove {
          from { background-position: 0 0; }
          to { background-position: 60px 60px; }
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  )
}
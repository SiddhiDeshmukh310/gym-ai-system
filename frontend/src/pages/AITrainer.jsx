import { useEffect, useRef, useState } from "react"
import { useNavigate} from "react-router-dom"
import Sidebar from "../components/sidebar"

export default function AITrainer() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const stageRef = useRef("down")

  const [reps, setReps] = useState(0)
  const [exercise, setExercise] = useState("BICEP CURL")
  const [angle, setAngle] = useState(0)
  const [formTip, setFormTip] = useState("Stand back so both arms are visible")
  const [formScore, setFormScore] = useState(0)
  const [repHistory, setRepHistory] = useState([])
  const [currentSet, setCurrentSet] = useState(1)
  const [sessionTime, setSessionTime] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [selectedExercise, setSelectedExercise] = useState("BICEP CURL")
  const [toast, setToast] = useState(null)
  const [showSummary, setShowSummary] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [handsDetected, setHandsDetected] = useState(0)
  const [fps, setFps] = useState(0)
  const fpsRef = useRef({ count: 0, last: 0 })

  const repsPerSet = 10
  const totalSets = 4

  const exercises = [
    { id: "BICEP CURL", icon: "💪", tip: "Keep elbows fixed at sides" },
    { id: "TRICEP EXT", icon: "🦾", tip: "Keep upper arms still" },
    { id: "PUSHUP", icon: "🏋️", tip: "Keep body straight as a plank" },
    { id: "SHOULDER PRESS", icon: "🙌", tip: "Don't arch your lower back" },
    { id: "SQUAT", icon: "🦵", tip: "Keep knees behind toes" },
  ]

  const exerciseTips = {
    "BICEP CURL": ["Keep elbows fixed at sides", "Squeeze at the top", "Lower slowly — 2 seconds down", "Don't swing your back"],
    "TRICEP EXT": ["Keep upper arms still", "Full extension at bottom", "Control the movement", "Elbows pointing forward"],
    "PUSHUP": ["Keep body straight", "Chest to floor", "Elbows at 45°", "Breathe out on the way up"],
    "SHOULDER PRESS": ["Don't arch your back", "Full extension overhead", "Control the descent", "Keep core tight"],
    "SQUAT": ["Knees behind toes", "Chest up throughout", "Go below parallel", "Drive through heels"],
  }

  useEffect(() => {
    let interval
    if (timerActive) interval = setInterval(() => setSessionTime(t => t + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  function showToast(message, type) {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2000)
  }

  function calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x)
    let angle = Math.abs(radians * 180 / Math.PI)
    if (angle > 180) angle = 360 - angle
    return angle
  }

  function getJointColor(angle) {
    if (angle >= 60 && angle <= 90) return "#22C55E"
    if (angle >= 40 && angle <= 120) return "#F59E0B"
    return "#EF4444"
  }

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    function loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
        const s = document.createElement("script")
        s.src = src
        s.onload = resolve
        s.onerror = reject
        document.head.appendChild(s)
      })
    }

    async function init() {
      try {
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js")
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils/drawing_utils.js")
        await loadScript("https://cdn.jsdelivr.net/npm/@mediapipe/pose/pose.js")

        const pose = new window.Pose({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
        })

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          minDetectionConfidence: 0.6,
          minTrackingConfidence: 0.6,
        })

        pose.onResults(results => {
          // FPS counter
          fpsRef.current.count++
          const now = Date.now()
          if (now - fpsRef.current.last >= 1000) {
            setFps(fpsRef.current.count)
            fpsRef.current.count = 0
            fpsRef.current.last = now
          }

          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height)

          if (!results.poseLandmarks) { setHandsDetected(0); return }
          const lm = results.poseLandmarks
          setHandsDetected(2)

          const leftAngle = calculateAngle(lm[11], lm[13], lm[15])
          const rightAngle = calculateAngle(lm[12], lm[14], lm[16])
          const avgAngle = Math.round((leftAngle + rightAngle) / 2)
          setAngle(avgAngle)

          let score
          if (avgAngle >= 60 && avgAngle <= 90) score = 100
          else if ((avgAngle >= 40 && avgAngle < 60) || (avgAngle > 90 && avgAngle <= 120)) score = 75
          else score = 40
          setFormScore(score)

          // Draw connections
          const connections = [[11, 13], [13, 15], [12, 14], [14, 16], [11, 12]]
          connections.forEach(([a, b]) => {
            const x1 = lm[a].x * canvas.width
            const y1 = lm[a].y * canvas.height
            const x2 = lm[b].x * canvas.width
            const y2 = lm[b].y * canvas.height
            const grad = ctx.createLinearGradient(x1, y1, x2, y2)
            grad.addColorStop(0, "rgba(200,255,0,0.95)")
            grad.addColorStop(1, "rgba(200,255,0,0.5)")
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.strokeStyle = grad
            ctx.lineWidth = 4
            ctx.shadowBlur = 16
            ctx.shadowColor = "#C8FF00"
            ctx.stroke()
          })

          // Draw joints
          const keyJoints = [
            { idx: 11 }, { idx: 12 },
            { idx: 13 }, { idx: 14 },
            { idx: 15 }, { idx: 16 },
          ]
          keyJoints.forEach(({ idx }) => {
            const x = lm[idx].x * canvas.width
            const y = lm[idx].y * canvas.height
            const isElbow = idx === 13 || idx === 14
            const jAngle = isElbow ? (idx === 13 ? leftAngle : rightAngle) : avgAngle
            const color = isElbow ? getJointColor(jAngle) : "#C8FF00"

            // Outer glow ring
            ctx.beginPath()
            ctx.arc(x, y, 16, 0, 2 * Math.PI)
            ctx.fillStyle = `${color}20`
            ctx.shadowBlur = 0
            ctx.fill()

            // Inner dot
            ctx.beginPath()
            ctx.arc(x, y, 7, 0, 2 * Math.PI)
            ctx.fillStyle = color
            ctx.shadowBlur = 20
            ctx.shadowColor = color
            ctx.fill()

            // Elbow angle label
            if (isElbow) {
              const a = Math.round(idx === 13 ? leftAngle : rightAngle)
              ctx.shadowBlur = 0
              ctx.fillStyle = "rgba(0,0,0,0.75)"
              ctx.beginPath()
              ctx.roundRect ? ctx.roundRect(x + 14, y - 14, 46, 22, 4) : ctx.rect(x + 14, y - 14, 46, 22)
              ctx.fill()
              ctx.fillStyle = color
              ctx.font = "bold 12px system-ui"
              ctx.fillText(`${a}°`, x + 20, y + 3)
            }
          })
          ctx.shadowBlur = 0

          // Rep detection
          if (avgAngle > 160) stageRef.current = "down"
          if (avgAngle < 40 && stageRef.current === "down") {
            stageRef.current = "up"
            setTimerActive(true)
            setReps(prev => {
              const newRep = prev + 1
              setRepHistory(h => [...h.slice(-11), score])
              const tips = exerciseTips[selectedExercise] || []
              setFormTip(tips[newRep % tips.length] || "Good rep!")
              if (score > 75) showToast(`✓ Rep ${newRep} — Score: ${score}`, "success")
              else showToast("⚠ Fix your form", "warning")
              if (newRep >= repsPerSet) {
                setCurrentSet(s => { showToast(`🔥 Set ${s} complete!`, "success"); return Math.min(s + 1, totalSets) })
                return 0
              }
              return newRep
            })
          }
        })

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1920 }, height: { ideal: 1080 }, facingMode: "user" }
        })
        video.srcObject = stream
        await new Promise(r => { video.onloadedmetadata = r })
        await video.play()
        setCameraReady(true)

        const camera = new window.Camera(video, {
          onFrame: async () => { await pose.send({ image: video }) },
          width: 1280, height: 720,
        })
        camera.start()
      } catch (err) {
        console.error("MediaPipe error:", err)
      }
    }
    init()
  }, [])

  const calories = Math.round((reps + (currentSet - 1) * repsPerSet) * 0.5)
  const avgScore = repHistory.length
    ? Math.round(repHistory.reduce((a, b) => a + b, 0) / repHistory.length) : 0
  const scoreColor = formScore > 75 ? "#22C55E" : formScore > 50 ? "#F59E0B" : "#EF4444"
  const scoreLabel = formScore >= 85 ? "EXCELLENT" : formScore >= 70 ? "GOOD" : formScore >= 50 ? "IMPROVE" : "FIX FORM"

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "220px 1fr 300px",
      width: "100vw",
      height: "100vh",
      background: "#080C14",
      color: "white",
      overflow: "hidden",
      fontFamily: "system-ui, sans-serif",
      position: "fixed",
      top: 0, left: 0,
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        background: "#0A0F1A",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}>
        <Sidebar />
      </div>

      {/* ── CENTER CAMERA ── */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: "12px 12px 12px 12px",
        gap: "10px",
        overflow: "hidden",
        background: "#080C14",
      }}>

        {/* TOP STATUS BAR */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: "12px",
          padding: "10px 20px",
          flexShrink: 0,
          height: "50px",
        }}>
          {/* Live indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{
                width: "8px", height: "8px", borderRadius: "50%",
                background: cameraReady ? "#EF4444" : "#64748B",
                boxShadow: cameraReady ? "0 0 8px #EF4444" : "none",
                animation: cameraReady ? "blink 1.5s infinite" : "none",
              }} />
              <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "3px", color: cameraReady ? "#EF4444" : "#64748B" }}>
                {cameraReady ? "LIVE" : "LOADING"}
              </span>
            </div>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "14px" }}>✋</span>
              <span style={{
                fontSize: "12px",
                color: handsDetected === 2 ? "#22C55E" : handsDetected === 1 ? "#F59E0B" : "#EF4444",
                fontWeight: 600,
              }}>
                {handsDetected === 2 ? "Both arms detected" : handsDetected === 1 ? "1 arm detected" : "No detection — step back"}
              </span>
            </div>
            <div style={{ width: "1px", height: "18px", background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "11px", color: "#475569" }}>
              {fps} FPS
            </span>
          </div>

          {/* Exercise name */}
          <div style={{
            color: "#C8FF00", fontWeight: 900,
            letterSpacing: "5px", fontSize: "14px",
            textShadow: "0 0 20px rgba(200,255,0,0.4)",
          }}>
            {exercise}
          </div>

          {/* Timer */}
          <div style={{
            fontSize: "22px", fontWeight: 700,
            fontFamily: "monospace",
            color: timerActive ? "white" : "#475569",
            letterSpacing: "2px",
          }}>
            {formatTime(sessionTime)}
          </div>
        </div>

        {/* CAMERA — takes ALL remaining space */}
        <div style={{
          flex: 1,
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          background: "#050A18",
          border: "1px solid rgba(200,255,0,0.1)",
          minHeight: 0,
        }}>
          <video ref={videoRef} style={{ display: "none" }} />
          <canvas
            ref={canvasRef}
            width="1280"
            height="720"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />

          {/* Loading overlay */}
          {!cameraReady && (
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              background: "#050A18", gap: "24px",
            }}>
              <div style={{
                width: "64px", height: "64px",
                border: "3px solid rgba(200,255,0,0.1)",
                borderTop: "3px solid #C8FF00",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }} />
              <div>
                <div style={{ color: "#C8FF00", fontSize: "14px", letterSpacing: "4px", fontWeight: 700, textAlign: "center" }}>
                  LOADING AI MODEL
                </div>
                <div style={{ color: "#475569", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>
                  First load takes 10–20 seconds
                </div>
              </div>
            </div>
          )}

          {/* Corner brackets */}
          {cameraReady && ["tl", "tr", "bl", "br"].map(pos => (
            <div key={pos} style={{
              position: "absolute",
              top: pos.startsWith("t") ? "16px" : "auto",
              bottom: pos.startsWith("b") ? "16px" : "auto",
              left: pos.endsWith("l") ? "16px" : "auto",
              right: pos.endsWith("r") ? "16px" : "auto",
              width: "24px", height: "24px",
              borderTop: pos.startsWith("t") ? "2px solid rgba(200,255,0,0.6)" : "none",
              borderBottom: pos.startsWith("b") ? "2px solid rgba(200,255,0,0.6)" : "none",
              borderLeft: pos.endsWith("l") ? "2px solid rgba(200,255,0,0.6)" : "none",
              borderRight: pos.endsWith("r") ? "2px solid rgba(200,255,0,0.6)" : "none",
            }} />
          ))}

          {/* Form score overlay — top right on camera */}
          {cameraReady && (
            <div style={{
              position: "absolute", top: "20px", right: "20px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${scoreColor}40`,
              borderRadius: "12px",
              padding: "10px 16px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <div style={{ fontSize: "22px", fontWeight: 900, color: scoreColor }}>
                {formScore}
              </div>
              <div>
                <div style={{ fontSize: "9px", color: "#64748B", letterSpacing: "2px" }}>FORM</div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: scoreColor }}>{scoreLabel}</div>
              </div>
            </div>
          )}

          {/* Rep counter overlay — top left on camera */}
          {cameraReady && (
            <div style={{
              position: "absolute", top: "20px", left: "20px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(200,255,0,0.2)",
              borderRadius: "12px",
              padding: "10px 16px",
              display: "flex", alignItems: "center", gap: "10px",
            }}>
              <div
                key={reps}
                style={{
                  fontSize: "28px", fontWeight: 900,
                  color: "#C8FF00",
                  animation: reps > 0 ? "repBounce 0.3s ease" : "none",
                  lineHeight: 1,
                }}>
                {reps}
              </div>
              <div>
                <div style={{ fontSize: "9px", color: "#64748B", letterSpacing: "2px" }}>REPS</div>
                <div style={{ fontSize: "11px", color: "#94A3B8" }}>Set {currentSet}/{totalSets}</div>
              </div>
            </div>
          )}

          {/* Form tip — bottom center */}
          {cameraReady && (
            <div style={{
              position: "absolute", bottom: "20px", left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "25px",
              padding: "10px 24px",
              fontSize: "13px", color: "#94A3B8",
              whiteSpace: "nowrap",
              maxWidth: "90%",
            }}>
              💡 {formTip}
            </div>
          )}

          {/* Angle display — bottom left */}
          {cameraReady && angle > 0 && (
            <div style={{
              position: "absolute", bottom: "20px", left: "20px",
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${getJointColor(angle)}40`,
              borderRadius: "10px",
              padding: "8px 14px",
            }}>
              <div style={{ fontSize: "9px", color: "#64748B", letterSpacing: "2px" }}>ANGLE</div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: getJointColor(angle) }}>{angle}°</div>
            </div>
          )}
        </div>

        {/* EXERCISE PILLS — bottom */}
        <div style={{
          display: "flex", gap: "8px",
          flexShrink: 0, height: "44px",
        }}>
          {exercises.map(e => (
            <button
              key={e.id}
              onClick={() => {
                setSelectedExercise(e.id)
                setExercise(e.id)
                setReps(0)
                setCurrentSet(1)
                setRepHistory([])
                stageRef.current = "down"
                setFormTip(e.tip)
              }}
              style={{
                flex: 1, height: "44px",
                borderRadius: "10px", cursor: "pointer",
                fontWeight: 700, fontSize: "11px",
                background: e.id === selectedExercise
                  ? "#C8FF00" : "rgba(255,255,255,0.04)",
                color: e.id === selectedExercise ? "#080C14" : "#64748B",
                border: e.id === selectedExercise
                  ? "none" : "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.2s",
                letterSpacing: "0.5px",
                display: "flex", alignItems: "center",
                justifyContent: "center", gap: "5px",
              }}
              onMouseEnter={e => {
                if (e.currentTarget.style.background !== "rgb(200, 255, 0)") {
                  e.currentTarget.style.background = "rgba(200,255,0,0.08)"
                  e.currentTarget.style.color = "#C8FF00"
                }
              }}
              onMouseLeave={ev => {
                const ex = exercises.find(x => x.id === selectedExercise)
                if (ev.currentTarget.textContent.includes(ex?.icon) && ev.currentTarget.textContent.includes(ex?.id.split(" ")[0])) return
                if (ev.currentTarget.style.background === "rgb(200, 255, 0)") return
                ev.currentTarget.style.background = "rgba(255,255,255,0.04)"
                ev.currentTarget.style.color = "#64748B"
              }}
            >
              {e.icon} {e.id}
            </button>
          ))}
        </div>
      </div>

      {/* ── RIGHT METRICS PANEL ── */}
      <div style={{
        background: "#0A0F1A",
        borderLeft: "1px solid rgba(255,255,255,0.06)",
        height: "100vh",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        gap: "10px",
      }}>

        {/* FORM SCORE */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${scoreColor}25`,
          borderRadius: "16px", padding: "16px",
          display: "flex", alignItems: "center", gap: "16px",
          flexShrink: 0,
        }}>
          {/* SVG ring */}
          <svg viewBox="0 0 100 100" width="80" height="80" style={{ flexShrink: 0 }}>
            <circle cx="50" cy="50" r="40" fill="none"
              stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle cx="50" cy="50" r="40" fill="none"
              stroke={scoreColor} strokeWidth="8"
              strokeDasharray={`${(formScore / 100) * 251} 251`}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
              style={{ transition: "stroke-dasharray 0.5s ease, stroke 0.3s" }}
            />
            <text x="50" y="46" textAnchor="middle" fill="white" fontSize="18" fontWeight="900">{formScore}</text>
            <text x="50" y="60" textAnchor="middle" fill="#64748B" fontSize="8">/100</text>
          </svg>
          <div>
            <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "4px" }}>FORM SCORE</div>
            <div style={{ fontSize: "20px", fontWeight: 900, color: scoreColor, marginBottom: "2px" }}>{scoreLabel}</div>
            <div style={{ fontSize: "11px", color: "#475569" }}>
              {formScore >= 85 ? "Keep it up! 🔥" : formScore >= 70 ? "Almost perfect" : "Focus on form"}
            </div>
          </div>
        </div>

        {/* REPS + SET side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", flexShrink: 0 }}>
          {/* REPS */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px", padding: "14px",
          }}>
            <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "4px" }}>REPS</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
              <div key={reps} style={{
                fontSize: "48px", fontWeight: 900, color: "#C8FF00", lineHeight: 1,
                animation: reps > 0 ? "repBounce 0.3s ease" : "none",
              }}>{reps}</div>
              <div style={{ color: "#475569", fontSize: "14px" }}>/{repsPerSet}</div>
            </div>
            <div style={{ height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
              <div style={{
                height: "100%",
                width: `${(reps / repsPerSet) * 100}%`,
                background: "#C8FF00", borderRadius: "2px",
                transition: "width 0.3s",
                boxShadow: "0 0 8px rgba(200,255,0,0.5)",
              }} />
            </div>
          </div>

          {/* SET */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px", padding: "14px",
          }}>
            <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "4px" }}>SET</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "8px" }}>
              <div style={{ fontSize: "48px", fontWeight: 900, color: "#C8FF00", lineHeight: 1 }}>{currentSet}</div>
              <div style={{ color: "#475569", fontSize: "14px" }}>/{totalSets}</div>
            </div>
            <div style={{ display: "flex", gap: "5px" }}>
              {Array.from({ length: totalSets }).map((_, i) => (
                <div key={i} style={{
                  flex: 1, height: "3px", borderRadius: "2px",
                  background: i < currentSet ? "#C8FF00" : "rgba(255,255,255,0.08)",
                  transition: "background 0.3s",
                  boxShadow: i < currentSet ? "0 0 6px rgba(200,255,0,0.4)" : "none",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* MINI STATS */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "8px", flexShrink: 0,
        }}>
          {[
            { icon: "⏱", label: "Time", value: formatTime(sessionTime), color: "#38BDF8" },
            { icon: "🔥", label: "Calories", value: `${calories} kcal`, color: "#F59E0B" },
            { icon: "📐", label: "Angle", value: `${angle}°`, color: getJointColor(angle) },
            { icon: "⭐", label: "Avg Score", value: avgScore, color: avgScore > 75 ? "#22C55E" : "#F59E0B" },
          ].map(s => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              borderRadius: "12px", padding: "12px",
            }}>
              <div style={{ fontSize: "10px", color: "#64748B", marginBottom: "4px" }}>
                {s.icon} {s.label}
              </div>
              <div style={{ fontSize: "18px", fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* REP HISTORY */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "14px", padding: "14px",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "12px" }}>
            REP HISTORY
          </div>
          <div style={{
            display: "flex", gap: "5px",
            alignItems: "flex-end", height: "56px",
          }}>
            {repHistory.length === 0
              ? <div style={{ color: "#475569", fontSize: "12px", alignSelf: "center" }}>Complete reps to see history</div>
              : repHistory.map((score, i) => (
                <div key={i} style={{
                  flex: 1,
                  height: `${(score / 100) * 56}px`,
                  borderRadius: "4px",
                  background: score > 75 ? "#22C55E" : score > 50 ? "#F59E0B" : "#EF4444",
                  boxShadow: i === repHistory.length - 1
                    ? `0 0 10px ${score > 75 ? "#22C55E" : score > 50 ? "#F59E0B" : "#EF4444"}`
                    : "none",
                  transition: "height 0.3s",
                  opacity: 0.6 + (i / repHistory.length) * 0.4,
                }} />
              ))
            }
          </div>
        </div>

        {/* CURRENT EXERCISE INFO */}
        <div style={{
          background: "rgba(200,255,0,0.03)",
          border: "1px solid rgba(200,255,0,0.1)",
          borderRadius: "14px", padding: "14px",
          flexShrink: 0,
        }}>
          <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "10px" }}>
            EXERCISE TIPS
          </div>
          {(exerciseTips[selectedExercise] || []).map((tip, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "flex-start", gap: "8px",
              marginBottom: "8px",
            }}>
              <span style={{
                color: "#C8FF00", fontSize: "10px", marginTop: "2px",
                flexShrink: 0,
              }}>→</span>
              <span style={{ fontSize: "12px", color: "#94A3B8", lineHeight: 1.5 }}>{tip}</span>
            </div>
          ))}
        </div>

        {/* SPACER */}
        <div style={{ flex: 1 }} />

        {/* END SESSION */}
        <button
          onClick={() => { setShowSummary(true); setTimerActive(false) }}
          style={{
            width: "100%", padding: "14px",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#EF4444", fontWeight: 700,
            cursor: "pointer", fontSize: "14px",
            letterSpacing: "2px", transition: "all 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.15)"
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.4)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(239,68,68,0.06)"
            e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"
          }}
        >
          ⏹ END SESSION
        </button>
      </div>

      {/* ── TOAST ── */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "32px", left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 28px", borderRadius: "12px", zIndex: 9999,
          background: toast.type === "success"
            ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
          border: toast.type === "success"
            ? "1px solid rgba(34,197,94,0.5)" : "1px solid rgba(245,158,11,0.5)",
          color: "white", fontWeight: 600, fontSize: "14px",
          backdropFilter: "blur(16px)",
          animation: "slideUp 0.3s ease",
          whiteSpace: "nowrap",
          boxShadow: toast.type === "success"
            ? "0 8px 32px rgba(34,197,94,0.15)" : "0 8px 32px rgba(245,158,11,0.15)",
        }}>
          {toast.message}
        </div>
      )}

      {/* ── SESSION SUMMARY ── */}
      {showSummary && (
        <div style={{
          position: "fixed", inset: 0,
          background: "rgba(0,0,0,0.9)",
          backdropFilter: "blur(16px)",
          display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000,
        }}>
          <div style={{
            background: "#0D1117",
            border: "1px solid rgba(200,255,0,0.15)",
            borderRadius: "24px", padding: "40px",
            maxWidth: "520px", width: "90%",
            boxShadow: "0 0 80px rgba(200,255,0,0.05)",
          }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{
                width: "60px", height: "60px", borderRadius: "50%",
                background: "rgba(200,255,0,0.08)",
                border: "1px solid rgba(200,255,0,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "28px", margin: "0 auto 16px",
              }}>🏆</div>
              <h2 style={{ color: "#C8FF00", letterSpacing: "4px", margin: "0 0 6px", fontSize: "22px", fontWeight: 900 }}>
                SESSION COMPLETE
              </h2>
              <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>Great work! Here's your breakdown</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
              {[
                { label: "Total Reps", value: reps + (currentSet - 1) * repsPerSet, color: "#C8FF00" },
                { label: "Sets Done", value: `${currentSet - 1}/${totalSets}`, color: "#818CF8" },
                { label: "Avg Score", value: avgScore, color: scoreColor },
                { label: "Calories", value: `${calories}`, color: "#F59E0B" },
                { label: "Duration", value: formatTime(sessionTime), color: "#38BDF8" },
                { label: "Exercise", value: selectedExercise.split(" ")[0], color: "#94A3B8" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "14px", textAlign: "center",
                }}>
                  <div style={{ fontSize: "9px", color: "#64748B", letterSpacing: "1px", marginBottom: "6px", textTransform: "uppercase" }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 800, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            {repHistory.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "2px", marginBottom: "8px" }}>
                  REP QUALITY
                </div>
                <div style={{ display: "flex", gap: "5px", alignItems: "flex-end", height: "40px" }}>
                  {repHistory.map((score, i) => (
                    <div key={i} style={{
                      flex: 1, height: `${(score / 100) * 40}px`, borderRadius: "3px",
                      background: score > 75 ? "#22C55E" : score > 50 ? "#F59E0B" : "#EF4444",
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={() => navigate("/dashboard")}
                style={{
                  flex: 1, padding: "14px",
                  background: "#C8FF00", color: "#080C14",
                  border: "none", borderRadius: "12px",
                  fontWeight: 800, cursor: "pointer",
                  fontSize: "14px", letterSpacing: "1px",
                }}>
                Save & Return
              </button>
              <button
                onClick={() => {
                  setShowSummary(false)
                  setReps(0); setSessionTime(0)
                  setRepHistory([]); setCurrentSet(1)
                  stageRef.current = "down"
                  setTimerActive(false)
                }}
                style={{
                  flex: 1, padding: "14px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "white", borderRadius: "12px",
                  fontWeight: 700, cursor: "pointer", fontSize: "14px",
                }}>
                Train Again
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #EF4444; }
          50% { opacity: 0.3; box-shadow: none; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes repBounce {
          0% { transform: scale(1); }
          40% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes slideUp {
          from { transform: translateX(-50%) translateY(12px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
      `}</style>
    </div>
  )
}
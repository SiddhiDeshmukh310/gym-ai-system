import { useState } from "react"
import { useNavigate , useLocation } from "react-router-dom"
import Sidebar from "../components/sidebar"

// ── DATA OUTSIDE COMPONENT — this fixes the tab switching bug ──
const members = [
  { id: 1, name: "Rahul Mehta", age: 28, gender: "male", plan: "Pro", avatar: "R", color: "#C8FF00", joinDate: "Jan 2024", weight: "75kg", height: "5'10\"", goal: "Build Muscle", formScore: 88, totalSessions: 124, streak: 12, family: ["Priya Mehta", "Aryan Mehta"] },
  { id: 2, name: "Priya Sharma", age: 26, gender: "female", plan: "Elite", avatar: "P", color: "#F472B6", joinDate: "Mar 2023", weight: "58kg", height: "5'5\"", goal: "Tone Up", formScore: 92, totalSessions: 210, streak: 28, family: [] },
  { id: 3, name: "Arjun Kumar", age: 32, gender: "male", plan: "Starter", avatar: "A", color: "#818CF8", joinDate: "Jun 2024", weight: "82kg", height: "6'0\"", goal: "Lose Fat", formScore: 74, totalSessions: 45, streak: 5, family: ["Sneha Kumar", "Rohan Kumar"] },
  { id: 4, name: "Sneha Tiwari", age: 24, gender: "female", plan: "Pro", avatar: "S", color: "#34D399", joinDate: "Nov 2023", weight: "55kg", height: "5'4\"", goal: "Flexibility", formScore: 95, totalSessions: 189, streak: 45, family: [] },
  { id: 5, name: "Dev Rathi", age: 35, gender: "male", plan: "Elite", avatar: "D", color: "#F59E0B", joinDate: "Feb 2023", weight: "88kg", height: "5'11\"", goal: "Athletic", formScore: 81, totalSessions: 312, streak: 60, family: ["Ananya Rathi", "Kabir Rathi", "Meera Rathi"] },
  { id: 6, name: "Ananya Bose", age: 22, gender: "female", plan: "Starter", avatar: "A", color: "#38BDF8", joinDate: "Aug 2024", weight: "52kg", height: "5'3\"", goal: "General Health", formScore: 68, totalSessions: 22, streak: 3, family: [] },
  { id: 7, name: "Vikram Singh", age: 40, gender: "male", plan: "Pro", avatar: "V", color: "#EF4444", joinDate: "Jan 2023", weight: "92kg", height: "6'1\"", goal: "Build Muscle", formScore: 79, totalSessions: 278, streak: 18, family: ["Kavya Singh"] },
  { id: 8, name: "Kavya Nair", age: 29, gender: "female", plan: "Elite", avatar: "K", color: "#C8FF00", joinDate: "Apr 2023", weight: "60kg", height: "5'6\"", goal: "Tone Up", formScore: 91, totalSessions: 198, streak: 33, family: [] },
  { id: 9, name: "Rohan Gupta", age: 14, gender: "child", plan: "Family", avatar: "R", color: "#F472B6", joinDate: "Sep 2024", weight: "48kg", height: "5'2\"", goal: "Active & Fit", formScore: 85, totalSessions: 18, streak: 7, family: [] },
  { id: 10, name: "Meera Joshi", age: 8, gender: "child", plan: "Family", avatar: "M", color: "#34D399", joinDate: "Oct 2024", weight: "28kg", height: "4'3\"", goal: "Healthy Growth", formScore: 90, totalSessions: 12, streak: 4, family: [] },
]

const exercises = [
  { name: "Barbell Bench Press", category: "Chest", level: "Intermediate", equipment: "Barbell", muscles: "Pectorals, Triceps", reps: "3×8-12", calories: 45, icon: "🏋️" },
  { name: "Dumbbell Flyes", category: "Chest", level: "Beginner", equipment: "Dumbbells", muscles: "Pectorals", reps: "3×12-15", calories: 35, icon: "💪" },
  { name: "Incline Bench Press", category: "Chest", level: "Intermediate", equipment: "Barbell", muscles: "Upper Pectorals", reps: "3×8-12", calories: 42, icon: "🏋️" },
  { name: "Push-Up", category: "Chest", level: "Beginner", equipment: "Bodyweight", muscles: "Pectorals, Triceps", reps: "3×15-20", calories: 30, icon: "💪" },
  { name: "Cable Crossover", category: "Chest", level: "Advanced", equipment: "Cable", muscles: "Pectorals", reps: "3×12-15", calories: 38, icon: "🔗" },
  { name: "Decline Bench Press", category: "Chest", level: "Advanced", equipment: "Barbell", muscles: "Lower Pectorals", reps: "3×8-12", calories: 44, icon: "🏋️" },
  { name: "Chest Dips", category: "Chest", level: "Intermediate", equipment: "Bodyweight", muscles: "Pectorals, Triceps", reps: "3×10-15", calories: 40, icon: "💪" },
  { name: "Pec Deck Machine", category: "Chest", level: "Beginner", equipment: "Machine", muscles: "Pectorals", reps: "3×15", calories: 32, icon: "🔧" },
  { name: "Deadlift", category: "Back", level: "Advanced", equipment: "Barbell", muscles: "Erectors, Glutes, Hamstrings", reps: "4×5-8", calories: 80, icon: "🏋️" },
  { name: "Pull-Up", category: "Back", level: "Intermediate", equipment: "Bodyweight", muscles: "Lats, Biceps", reps: "3×8-12", calories: 45, icon: "💪" },
  { name: "Barbell Row", category: "Back", level: "Intermediate", equipment: "Barbell", muscles: "Lats, Rhomboids", reps: "3×8-12", calories: 50, icon: "🏋️" },
  { name: "Lat Pulldown", category: "Back", level: "Beginner", equipment: "Cable", muscles: "Lats", reps: "3×12-15", calories: 40, icon: "🔗" },
  { name: "Seated Cable Row", category: "Back", level: "Beginner", equipment: "Cable", muscles: "Mid-Back", reps: "3×12-15", calories: 38, icon: "🔗" },
  { name: "T-Bar Row", category: "Back", level: "Advanced", equipment: "Barbell", muscles: "Lats, Rhomboids", reps: "3×8-12", calories: 52, icon: "🏋️" },
  { name: "Single Arm Dumbbell Row", category: "Back", level: "Beginner", equipment: "Dumbbells", muscles: "Lats", reps: "3×12 each", calories: 36, icon: "💪" },
  { name: "Face Pull", category: "Back", level: "Beginner", equipment: "Cable", muscles: "Rear Delts, Rhomboids", reps: "3×15-20", calories: 28, icon: "🔗" },
  { name: "Overhead Press", category: "Shoulders", level: "Intermediate", equipment: "Barbell", muscles: "Deltoids, Triceps", reps: "4×6-10", calories: 55, icon: "🏋️" },
  { name: "Dumbbell Lateral Raise", category: "Shoulders", level: "Beginner", equipment: "Dumbbells", muscles: "Lateral Deltoids", reps: "3×12-15", calories: 25, icon: "💪" },
  { name: "Arnold Press", category: "Shoulders", level: "Intermediate", equipment: "Dumbbells", muscles: "All Deltoid Heads", reps: "3×10-12", calories: 42, icon: "💪" },
  { name: "Front Raise", category: "Shoulders", level: "Beginner", equipment: "Dumbbells", muscles: "Front Deltoids", reps: "3×12-15", calories: 24, icon: "💪" },
  { name: "Upright Row", category: "Shoulders", level: "Intermediate", equipment: "Barbell", muscles: "Deltoids, Traps", reps: "3×10-12", calories: 38, icon: "🏋️" },
  { name: "Shrug", category: "Shoulders", level: "Beginner", equipment: "Dumbbells", muscles: "Trapezius", reps: "3×15-20", calories: 30, icon: "💪" },
  { name: "Barbell Bicep Curl", category: "Arms", level: "Beginner", equipment: "Barbell", muscles: "Biceps", reps: "3×10-12", calories: 28, icon: "💪" },
  { name: "Hammer Curl", category: "Arms", level: "Beginner", equipment: "Dumbbells", muscles: "Biceps, Brachialis", reps: "3×12-15", calories: 26, icon: "💪" },
  { name: "Tricep Pushdown", category: "Arms", level: "Beginner", equipment: "Cable", muscles: "Triceps", reps: "3×12-15", calories: 25, icon: "🔗" },
  { name: "Skull Crusher", category: "Arms", level: "Intermediate", equipment: "Barbell", muscles: "Triceps", reps: "3×10-12", calories: 32, icon: "🏋️" },
  { name: "Preacher Curl", category: "Arms", level: "Intermediate", equipment: "Machine", muscles: "Biceps", reps: "3×10-12", calories: 28, icon: "🔧" },
  { name: "Overhead Tricep Extension", category: "Arms", level: "Beginner", equipment: "Dumbbells", muscles: "Triceps", reps: "3×12-15", calories: 27, icon: "💪" },
  { name: "Concentration Curl", category: "Arms", level: "Beginner", equipment: "Dumbbells", muscles: "Biceps", reps: "3×12 each", calories: 24, icon: "💪" },
  { name: "Diamond Push-Up", category: "Arms", level: "Intermediate", equipment: "Bodyweight", muscles: "Triceps", reps: "3×12-15", calories: 30, icon: "💪" },
  { name: "Barbell Squat", category: "Legs", level: "Intermediate", equipment: "Barbell", muscles: "Quads, Glutes, Hamstrings", reps: "4×6-10", calories: 90, icon: "🏋️" },
  { name: "Romanian Deadlift", category: "Legs", level: "Intermediate", equipment: "Barbell", muscles: "Hamstrings, Glutes", reps: "3×10-12", calories: 65, icon: "🏋️" },
  { name: "Leg Press", category: "Legs", level: "Beginner", equipment: "Machine", muscles: "Quads, Glutes", reps: "3×12-15", calories: 60, icon: "🔧" },
  { name: "Lunges", category: "Legs", level: "Beginner", equipment: "Bodyweight", muscles: "Quads, Glutes", reps: "3×12 each", calories: 55, icon: "💪" },
  { name: "Leg Curl", category: "Legs", level: "Beginner", equipment: "Machine", muscles: "Hamstrings", reps: "3×12-15", calories: 35, icon: "🔧" },
  { name: "Calf Raise", category: "Legs", level: "Beginner", equipment: "Machine", muscles: "Calves", reps: "4×15-20", calories: 25, icon: "🔧" },
  { name: "Bulgarian Split Squat", category: "Legs", level: "Advanced", equipment: "Dumbbells", muscles: "Quads, Glutes", reps: "3×10 each", calories: 70, icon: "💪" },
  { name: "Sumo Deadlift", category: "Legs", level: "Advanced", equipment: "Barbell", muscles: "Inner Thighs, Glutes", reps: "3×8-10", calories: 75, icon: "🏋️" },
  { name: "Plank", category: "Core", level: "Beginner", equipment: "Bodyweight", muscles: "Core, Stabilizers", reps: "3×30-60s", calories: 20, icon: "💪" },
  { name: "Crunch", category: "Core", level: "Beginner", equipment: "Bodyweight", muscles: "Rectus Abdominis", reps: "3×20-30", calories: 18, icon: "💪" },
  { name: "Russian Twist", category: "Core", level: "Intermediate", equipment: "Bodyweight", muscles: "Obliques", reps: "3×20 each", calories: 22, icon: "💪" },
  { name: "Leg Raise", category: "Core", level: "Intermediate", equipment: "Bodyweight", muscles: "Lower Abs", reps: "3×15-20", calories: 20, icon: "💪" },
  { name: "Ab Wheel Rollout", category: "Core", level: "Advanced", equipment: "Ab Wheel", muscles: "Full Core", reps: "3×10-15", calories: 30, icon: "🔧" },
  { name: "Cable Crunch", category: "Core", level: "Intermediate", equipment: "Cable", muscles: "Rectus Abdominis", reps: "3×15-20", calories: 25, icon: "🔗" },
  { name: "Bicycle Crunch", category: "Core", level: "Beginner", equipment: "Bodyweight", muscles: "Obliques, Abs", reps: "3×20 each", calories: 22, icon: "💪" },
  { name: "Dragon Flag", category: "Core", level: "Advanced", equipment: "Bodyweight", muscles: "Full Core", reps: "3×8-10", calories: 35, icon: "💪" },
  { name: "Treadmill Run", category: "Cardio", level: "All Levels", equipment: "Machine", muscles: "Full Body", reps: "20-45 min", calories: 300, icon: "🏃" },
  { name: "Jump Rope", category: "Cardio", level: "Beginner", equipment: "Jump Rope", muscles: "Full Body", reps: "3×3 min", calories: 200, icon: "🪢" },
  { name: "Burpee", category: "Cardio", level: "Intermediate", equipment: "Bodyweight", muscles: "Full Body", reps: "3×15-20", calories: 80, icon: "💪" },
  { name: "Box Jump", category: "Cardio", level: "Intermediate", equipment: "Plyo Box", muscles: "Legs, Core", reps: "3×10-15", calories: 65, icon: "📦" },
  { name: "Battle Ropes", category: "Cardio", level: "Intermediate", equipment: "Battle Ropes", muscles: "Shoulders, Core", reps: "3×30s", calories: 90, icon: "🔗" },
  { name: "Rowing Machine", category: "Cardio", level: "All Levels", equipment: "Machine", muscles: "Full Body", reps: "20-30 min", calories: 250, icon: "🚣" },
  { name: "Cycling", category: "Cardio", level: "All Levels", equipment: "Machine", muscles: "Legs, Core", reps: "30-60 min", calories: 280, icon: "🚴" },
  { name: "Mountain Climbers", category: "Cardio", level: "Beginner", equipment: "Bodyweight", muscles: "Core, Shoulders", reps: "3×30s", calories: 55, icon: "⛰️" },
  { name: "High Knees", category: "Cardio", level: "Beginner", equipment: "Bodyweight", muscles: "Legs, Core", reps: "3×30s", calories: 45, icon: "🦵" },
  { name: "Jumping Jacks", category: "Cardio", level: "Beginner", equipment: "Bodyweight", muscles: "Full Body", reps: "3×30s", calories: 35, icon: "⭐" },
  { name: "Downward Dog", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Hamstrings, Shoulders", reps: "Hold 30-60s", calories: 10, icon: "🧘" },
  { name: "Warrior I", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Legs, Core", reps: "Hold 30s each", calories: 12, icon: "🧘" },
  { name: "Tree Pose", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Balance, Core", reps: "Hold 30s each", calories: 8, icon: "🌳" },
  { name: "Cobra Pose", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Back, Core", reps: "Hold 20-30s", calories: 8, icon: "🐍" },
  { name: "Bridge Pose", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Glutes, Back", reps: "3×30s", calories: 12, icon: "🌉" },
  { name: "Chair Pose", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Quads, Core", reps: "Hold 30s", calories: 15, icon: "🪑" },
  { name: "Sun Salutation", category: "Yoga", level: "Beginner", equipment: "Mat", muscles: "Full Body", reps: "5-10 rounds", calories: 50, icon: "☀️" },
  { name: "Pigeon Pose", category: "Yoga", level: "Intermediate", equipment: "Mat", muscles: "Hip Flexors", reps: "Hold 60s each", calories: 10, icon: "🕊️" },
  { name: "Hip Flexor Stretch", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Hip Flexors", reps: "Hold 30s each", calories: 5, icon: "🧘" },
  { name: "Hamstring Stretch", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Hamstrings", reps: "Hold 30s each", calories: 5, icon: "🧘" },
  { name: "Quad Stretch", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Quads", reps: "Hold 30s each", calories: 5, icon: "🧘" },
  { name: "Shoulder Stretch", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Shoulders", reps: "Hold 30s each", calories: 4, icon: "💆" },
  { name: "Cat-Cow Stretch", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Spine, Core", reps: "10 reps", calories: 6, icon: "🐱" },
  { name: "Child's Pose", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Back, Shoulders", reps: "Hold 60s", calories: 5, icon: "🧒" },
  { name: "Chest Opener", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Chest, Shoulders", reps: "Hold 30s", calories: 4, icon: "💪" },
  { name: "Spinal Twist", category: "Stretching", level: "Beginner", equipment: "Mat", muscles: "Spine, Obliques", reps: "Hold 30s each", calories: 5, icon: "🌀" },
]

const familyProfiles = {
  male: {
    icon: "👨", label: "Men", color: "#3B82F6",
    workouts: [
      { name: "Strength Builder", exercises: 8, duration: "60 min", focus: "Muscle Mass" },
      { name: "Fat Burner", exercises: 10, duration: "45 min", focus: "Weight Loss" },
      { name: "Athletic Power", exercises: 7, duration: "75 min", focus: "Performance" },
    ],
    tips: ["Focus on compound lifts", "Progressive overload is key", "Rest 48-72h between same muscles", "Protein: 1.6-2.2g per kg bodyweight"],
    recommended: ["Barbell Squat", "Deadlift", "Bench Press", "Pull-Up", "Overhead Press"],
  },
  female: {
    icon: "👩", label: "Women", color: "#EC4899",
    workouts: [
      { name: "Tone & Sculpt", exercises: 8, duration: "50 min", focus: "Toning" },
      { name: "Glute Builder", exercises: 7, duration: "45 min", focus: "Lower Body" },
      { name: "Full Body Burn", exercises: 10, duration: "40 min", focus: "Fat Loss" },
    ],
    tips: ["Focus on glutes and core", "Don't fear weights — they tone!", "Cardio 3-4x per week", "Iron-rich foods are essential"],
    recommended: ["Hip Thrust", "Romanian Deadlift", "Lunges", "Plank", "Dumbbell Lateral Raise"],
  },
  child: {
    icon: "👦", label: "Children", color: "#10B981",
    workouts: [
      { name: "Fun Fitness", exercises: 6, duration: "30 min", focus: "Coordination" },
      { name: "Active Play", exercises: 8, duration: "35 min", focus: "Endurance" },
      { name: "Flexibility Fun", exercises: 5, duration: "25 min", focus: "Flexibility" },
    ],
    tips: ["Never lift heavy — focus on form", "30-60 min activity daily", "Make it fun and playful", "Focus on coordination and flexibility"],
    recommended: ["Jump Rope", "Jumping Jacks", "Bodyweight Squat", "Downward Dog", "Sun Salutation"],
  },
}

const exerciseCategories = ["All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Cardio", "Yoga", "Stretching"]
const planColors = { Pro: "#C8FF00", Elite: "#818CF8", Starter: "#64748B", Family: "#34D399" }

export default function Members() {
  const navigate = useNavigate()
  const Location = useLocation()

 
  // ── ALL STATE AT TOP ──
  const [activeTab, setActiveTab] = useState("members")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedProfile, setSelectedProfile] = useState("male")
  const [exerciseSearch, setExerciseSearch] = useState("")

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.plan.toLowerCase().includes(searchQuery.toLowerCase())
  )
    
  const filteredExercises = exercises.filter(e => {
    const matchCat = selectedCategory === "All" || e.category === selectedCategory
    const matchSearch = e.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
      e.muscles.toLowerCase().includes(exerciseSearch.toLowerCase())
    return matchCat && matchSearch
  })

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
              GYM MANAGEMENT
            </div>
            <h1 style={{ fontSize: "28px", fontWeight: 900, margin: 0 }}>MEMBERS</h1>
          </div>
          <button
            onClick={() => navigate("/ai-trainer")}
            style={{
              padding: "10px 20px", background: "#C8FF00",
              color: "#080C14", border: "none", borderRadius: "10px",
              fontSize: "13px", fontWeight: 800, cursor: "pointer",
            }}>
            🤖 Start AI Session
          </button>
        </div>

        {/* ── TABS — fixed with pointerEvents ── */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
          {[
            { id: "members", label: "👥 Members", count: members.length },
            { id: "family", label: "👨‍👩‍👧 Family Profiles", count: 3 },
            { id: "exercises", label: "🏋️ Exercise Library", count: exercises.length },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "10px 20px", borderRadius: "10px",
                cursor: "pointer", fontWeight: 700, fontSize: "13px",
                background: activeTab === t.id ? "#C8FF00" : "rgba(255,255,255,0.03)",
                color: activeTab === t.id ? "#080C14" : "#64748B",
                border: activeTab === t.id ? "none" : "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.2s",
                display: "flex", alignItems: "center", gap: "8px",
              }}>
              <span style={{ pointerEvents: "none" }}>{t.label}</span>
              <span style={{
                pointerEvents: "none",
                background: activeTab === t.id ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.08)",
                borderRadius: "10px", padding: "1px 8px", fontSize: "11px",
              }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* ── MEMBERS TAB ── */}
        {activeTab === "members" && (
          <div>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px", marginBottom: "24px",
            }}>
              {[
                { label: "Total Members", value: members.length, icon: "👥", color: "#C8FF00" },
                { label: "Pro & Elite", value: members.filter(m => m.plan !== "Starter").length, icon: "⭐", color: "#818CF8" },
                { label: "Avg Form Score", value: Math.round(members.reduce((a, b) => a + b.formScore, 0) / members.length), icon: "📊", color: "#22C55E" },
                { label: "Active Streaks", value: members.filter(m => m.streak > 7).length, icon: "🔥", color: "#F59E0B" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px", padding: "18px",
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "1px", marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "10px", padding: "10px 16px",
              display: "flex", alignItems: "center", gap: "10px",
              marginBottom: "20px",
            }}>
              <span style={{ color: "#64748B" }}>🔍</span>
              <input
                placeholder="Search members by name or plan..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{
                  background: "none", border: "none", color: "white",
                  outline: "none", fontSize: "14px", width: "100%",
                  fontFamily: "system-ui",
                }}
              />
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "16px",
            }}>
              {filteredMembers.map(m => (
                <div key={m.id}
                  onClick={() => setSelectedMember(selectedMember?.id === m.id ? null : m)}
                  style={{
                    background: selectedMember?.id === m.id ? "rgba(200,255,0,0.04)" : "rgba(255,255,255,0.02)",
                    border: selectedMember?.id === m.id ? "1px solid rgba(200,255,0,0.2)" : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px", padding: "20px", cursor: "pointer", transition: "all 0.2s",
                  }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "50%",
                      background: `${m.color}20`, border: `2px solid ${m.color}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "18px", fontWeight: 800, color: m.color, flexShrink: 0,
                    }}>{m.avatar}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "15px", fontWeight: 700 }}>{m.name}</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>
                        {m.gender === "child" ? "👦" : m.gender === "female" ? "👩" : "👨"} Age {m.age} · {m.goal}
                      </div>
                    </div>
                    <div style={{
                      padding: "4px 10px", background: `${planColors[m.plan]}20`,
                      border: `1px solid ${planColors[m.plan]}40`, borderRadius: "8px",
                      fontSize: "11px", fontWeight: 700, color: planColors[m.plan],
                    }}>{m.plan}</div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                    {[
                      { label: "Sessions", value: m.totalSessions, color: "#C8FF00" },
                      { label: "Streak", value: `${m.streak}d`, color: "#F59E0B" },
                      { label: "Form", value: m.formScore, color: m.formScore > 85 ? "#22C55E" : m.formScore > 70 ? "#F59E0B" : "#EF4444" },
                    ].map(s => (
                      <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                        <div style={{ fontSize: "16px", fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: "9px", color: "#64748B" }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                    <div style={{
                      height: "100%", width: `${m.formScore}%`,
                      background: m.formScore > 85 ? "#22C55E" : m.formScore > 70 ? "#F59E0B" : "#EF4444",
                      borderRadius: "2px", transition: "width 0.5s",
                    }} />
                  </div>

                  {selectedMember?.id === m.id && (
                    <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "10px" }}>
                        {[
                          { label: "Weight", value: m.weight },
                          { label: "Height", value: m.height },
                          { label: "Joined", value: m.joinDate },
                          { label: "Plan", value: m.plan },
                        ].map(d => (
                          <div key={d.label} style={{ background: "rgba(255,255,255,0.02)", borderRadius: "8px", padding: "8px 12px" }}>
                            <div style={{ fontSize: "10px", color: "#64748B" }}>{d.label}</div>
                            <div style={{ fontSize: "13px", fontWeight: 600 }}>{d.value}</div>
                          </div>
                        ))}
                      </div>
                      {m.family.length > 0 && (
                        <div style={{ background: "rgba(200,255,0,0.04)", border: "1px solid rgba(200,255,0,0.1)", borderRadius: "8px", padding: "10px 12px", marginBottom: "10px" }}>
                          <div style={{ fontSize: "10px", color: "#C8FF00", marginBottom: "6px" }}>FAMILY MEMBERS</div>
                          {m.family.map(f => (
                            <div key={f} style={{ fontSize: "12px", color: "#94A3B8", marginBottom: "2px" }}>👤 {f}</div>
                          ))}
                        </div>
                      )}
                      <button
                        onClick={e => { e.stopPropagation(); navigate("/ai-trainer") }}
                        style={{
                          width: "100%", padding: "10px", background: "#C8FF00",
                          color: "#080C14", border: "none", borderRadius: "8px",
                          fontWeight: 700, cursor: "pointer", fontSize: "13px",
                        }}>
                        🤖 Start AI Session for {m.name.split(" ")[0]}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FAMILY PROFILES TAB ── */}
        {activeTab === "family" && (
          <div>
            <div style={{ display: "flex", gap: "12px", marginBottom: "28px" }}>
              {Object.entries(familyProfiles).map(([key, profile]) => (
                <button key={key} onClick={() => setSelectedProfile(key)}
                  style={{
                    flex: 1, padding: "20px",
                    background: selectedProfile === key ? `${profile.color}12` : "rgba(255,255,255,0.02)",
                    border: selectedProfile === key ? `2px solid ${profile.color}50` : "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "16px", cursor: "pointer", transition: "all 0.2s",
                  }}>
                  <div style={{ fontSize: "36px", marginBottom: "8px", pointerEvents: "none" }}>{profile.icon}</div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: selectedProfile === key ? profile.color : "#64748B", pointerEvents: "none" }}>
                    {profile.label}
                  </div>
                  <div style={{ fontSize: "12px", color: "#475569", marginTop: "4px", pointerEvents: "none" }}>
                    {profile.workouts.length} workout plans
                  </div>
                </button>
              ))}
            </div>

            {(() => {
              const profile = familyProfiles[selectedProfile]
              return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                    <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>WORKOUT PLANS</div>
                    {profile.workouts.map((w, i) => (
                      <div key={i} style={{
                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "12px", padding: "14px 16px", marginBottom: "10px",
                        display: "flex", alignItems: "center", gap: "14px",
                      }}>
                        <div style={{
                          width: "40px", height: "40px", borderRadius: "10px",
                          background: `${profile.color}15`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px",
                        }}>
                          {selectedProfile === "male" ? "💪" : selectedProfile === "female" ? "🌸" : "⭐"}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "14px", fontWeight: 700 }}>{w.name}</div>
                          <div style={{ fontSize: "11px", color: "#64748B" }}>{w.exercises} exercises · {w.duration}</div>
                        </div>
                        <div style={{
                          padding: "4px 10px", background: `${profile.color}15`,
                          borderRadius: "8px", fontSize: "11px", fontWeight: 700, color: profile.color,
                        }}>{w.focus}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px", marginBottom: "16px" }}>
                      <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>
                        PRO TIPS FOR {profile.label.toUpperCase()}
                      </div>
                      {profile.tips.map((tip, i) => (
                        <div key={i} style={{
                          display: "flex", gap: "10px", marginBottom: "10px",
                          padding: "10px 12px", background: `${profile.color}08`,
                          border: `1px solid ${profile.color}15`, borderRadius: "10px",
                        }}>
                          <span style={{ color: profile.color, flexShrink: 0 }}>→</span>
                          <span style={{ fontSize: "13px", color: "#94A3B8", lineHeight: 1.5 }}>{tip}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                      <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>RECOMMENDED EXERCISES</div>
                      {profile.recommended.map((ex, i) => (
                        <div key={i} style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          marginBottom: "8px", padding: "8px 12px",
                          background: "rgba(255,255,255,0.02)", borderRadius: "8px",
                        }}>
                          <div style={{
                            width: "24px", height: "24px", borderRadius: "50%",
                            background: `${profile.color}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "10px", fontWeight: 800, color: profile.color,
                          }}>{i + 1}</div>
                          <span style={{ fontSize: "13px", color: "#94A3B8" }}>{ex}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ gridColumn: "1 / -1", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "20px" }}>
                    <div style={{ fontSize: "10px", color: "#64748B", letterSpacing: "3px", marginBottom: "16px" }}>
                      {profile.label.toUpperCase()} MEMBERS ({members.filter(m => m.gender === selectedProfile).length})
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "10px" }}>
                      {members.filter(m => m.gender === selectedProfile).map(m => (
                        <div key={m.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px", background: "rgba(255,255,255,0.02)", borderRadius: "10px" }}>
                          <div style={{
                            width: "36px", height: "36px", borderRadius: "50%",
                            background: `${m.color}20`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: "14px", fontWeight: 800, color: m.color,
                          }}>{m.avatar}</div>
                          <div>
                            <div style={{ fontSize: "13px", fontWeight: 600 }}>{m.name}</div>
                            <div style={{ fontSize: "11px", color: "#64748B" }}>{m.plan} · Score: {m.formScore}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ── EXERCISE LIBRARY TAB ── */}
        {activeTab === "exercises" && (
          <div>
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              <div style={{
                flex: 1, background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "10px", padding: "10px 16px",
                display: "flex", alignItems: "center", gap: "10px",
              }}>
                <span style={{ color: "#64748B" }}>🔍</span>
                <input
                  placeholder="Search exercises or muscles..."
                  value={exerciseSearch}
                  onChange={e => setExerciseSearch(e.target.value)}
                  style={{
                    background: "none", border: "none", color: "white",
                    outline: "none", fontSize: "14px", width: "100%",
                    fontFamily: "system-ui",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
              {exerciseCategories.map(cat => (
                <button key={cat} onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "7px 16px", borderRadius: "20px",
                    cursor: "pointer", fontWeight: 700, fontSize: "12px",
                    background: selectedCategory === cat ? "#C8FF00" : "rgba(255,255,255,0.04)",
                    color: selectedCategory === cat ? "#080C14" : "#64748B",
                    border: selectedCategory === cat ? "none" : "1px solid rgba(255,255,255,0.07)",
                    transition: "all 0.2s",
                  }}>
                  {cat}{selectedCategory === cat ? ` (${filteredExercises.length})` : ""}
                </button>
              ))}
            </div>

            <div style={{
              display: "flex", gap: "16px", marginBottom: "20px",
              padding: "14px 20px",
              background: "rgba(200,255,0,0.04)",
              border: "1px solid rgba(200,255,0,0.1)",
              borderRadius: "12px",
            }}>
              <span style={{ fontSize: "13px", color: "#C8FF00", fontWeight: 700 }}>
                🏋️ {filteredExercises.length} exercises
              </span>
              <span style={{ fontSize: "13px", color: "#64748B" }}>
                {selectedCategory === "All" ? "all categories" : selectedCategory}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              {filteredExercises.map((ex, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "14px", padding: "16px", transition: "all 0.2s",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "rgba(200,255,0,0.03)"
                    e.currentTarget.style.border = "1px solid rgba(200,255,0,0.12)"
                    e.currentTarget.style.transform = "translateY(-2px)"
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.02)"
                    e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)"
                    e.currentTarget.style.transform = "translateY(0)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "20px" }}>{ex.icon}</span>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: 700 }}>{ex.name}</div>
                        <div style={{ fontSize: "11px", color: "#64748B" }}>{ex.equipment}</div>
                      </div>
                    </div>
                    <div style={{
                      padding: "3px 8px", borderRadius: "6px", fontSize: "10px", fontWeight: 700,
                      background: ex.level === "Beginner" ? "rgba(34,197,94,0.12)" : ex.level === "Intermediate" ? "rgba(245,158,11,0.12)" : "rgba(239,68,68,0.12)",
                      color: ex.level === "Beginner" ? "#22C55E" : ex.level === "Intermediate" ? "#F59E0B" : "#EF4444",
                      whiteSpace: "nowrap",
                    }}>{ex.level}</div>
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginBottom: "10px" }}>🎯 {ex.muscles}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <div>
                      <div style={{ fontSize: "10px", color: "#475569" }}>SETS/REPS</div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#C8FF00" }}>{ex.reps}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "10px", color: "#475569" }}>CALORIES</div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#F59E0B" }}>{ex.calories} kcal</div>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate("/ai-trainer")}
                    style={{
                      marginTop: "10px", width: "100%", padding: "8px",
                      background: "rgba(200,255,0,0.06)", border: "1px solid rgba(200,255,0,0.15)",
                      color: "#C8FF00", borderRadius: "8px", fontSize: "12px",
                      fontWeight: 700, cursor: "pointer",
                    }}>
                    Try with AI Trainer →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(200,255,0,0.15); border-radius: 2px; }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  )
}
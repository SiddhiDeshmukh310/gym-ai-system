import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import AITrainer from "./pages/AITrainer"
import Members from "./pages/Members"
import Schedule from "./pages/Schedule"
import Diet from "./pages/Diet"
import Profile from "./pages/Profile"
import Analytics from "./pages/Analytics"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-trainer" element={<AITrainer />} />
        <Route path="/members" element={<Members />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
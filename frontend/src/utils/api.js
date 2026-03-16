const BASE = "http://localhost:5000/api"

function getToken() {
  return localStorage.getItem("apex_token")
}

function headers(auth = true) {
  const h = { "Content-Type": "application/json" }
  if (auth) h["Authorization"] = `Bearer ${getToken()}`
  return h
}

// ── AUTH ──
export async function apiSignup(data) {
  const res = await fetch(`${BASE}/signup`, {
    method: "POST", headers: headers(false),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function apiLogin(data) {
  const res = await fetch(`${BASE}/login`, {
    method: "POST", headers: headers(false),
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (json.token) {
    localStorage.setItem("apex_token", json.token)
    localStorage.setItem("apex_user", JSON.stringify(json.user))
  }
  return json
}

export function apiLogout() {
  localStorage.removeItem("apex_token")
  localStorage.removeItem("apex_user")
}

export function getUser() {
  const u = localStorage.getItem("apex_user")
  return u ? JSON.parse(u) : null
}

export function isLoggedIn() {
  return !!getToken()
}

// ── PROFILE ──
export async function apiGetMe() {
  const res = await fetch(`${BASE}/me`, { headers: headers() })
  return res.json()
}

export async function apiUpdateMe(data) {
  const res = await fetch(`${BASE}/me`, {
    method: "PUT", headers: headers(),
    body: JSON.stringify(data),
  })
  return res.json()
}

// ── SESSIONS ──
export async function apiSaveSession(data) {
  const res = await fetch(`${BASE}/sessions`, {
    method: "POST", headers: headers(),
    body: JSON.stringify(data),
  })
  return res.json()
}

export async function apiGetSessions() {
  const res = await fetch(`${BASE}/sessions`, { headers: headers() })
  return res.json()
}

export async function apiGetStats() {
  const res = await fetch(`${BASE}/sessions/stats`, { headers: headers() })
  return res.json()
}
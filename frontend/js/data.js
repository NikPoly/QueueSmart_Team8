// data.js - mock data + localStorage helpers (no backend in A2)

const DEMO_ACCOUNTS = [
  { email: "user@demo.com", password: "user1234", name: "Demo User", role: "user" },
  { email: "admin@demo.com", password: "admin1234", name: "Demo Admin", role: "admin" }
];

const SEED_SERVICES = [
  {
    id: 1,
    name: "Academic Advising",
    description: "Meet with an advisor about degree plans and enrollment.",
    duration: 15,
    priority: "high",
    open: true,
    queue: ["Maria G.", "James L.", "Aisha K.", "Tom R."]
  },
  {
    id: 2,
    name: "Financial Aid Office",
    description: "Questions about FAFSA, scholarships, and payments.",
    duration: 20,
    priority: "medium",
    open: true,
    queue: ["Derek P.", "Lena S."]
  },
  {
    id: 3,
    name: "IT Help Desk",
    description: "Password resets, wifi issues, and laptop support.",
    duration: 10,
    priority: "low",
    open: true,
    queue: ["Chris B.", "Priya N.", "Omar F."]
  },
  {
    id: 4,
    name: "Campus Health Clinic",
    description: "Walk-in visits with a campus nurse.",
    duration: 25,
    priority: "high",
    open: false,
    queue: []
  }
];

const SEED_HISTORY = [
  { date: "2026-07-01", service: "IT Help Desk", outcome: "Served" },
  { date: "2026-06-24", service: "Academic Advising", outcome: "Served" },
  { date: "2026-06-18", service: "Financial Aid Office", outcome: "Left queue" }
];

// seed localStorage on first run
function initData() {
  if (!localStorage.getItem("qs_services")) {
    localStorage.setItem("qs_services", JSON.stringify(SEED_SERVICES));
  }
  if (!localStorage.getItem("qs_history")) {
    localStorage.setItem("qs_history", JSON.stringify(SEED_HISTORY));
  }
  if (!localStorage.getItem("qs_notifications")) {
    localStorage.setItem("qs_notifications", JSON.stringify([
      { time: "Today 9:12 AM", text: "Welcome to QueueSmart!", read: false }
    ]));
  }
}

// generic get/set
function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// session helpers
function getSession() {
  return JSON.parse(localStorage.getItem("qs_session"));
}

function setSession(user) {
  localStorage.setItem("qs_session", JSON.stringify(user));
}

function logout() {
  localStorage.removeItem("qs_session");
  window.location.href = "index.html";
}

// redirect to login if not signed in (used on protected pages)
function requireLogin(role) {
  const s = getSession();
  if (!s) {
    window.location.href = "index.html";
    return null;
  }
  if (role && s.role !== role) {
    window.location.href = s.role === "admin" ? "admin-dashboard.html" : "dashboard.html";
    return null;
  }
  return s;
}

// notifications
function addNotification(text) {
  const notifs = getData("qs_notifications") || [];
  const now = new Date();
  const time = "Today " + now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  notifs.unshift({ time: time, text: text, read: false });
  setData("qs_notifications", notifs);
}

initData();

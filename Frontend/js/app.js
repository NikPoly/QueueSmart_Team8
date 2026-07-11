// app.js - shared UI stuff used across pages

// builds the top navbar based on role. call after body loads.
function renderNavbar(activePage) {
  const s = getSession();
  if (!s) return;

  const userLinks = [
    ["dashboard.html", "Dashboard"],
    ["join-queue.html", "Join Queue"],
    ["queue-status.html", "My Queue"],
    ["history.html", "History"]
  ];
  const adminLinks = [
    ["admin-dashboard.html", "Dashboard"],
    ["admin-services.html", "Services"],
    ["admin-queues.html", "Queues"]
  ];

  const links = (s.role === "admin" ? adminLinks : userLinks)
    .map(function (l) {
      const cls = l[0] === activePage ? "active" : "";
      return '<a class="' + cls + '" href="' + l[0] + '">' + l[1] + "</a>";
    })
    .join("");

  const nav = document.createElement("nav");
  nav.className = "navbar";
  nav.innerHTML =
    '<div class="brand">Queue<span>Smart</span></div>' +
    '<div class="nav-links">' + links +
    '<div class="bell-wrap">' +
    '<button class="bell-btn" onclick="toggleNotifs()">&#128276;<span class="bell-count" id="bellCount"></span></button>' +
    '<div class="notif-panel" id="notifPanel"><h4>Notifications</h4><div id="notifList"></div></div>' +
    "</div>" +
    '<a href="#" onclick="logout()">Logout (' + s.name + ")</a>" +
    "</div>";
  document.body.prepend(nav);
  renderNotifs();
}

function toggleNotifs() {
  const panel = document.getElementById("notifPanel");
  panel.classList.toggle("open");
  // opening the panel marks everything read
  if (panel.classList.contains("open")) {
    const notifs = getData("qs_notifications") || [];
    notifs.forEach(function (n) { n.read = true; });
    setData("qs_notifications", notifs);
    document.getElementById("bellCount").style.display = "none";
  }
}

function renderNotifs() {
  const notifs = getData("qs_notifications") || [];
  const list = document.getElementById("notifList");
  const count = document.getElementById("bellCount");

  const unread = notifs.filter(function (n) { return !n.read; }).length;
  if (unread > 0) {
    count.textContent = unread;
    count.style.display = "inline";
  } else {
    count.style.display = "none";
  }

  if (notifs.length === 0) {
    list.innerHTML = '<div class="notif-empty">No notifications yet.</div>';
    return;
  }
  list.innerHTML = notifs
    .slice(0, 8)
    .map(function (n) {
      return '<div class="notif-item ' + (n.read ? "" : "unread") + '">' +
        n.text + '<span class="time">' + n.time + "</span></div>";
    })
    .join("");
}

// ---- validation helpers ----

// marks a form-group invalid and shows its error message
function setInvalid(inputEl, msg) {
  const group = inputEl.closest(".form-group");
  group.classList.add("invalid");
  group.querySelector(".error").textContent = msg;
}

function clearInvalid(inputEl) {
  inputEl.closest(".form-group").classList.remove("invalid");
}

function isValidEmail(value) {
  // simple check: something @ something . something
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

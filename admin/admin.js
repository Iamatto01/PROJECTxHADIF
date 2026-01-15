const $ = (s, r = document) => r.querySelector(s);

const els = {
  emailInput: $("#emailInput"),
  loginBtn: $("#loginBtn"),
  authMsg: $("#authMsg"),

  logoutBtn: $("#logoutBtn"),

  meBox: $("#meBox"),
  meEmail: $("#meEmail"),

  reloadBtn: $("#reloadBtn"),
  saveBtn: $("#saveBtn"),
  catalogueJson: $("#catalogueJson"),

  reloadCfgBtn: $("#reloadCfgBtn"),
  saveCfgBtn: $("#saveCfgBtn"),
  configJson: $("#configJson"),
};

function apiBase() {
  // Admin page is served as static; backend is expected to run on 5174 in dev.
  // If you host on same origin, this still works.
  return window.location.origin.includes(":5174") ? window.location.origin : "http://localhost:5174";
}

async function api(path, options = {}) {
  const res = await fetch(`${apiBase()}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const isJson = res.headers.get("content-type")?.includes("application/json");
  const body = isJson ? await res.json() : await res.text();
  if (!res.ok) {
    const msg = typeof body === "string" ? body : body?.error || "Request failed";
    throw new Error(msg);
  }
  return body;
}

function setEnabled(enabled) {
  els.reloadBtn.disabled = !enabled;
  els.saveBtn.disabled = !enabled;
  els.catalogueJson.disabled = !enabled;

  els.reloadCfgBtn.disabled = !enabled;
  els.saveCfgBtn.disabled = !enabled;
  els.configJson.disabled = !enabled;

  els.logoutBtn.hidden = !enabled;
  els.meBox.hidden = !enabled;
}

async function loadAll() {
  const cat = await api("/api/catalogue/");
  els.catalogueJson.value = JSON.stringify(cat, null, 2);

  const cfg = await api("/api/config/");
  els.configJson.value = JSON.stringify(cfg, null, 2);
}

async function checkMe() {
  try {
    const me = await api("/api/auth/me");
    els.meEmail.textContent = me.email;
    setEnabled(true);
    await loadAll();
  } catch {
    setEnabled(false);
  }
}

els.loginBtn.addEventListener("click", async () => {
  const email = els.emailInput.value.trim();
  els.authMsg.textContent = "Sending link…";
  try {
    await api("/api/auth/request-link", { method: "POST", body: JSON.stringify({ email }) });
    els.authMsg.textContent = "Login link sent. Check your email. (If SMTP not set, check backend console for the link.)";
  } catch (e) {
    els.authMsg.textContent = `Error: ${e.message}`;
  }
});

els.logoutBtn.addEventListener("click", async () => {
  try {
    await api("/api/auth/logout", { method: "POST" });
  } finally {
    window.location.reload();
  }
});

els.reloadBtn.addEventListener("click", async () => {
  await loadAll();
});

els.saveBtn.addEventListener("click", async () => {
  const parsed = JSON.parse(els.catalogueJson.value);
  await api("/api/catalogue/", { method: "PUT", body: JSON.stringify(parsed) });
  els.authMsg.textContent = "Saved catalogue.";
});

els.reloadCfgBtn.addEventListener("click", async () => {
  await loadAll();
});

els.saveCfgBtn.addEventListener("click", async () => {
  const parsed = JSON.parse(els.configJson.value);
  await api("/api/config/", { method: "PUT", body: JSON.stringify(parsed) });
  els.authMsg.textContent = "Saved config.";
});

checkMe();

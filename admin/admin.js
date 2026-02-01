const $ = (s, r = document) => r.querySelector(s);

// Admin Configuration
const ADMIN_CONFIG = {
  primaryAdminEmail: "muhammadsaifudinmj@gmail.com",
  githubRepo: "Iamatto01/PROJECTxHADIF",
  workflowFileName: "build_catalogue.yml"
};

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

  generateWebsiteBtn: $("#generateWebsiteBtn"),
  generateMsg: $("#generateMsg")
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

  els.generateWebsiteBtn.disabled = !enabled;

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

els.generateWebsiteBtn.addEventListener("click", async () => {
  els.generateMsg.textContent = "Triggering GitHub Action workflow...";
  els.generateWebsiteBtn.disabled = true;
  
  try {
    // Try to trigger via backend API first (if backend supports it)
    try {
      await api("/api/github/trigger-workflow", { method: "POST" });
      els.generateMsg.textContent = "✅ Website generation workflow triggered successfully! Check GitHub Actions for progress.";
      return;
    } catch (backendError) {
      // Backend doesn't support it, try direct GitHub API
      console.log("Backend doesn't support workflow trigger, trying direct GitHub API");
    }
    
    // Fall back to direct GitHub API call
    // Note: This requires CORS to be enabled on GitHub API or a browser extension
    // For production, this should be handled by the backend
    const githubToken = prompt("Enter your GitHub Personal Access Token (with 'repo' and 'actions' scopes):\n\nYou can create one at: https://github.com/settings/tokens");
    
    if (!githubToken) {
      els.generateMsg.textContent = "❌ GitHub token required to trigger workflow.";
      return;
    }
    
    const response = await fetch(
      `https://api.github.com/repos/${ADMIN_CONFIG.githubRepo}/actions/workflows/${ADMIN_CONFIG.workflowFileName}/dispatches`,
      {
        method: "POST",
        headers: {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": `token ${githubToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ref: "main"
        })
      }
    );
    
    if (response.ok || response.status === 204) {
      els.generateMsg.textContent = "✅ Website generation workflow triggered successfully! Check GitHub Actions for progress.";
    } else {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.status} ${errorText}`);
    }
  } catch (error) {
    els.generateMsg.textContent = `❌ Error: ${error.message}`;
    console.error("Failed to trigger workflow:", error);
  } finally {
    els.generateWebsiteBtn.disabled = false;
  }
});

checkMe();

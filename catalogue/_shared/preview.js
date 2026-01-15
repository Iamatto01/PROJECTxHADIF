import { CATEGORIES, ITEMS } from "../catalogue-data.js";
import { CONTACT } from "../config.js";

const $ = (sel, root = document) => root.querySelector(sel);

const els = {
  brandName: $("#brandName"),
  brandSub: $("#brandSub"),

  themeToggle: $("#themeToggle"),

  kicker: $("#kicker"),
  title: $("#title"),
  subtitle: $("#subtitle"),

  sku: $("#sku"),
  style: $("#style"),
  price: $("#price"),

  chips: $("#chips"),
  aboutText: $("#aboutText"),
  aboutCards: $("#aboutCards"),
  includes: $("#includes"),
  pages: $("#pages"),
  bestFor: $("#bestFor"),
  offerTitle: $("#offerTitle"),
  proofCards: $("#proofCards"),
  faqList: $("#faqList"),

  buyBtn: $("#buyBtn"),
  contactBuyBtn: $("#contactBuyBtn"),
  copySkuBtn: $("#copySkuBtn"),
};

function getThemePref() {
  const saved = localStorage.getItem("hwc-theme");
  if (saved === "light" || saved === "dark") return saved;
  return null;
}

function setTheme(theme) {
  if (!theme) {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("hwc-theme");
    return;
  }
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("hwc-theme", theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || getThemePref();
  setTheme(current === "light" ? "dark" : "light");
}

function formatPrice(n) {
  return `$${n}`;
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null) node.setAttribute(k, String(v));
  }
  for (const c of children) node.append(c);
  return node;
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = el("textarea", { style: "position:fixed;left:-999px;top:-999px" });
    ta.value = text;
    document.body.append(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

function byId(list, id) {
  return list.find((x) => x.id === id);
}

function setAccent(accent) {
  const a = accent?.a || "#7c3aed";
  const b = accent?.b || "#06b6d4";
  const c = accent?.c || "#22c55e";
  const r = document.documentElement;
  r.style.setProperty("--a", a);
  r.style.setProperty("--b", b);
  r.style.setProperty("--c", c);
}

function getSkuFromUrl() {
  const u = new URL(window.location.href);
  const sku = u.searchParams.get("sku");
  return (sku || "").trim();
}

function makePurchaseUrl(sku) {
  const msg = encodeURIComponent(CONTACT.defaultMessage(sku));

  if (CONTACT.whatsappNumberInternational) {
    return `https://wa.me/${CONTACT.whatsappNumberInternational}?text=${msg}`;
  }
  if (CONTACT.email) {
    return `mailto:${encodeURIComponent(CONTACT.email)}?subject=${encodeURIComponent(
      `Template purchase: ${sku}`
    )}&body=${msg}`;
  }
  return "#";
}

function offerTitleForCategory(categoryId) {
  switch (categoryId) {
    case "food":
      return "Menu & reservations";
    case "realestate":
      return "Listings & leads";
    case "fitness":
      return "Programs & memberships";
    case "beauty":
      return "Services & bookings";
    case "services":
      return "Services & quick quotes";
    case "education":
      return "Courses & enrollment";
    case "portfolio":
      return "Work & case studies";
    case "events":
      return "Event info & RSVP";
    case "shop":
      return "Products & bundles";
    case "tech":
      return "Features & pricing";
    default:
      return "What you get";
  }
}

function aboutCardsForCategory(categoryId) {
  const common = [
    { t: "Fast to customize", d: "Swap logo, colors, copy, images, and contact link in minutes." },
    { t: "Mobile-first", d: "Designed to look great on phones where most buyers visit." },
    { t: "Conversion focused", d: "Clear CTA sections designed to turn visitors into messages." },
  ];

  const map = {
    food: [
      { t: "Signature dishes", d: "Highlight best sellers with a menu layout that’s easy to scan." },
      { t: "Reservations CTA", d: "A strong call-to-action block to reserve a table or order." },
      { t: "Location & hours", d: "Clean section for map, opening hours, and socials." },
    ],
    realestate: [
      { t: "Listings grid", d: "A clean grid for featured properties and listing cards." },
      { t: "Lead capture", d: "Inquiry CTA blocks that feel trustworthy and professional." },
      { t: "Trust signals", d: "Reviews + experience blocks that reduce hesitation." },
    ],
    fitness: [
      { t: "Program tiers", d: "Show programs and membership packages clearly." },
      { t: "Results section", d: "Spotlight transformations and testimonials." },
      { t: "Schedule", d: "Make your weekly plan easy to understand." },
    ],
    beauty: [
      { t: "Services menu", d: "Services + add-ons presented cleanly." },
      { t: "Gallery", d: "Show work with a grid that looks premium." },
      { t: "Booking CTA", d: "Guide visitors to book quickly via WhatsApp/DM." },
    ],
    services: [
      { t: "Service list", d: "Clear list of what you do and what areas you serve." },
      { t: "Quote CTA", d: "A quote section that turns visitors into leads." },
      { t: "Proof blocks", d: "Before/after + reviews to increase trust." },
    ],
    education: [
      { t: "Curriculum", d: "Present modules and outcomes clearly." },
      { t: "Enrollment CTA", d: "Built to convert visitors into enrollments." },
      { t: "Credibility", d: "Show teacher profile, results, and testimonials." },
    ],
    portfolio: [
      { t: "Project grid", d: "Show your best work with clean cards." },
      { t: "Case study layout", d: "Explain your process and outcomes." },
      { t: "Inquiry CTA", d: "Make it easy for clients to contact you." },
    ],
    events: [
      { t: "Schedule", d: "Agenda blocks that are easy to scan." },
      { t: "Venue info", d: "Location, map links, and what to expect." },
      { t: "RSVP CTA", d: "A clear RSVP/ticket button (static placeholder)." },
    ],
    shop: [
      { t: "Product cards", d: "A mini catalogue that looks great on mobile." },
      { t: "Bundles", d: "Bundle offers section to increase order size." },
      { t: "Buy via DM", d: "CTA flow designed for WhatsApp/Instagram ordering." },
    ],
    tech: [
      { t: "Features", d: "Feature highlights that feel modern and premium." },
      { t: "Pricing", d: "Pricing tiers to match how people buy software." },
      { t: "Waitlist CTA", d: "Strong call-to-action for demos or early access." },
    ],
  };

  return map[categoryId] || common;
}

function proofCards(item, categoryName) {
  const base = [
    { t: "Testimonial block", d: `“This ${categoryName.toLowerCase()} website made customers message us faster.”` },
    { t: "Trust badges", d: "Add awards, certifications, press, or client logos." },
    { t: "Clear CTA", d: "Phone / WhatsApp / Email buttons placed where users decide." },
  ];

  // personalize per style
  if (item.style.includes("Luxury")) base[1].d = "Premium spacing + elegant typography to justify higher prices.";
  if (item.style.includes("Neon")) base[0].d = "High-energy layout for brands that want attention fast.";
  if (item.style.includes("Minimal")) base[2].d = "Minimal layout removes distractions and increases clarity.";

  return base;
}

function faqItems(categoryId) {
  const common = [
    { q: "What do I receive after purchase?", a: "A ZIP file with the website files (HTML/CSS/JS) and a quick edit guide." },
    { q: "Can you customize it for me?", a: "Yes. You can offer optional add-ons: new logo, new colors, new copy, more pages." },
    { q: "Does it work on mobile?", a: "Yes—this design is mobile-first and responsive." },
    { q: "Is there a backend?", a: "No backend yet. It’s a fast static site (great for small businesses)." },
  ];

  if (categoryId === "shop") {
    common[3] = { q: "How do customers buy products?", a: "You can sell via WhatsApp/DM first. Later we can add checkout + auto delivery." };
  }
  if (categoryId === "events") {
    common[3] = { q: "Does RSVP work?", a: "This preview is static; you can connect RSVP to Google Forms or a backend later." };
  }
  if (categoryId === "realestate") {
    common[3] = { q: "Where do leads go?", a: "Leads can go to WhatsApp/email now; later add forms + CRM integration." };
  }

  return common;
}

function render(item) {
  const cat = byId(CATEGORIES, item.categoryId);

  document.title = `${item.name} — Preview (${item.sku})`;

  els.brandName.textContent = item.name;
  els.brandSub.textContent = `${cat?.name ?? item.categoryId} • ${item.sku}`;

  els.kicker.textContent = cat?.name ?? "Template";
  els.title.textContent = item.name;
  els.subtitle.textContent = item.short;

  els.sku.textContent = item.sku;
  els.style.textContent = item.style.join(" / ");
  els.price.textContent = formatPrice(item.price);

  document.body.setAttribute("data-style", item.style.join(" "));
  setAccent(item.accent);

  els.offerTitle.textContent = offerTitleForCategory(item.categoryId);

  els.chips.innerHTML = "";
  const tags = [...item.style, ...(item.tags || [])].slice(0, 10);
  for (const t of tags) {
    els.chips.append(el("span", { class: "chip", text: t }));
  }

  els.aboutText.textContent = item.pitch;
  els.aboutCards.innerHTML = "";
  for (const c of aboutCardsForCategory(item.categoryId)) {
    els.aboutCards.append(
      el("div", { class: "card" }, [
        el("div", { class: "card__title", text: c.t }),
        el("div", { class: "card__text", text: c.d }),
      ])
    );
  }

  els.includes.innerHTML = "";
  for (const line of item.includes || []) {
    els.includes.append(el("li", { text: line }));
  }

  els.pages.innerHTML = "";
  for (const line of item.pages || []) {
    els.pages.append(el("li", { text: line }));
  }

  els.bestFor.innerHTML = "";
  for (const line of item.bestFor || []) {
    els.bestFor.append(el("li", { text: line }));
  }

  els.proofCards.innerHTML = "";
  for (const p of proofCards(item, cat?.name || "business")) {
    els.proofCards.append(
      el("div", { class: "card" }, [
        el("div", { class: "card__title", text: p.t }),
        el("div", { class: "card__text", text: p.d }),
      ])
    );
  }

  els.faqList.innerHTML = "";
  for (const f of faqItems(item.categoryId)) {
    els.faqList.append(
      el("div", { class: "faq__q" }, [
        el("div", { class: "faq__qt", text: f.q }),
        el("div", { class: "faq__qa", text: f.a }),
      ])
    );
  }

  const openBuy = () => {
    const url = makePurchaseUrl(item.sku);
    if (url === "#") {
      alert("Set your WhatsApp/email in config.js first.");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  els.buyBtn.addEventListener("click", openBuy);
  els.contactBuyBtn.addEventListener("click", openBuy);
  els.copySkuBtn.addEventListener("click", async () => {
    await copyText(item.sku);
    els.copySkuBtn.textContent = "Copied";
    setTimeout(() => (els.copySkuBtn.textContent = "Copy code"), 1200);
  });
}

function renderMissing() {
  document.title = "Template Preview — Not found";
  $("#title").textContent = "Template not found";
  $("#subtitle").textContent = "Open a template from the catalogue to preview it.";
  $("#kicker").textContent = "Preview";
  $("#sku").textContent = "—";
  $("#style").textContent = "—";
  $("#price").textContent = "—";

  $("#aboutText").textContent =
    "Use the catalogue to open any template, then click Open preview. The SKU will be passed automatically.";

  // disable actions
  els.buyBtn.disabled = true;
  els.copySkuBtn.disabled = true;
  els.contactBuyBtn.disabled = true;
}

export function initPreview(options = {}) {
  setTheme(getThemePref());
  els.themeToggle.addEventListener("click", () => toggleTheme());

  const sku = (options.sku || window.PREVIEW_SKU || getSkuFromUrl() || "").toString().trim();
  const item = ITEMS.find((x) => x.sku === sku);
  if (!item) renderMissing();
  else render(item);
}

initPreview();

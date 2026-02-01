#!/usr/bin/env node

/**
 * Batch Website Generator
 * Creates a specific number of websites at once
 * Usage: node batch-generator.mjs [count]
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Import the generator logic
const CONFIG = {
  outputDir: path.join(__dirname, "..", "catalogue"),
  dataFile: path.join(__dirname, "..", "catalogue", "catalogue-data.js"),
};

const BUSINESS_TYPES = {
  food: [
    { name: "Restaurant", keywords: ["menu", "dining", "cuisine"] },
    { name: "Cafe", keywords: ["coffee", "pastry", "breakfast"] },
    { name: "Bakery", keywords: ["bread", "cakes", "pastries"] },
    { name: "Bar", keywords: ["drinks", "cocktails", "nightlife"] },
    { name: "Food Truck", keywords: ["street food", "mobile", "casual"] },
  ],
  realestate: [
    { name: "Real Estate Agency", keywords: ["property", "homes", "listings"] },
    { name: "Property Management", keywords: ["rentals", "leasing", "management"] },
    { name: "Luxury Homes", keywords: ["luxury", "estate", "premium"] },
  ],
  fitness: [
    { name: "Gym", keywords: ["workout", "training", "fitness"] },
    { name: "Yoga Studio", keywords: ["yoga", "meditation", "wellness"] },
    { name: "CrossFit", keywords: ["crossfit", "strength", "conditioning"] },
    { name: "Pilates", keywords: ["pilates", "core", "flexibility"] },
  ],
  beauty: [
    { name: "Hair Salon", keywords: ["hair", "styling", "cuts"] },
    { name: "Spa", keywords: ["massage", "relaxation", "treatments"] },
    { name: "Nail Salon", keywords: ["nails", "manicure", "pedicure"] },
    { name: "Beauty Salon", keywords: ["beauty", "makeup", "skincare"] },
  ],
  services: [
    { name: "Plumbing", keywords: ["plumber", "pipes", "repairs"] },
    { name: "Cleaning", keywords: ["cleaning", "housekeeping", "janitorial"] },
    { name: "Electrician", keywords: ["electrical", "wiring", "installation"] },
    { name: "HVAC", keywords: ["heating", "cooling", "air conditioning"] },
  ],
  education: [
    { name: "Tutoring", keywords: ["tutoring", "lessons", "education"] },
    { name: "Music School", keywords: ["music", "lessons", "instruments"] },
    { name: "Language School", keywords: ["language", "learning", "courses"] },
    { name: "Coding Bootcamp", keywords: ["coding", "programming", "tech"] },
  ],
  portfolio: [
    { name: "Photographer", keywords: ["photography", "photos", "portfolio"] },
    { name: "Designer", keywords: ["design", "branding", "creative"] },
    { name: "Artist", keywords: ["art", "paintings", "gallery"] },
    { name: "Writer", keywords: ["writing", "content", "editorial"] },
  ],
  events: [
    { name: "Wedding Planner", keywords: ["wedding", "events", "planning"] },
    { name: "Event Venue", keywords: ["venue", "events", "space"] },
    { name: "Catering", keywords: ["catering", "food", "events"] },
  ],
  shop: [
    { name: "Clothing Store", keywords: ["fashion", "clothing", "apparel"] },
    { name: "Gift Shop", keywords: ["gifts", "products", "boutique"] },
    { name: "Bookstore", keywords: ["books", "reading", "literature"] },
  ],
  tech: [
    { name: "SaaS Startup", keywords: ["software", "SaaS", "platform"] },
    { name: "App Development", keywords: ["app", "mobile", "development"] },
    { name: "Web Agency", keywords: ["web", "digital", "agency"] },
  ],
};

const STYLES = ["Modern", "Minimal", "Bold", "Elegant", "Playful", "Corporate", "Luxury", "Editorial", "Neon", "Warm"];

const ACCENT_PALETTES = [
  { a: "#f97316", b: "#f43f5e", c: "#facc15" },
  { a: "#22c55e", b: "#06b6d4", c: "#a855f7" },
  { a: "#0ea5e9", b: "#1f2937", c: "#f59e0b" },
  { a: "#a855f7", b: "#06b6d4", c: "#111827" },
  { a: "#06b6d4", b: "#a78bfa", c: "#f1f5f9" },
  { a: "#111827", b: "#a855f7", c: "#06b6d4" },
  { a: "#f43f5e", b: "#facc15", c: "#22c55e" },
  { a: "#0ea5e9", b: "#f97316", c: "#111827" },
];

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomItems(array, count) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function randomPrice() {
  const prices = [49, 59, 69, 79, 89, 99, 109, 119, 129, 149];
  return randomItem(prices);
}

function slugify(name) {
  return (name || "")
    .toString()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function generateBusinessName(businessType, categoryId) {
  const prefixes = ["The", "Elite", "Premium", "Royal", "Modern", "Urban", "Coastal", "Sunset", "Golden", "Silver"];
  const suffixes = {
    food: ["Kitchen", "Bistro", "House", "Table", "Bar", "Grill", "Cafe", "Eatery"],
    realestate: ["Realty", "Properties", "Estates", "Homes", "Group", "Partners"],
    fitness: ["Fitness", "Gym", "Studio", "Club", "Center", "Zone", "Lab"],
    beauty: ["Salon", "Spa", "Studio", "Lounge", "Bar", "Boutique"],
    services: ["Services", "Solutions", "Pros", "Experts", "Co", "Works"],
    education: ["Academy", "School", "Institute", "Learning", "Education"],
    portfolio: ["Studio", "Creative", "Design", "Agency", "Works", "Co"],
    events: ["Events", "Occasions", "Celebrations", "Planning", "Co"],
    shop: ["Shop", "Store", "Boutique", "Market", "Emporium"],
    tech: ["Labs", "Tech", "Digital", "Solutions", "Systems", "Platform"],
  };
  const prefix = randomItem(prefixes);
  const suffix = randomItem(suffixes[categoryId] || ["Co"]);
  return `${prefix} ${businessType.name} ${suffix}`;
}

function generateDescription(businessType) {
  const templates = [
    `Experience exceptional ${businessType.keywords[0]} with quality service and attention to detail.`,
    `Your trusted partner for ${businessType.keywords[0]} services that exceed expectations.`,
    `Discover premium ${businessType.keywords[0]} solutions tailored to your needs.`,
  ];
  return randomItem(templates);
}

function generatePitch(businessType, style) {
  return `Perfect for ${businessType.keywords[0]} businesses seeking a ${style.toLowerCase()} online presence. Includes all essential sections and strong CTAs.`;
}

function generatePages(categoryId) {
  const commonPages = ["Home", "About", "Contact"];
  const categoryPages = {
    food: ["Menu", "Reservations", "Gallery"],
    realestate: ["Listings", "Agents", "Services"],
    fitness: ["Programs", "Schedule", "Trainers"],
    beauty: ["Services", "Pricing", "Gallery"],
    services: ["Services", "Pricing", "Quote"],
    education: ["Courses", "Programs", "Enrollment"],
    portfolio: ["Portfolio", "Work", "Services"],
    events: ["Services", "Gallery", "Packages"],
    shop: ["Shop", "Products", "Categories"],
    tech: ["Features", "Pricing", "Demo"],
  };
  const specific = categoryPages[categoryId] || ["Services", "Products"];
  return [...commonPages, ...specific];
}

function generateIncludes() {
  return [
    "Responsive layout (mobile-first)",
    "Modern sections & spacing",
    "SEO-friendly structure",
    "Fast load (no backend)",
    "Easy color + font swap",
    "Contact form integration",
    "Social media links",
  ];
}

const generatedSkus = new Set();
let websiteCounter = 0;

function generateWebsite() {
  websiteCounter++;
  const categoryIds = Object.keys(BUSINESS_TYPES);
  const categoryId = randomItem(categoryIds);
  const businessType = randomItem(BUSINESS_TYPES[categoryId]);

  let sku;
  do {
    const prefix = categoryId.substring(0, 4).toUpperCase();
    const num = String(Math.floor(1000 + Math.random() * 9000));
    sku = `${prefix}-${num}`;
  } while (generatedSkus.has(sku));
  generatedSkus.add(sku);

  const name = generateBusinessName(businessType, categoryId);
  const styles = randomItems(STYLES, 2);
  const short = generateDescription(businessType);

  return {
    sku,
    categoryId,
    name,
    style: styles,
    price: randomPrice(),
    short,
    pitch: generatePitch(businessType, styles[0]),
    pages: generatePages(categoryId),
    bestFor: [businessType.name + "s", ...randomItems(businessType.keywords, 2)],
    includes: generateIncludes(),
    tags: [...new Set([...businessType.keywords, ...styles.map((s) => s.toLowerCase()), categoryId])].slice(0, 5),
    accent: randomItem(ACCENT_PALETTES),
    featuredRank: websiteCounter,
    addedAt: new Date().toISOString().split("T")[0],
  };
}

function escapeHtml(s) {
  return (s ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function generateHTML(website, slug) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(website.name)} — Preview</title>
  <link rel="stylesheet" href="../_shared/preview.css" />
</head>
<body>
  <header class="hdr" role="banner">
    <div class="hdr__inner">
      <a class="brand" href="../../index.html">Template Preview</a>
    </div>
  </header>
  <main id="main" class="main" role="main">
    <section class="hero">
      <h1 id="title">${escapeHtml(website.name)}</h1>
      <p id="subtitle">${escapeHtml(website.short)}</p>
    </section>
  </main>
  <script>window.PREVIEW_SKU = ${JSON.stringify(website.sku)};</script>
  <script type="module" src="../_shared/preview.js"></script>
</body>
</html>`;
}

async function saveWebsite(website) {
  const slug = slugify(website.name);
  const dir = path.join(CONFIG.outputDir, slug);
  await fs.mkdir(dir, { recursive: true });
  const htmlFile = path.join(dir, `${slug}.html`);
  await fs.writeFile(htmlFile, generateHTML(website, slug), "utf8");
  return { slug };
}

async function appendToCatalogueData(website) {
  try {
    let content = await fs.readFile(CONFIG.dataFile, "utf8");
    const lastItemIndex = content.lastIndexOf("];");
    if (lastItemIndex === -1) return;

    const newItem = `  {
    sku: "${website.sku}",
    categoryId: "${website.categoryId}",
    name: "${website.name}",
    style: ${JSON.stringify(website.style)},
    price: ${website.price},
    short: "${website.short.replace(/"/g, '\\"')}",
    pitch: "${website.pitch.replace(/"/g, '\\"')}",
    pages: ${JSON.stringify(website.pages)},
    bestFor: ${JSON.stringify(website.bestFor)},
    includes: ${JSON.stringify(website.includes)},
    tags: ${JSON.stringify(website.tags)},
    accent: ${JSON.stringify(website.accent)},
    featuredRank: ${website.featuredRank},
    addedAt: "${website.addedAt}",
  },\n`;

    content = content.slice(0, lastItemIndex) + newItem + content.slice(lastItemIndex);
    await fs.writeFile(CONFIG.dataFile, content, "utf8");
  } catch (error) {
    console.error("Error updating catalogue:", error.message);
  }
}

async function main() {
  const count = parseInt(process.argv[2]) || 10;
  
  console.log(`🚀 Batch Website Generator`);
  console.log(`📊 Generating ${count} websites...\n`);

  for (let i = 0; i < count; i++) {
    const website = generateWebsite();
    const { slug } = await saveWebsite(website);
    await appendToCatalogueData(website);
    console.log(`✅ ${i + 1}/${count}: ${website.name} (${website.sku})`);
  }

  console.log(`\n✅ Done! Generated ${count} websites`);
}

main().catch((error) => {
  console.error("Error:", error);
  process.exit(1);
});

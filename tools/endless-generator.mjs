#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import https from "node:https";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// --- Configuration ---
const CONFIG = {
  delay: 5000, // 5 seconds between generations
  outputDir: path.join(__dirname, "..", "catalogue"),
  logFile: path.join(__dirname, "..", "generation-log.txt"),
  dataFile: path.join(__dirname, "..", "catalogue", "catalogue-data.js"),
};

// --- Business Categories and Types ---
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

const STYLES = [
  "Modern",
  "Minimal",
  "Bold",
  "Elegant",
  "Playful",
  "Corporate",
  "Luxury",
  "Editorial",
  "Neon",
  "Warm",
];

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

// --- Random Generators ---
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

// --- Data Fetching from APIs ---
async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith("https") ? https : http;
    protocol
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", reject);
  });
}

// Generate realistic business names
function generateBusinessName(businessType, categoryId) {
  const prefixes = [
    "The",
    "Elite",
    "Premium",
    "Royal",
    "Modern",
    "Urban",
    "Coastal",
    "Sunset",
    "Golden",
    "Silver",
    "Blue",
    "Green",
    "Bright",
    "Fresh",
    "Pure",
    "Prime",
    "Zen",
    "Luxe",
    "Classic",
    "Artisan",
  ];
  
  const suffixes = {
    food: ["Kitchen", "Bistro", "House", "Table", "Bar", "Grill", "Cafe", "Eatery"],
    realestate: ["Realty", "Properties", "Estates", "Homes", "Group", "Partners"],
    fitness: ["Fitness", "Gym", "Studio", "Club", "Center", "Zone", "Lab"],
    beauty: ["Salon", "Spa", "Studio", "Lounge", "Bar", "Boutique"],
    services: ["Services", "Solutions", "Pros", "Experts", "Co", "Works"],
    education: ["Academy", "School", "Institute", "Learning", "Education", "Center"],
    portfolio: ["Studio", "Creative", "Design", "Agency", "Works", "Co"],
    events: ["Events", "Occasions", "Celebrations", "Planning", "Co"],
    shop: ["Shop", "Store", "Boutique", "Market", "Emporium", "Collective"],
    tech: ["Labs", "Tech", "Digital", "Solutions", "Systems", "Platform"],
  };

  const prefix = randomItem(prefixes);
  const suffix = randomItem(suffixes[categoryId] || ["Co"]);
  
  return `${prefix} ${businessType.name} ${suffix}`;
}

// Generate realistic descriptions
function generateDescription(businessType, categoryId) {
  const templates = {
    food: [
      "Experience authentic {cuisine} with fresh, locally-sourced ingredients and exceptional service.",
      "Discover the perfect blend of traditional {cuisine} and modern culinary innovation.",
      "Your destination for delicious {cuisine}, crafted with passion and served with care.",
    ],
    realestate: [
      "Find your dream property with our expert team and comprehensive listings.",
      "Trusted real estate professionals helping you navigate the property market with confidence.",
      "Your partner in finding the perfect home or investment property.",
    ],
    fitness: [
      "Transform your fitness journey with expert trainers and state-of-the-art facilities.",
      "Achieve your wellness goals in a supportive, motivating environment.",
      "Where dedication meets results - your fitness transformation starts here.",
    ],
    beauty: [
      "Indulge in premium beauty treatments and exceptional service.",
      "Expert stylists and therapists dedicated to enhancing your natural beauty.",
      "Luxury beauty experiences tailored to your unique style and needs.",
    ],
    services: [
      "Professional, reliable service you can trust for all your needs.",
      "Expert solutions delivered with quality workmanship and customer care.",
      "Your local experts providing top-quality service and guaranteed satisfaction.",
    ],
    education: [
      "Empowering students with knowledge, skills, and confidence for success.",
      "Expert instruction in a supportive learning environment.",
      "Quality education that inspires growth and achievement.",
    ],
    portfolio: [
      "Creative excellence delivered through innovative design and strategic thinking.",
      "Bringing visions to life with artistic expertise and professional execution.",
      "Award-winning creative work that makes an impact.",
    ],
    events: [
      "Creating unforgettable moments with meticulous planning and flawless execution.",
      "Your special occasions deserve extraordinary attention to detail.",
      "Making dreams come true, one celebration at a time.",
    ],
    shop: [
      "Curated selection of quality products for every style and occasion.",
      "Discover unique finds and exceptional value at our boutique.",
      "Your destination for quality products and personalized shopping experience.",
    ],
    tech: [
      "Innovative technology solutions that drive business growth and efficiency.",
      "Cutting-edge software built to solve real-world challenges.",
      "Transform your business with powerful, intuitive technology.",
    ],
  };

  const template = randomItem(templates[categoryId] || templates.tech);
  const keywords = businessType.keywords.join(", ");
  return template.replace("{cuisine}", businessType.keywords[0]);
}

// Generate pitch
function generatePitch(businessType, style) {
  const pitches = [
    `Perfect for ${businessType.keywords[0]} businesses that want a ${style.toLowerCase()} online presence. Clean layout with strong CTAs to convert visitors into customers.`,
    `Built for ${businessType.name.toLowerCase()}s seeking a ${style.toLowerCase()} aesthetic. Includes all essential sections to showcase services and capture leads effectively.`,
    `Ideal ${style.toLowerCase()} template for ${businessType.keywords[0]} professionals. Features optimized sections for conversions and customer engagement.`,
  ];
  return randomItem(pitches);
}

// Generate pages list
function generatePages(businessType, categoryId) {
  const commonPages = ["Home", "About", "Contact"];
  const categoryPages = {
    food: ["Menu", "Reservations", "Gallery", "Reviews"],
    realestate: ["Listings", "Agents", "Services", "Testimonials"],
    fitness: ["Programs", "Schedule", "Trainers", "Pricing"],
    beauty: ["Services", "Pricing", "Gallery", "Booking"],
    services: ["Services", "Pricing", "Quote", "Reviews"],
    education: ["Courses", "Programs", "Enrollment", "FAQ"],
    portfolio: ["Portfolio", "Work", "Case Studies", "Services"],
    events: ["Services", "Gallery", "Packages", "RSVP"],
    shop: ["Shop", "Products", "Categories", "Cart"],
    tech: ["Features", "Pricing", "Demo", "Docs"],
  };

  const specific = categoryPages[categoryId] || ["Services", "Products"];
  return [...commonPages, ...randomItems(specific, 3)];
}

// Generate includes list
function generateIncludes() {
  const base = [
    "Responsive layout (mobile-first)",
    "Modern sections & spacing",
    "SEO-friendly structure",
    "Fast load (no backend)",
    "Easy color + font swap",
  ];
  
  const extras = [
    "Contact form integration",
    "Social media links",
    "Google Maps embed",
    "Image gallery system",
    "Testimonial sections",
    "Call-to-action blocks",
    "FAQ accordion",
    "Newsletter signup",
  ];
  
  return [...base, ...randomItems(extras, 2)];
}

// Generate best for list
function generateBestFor(businessType) {
  return [
    businessType.name + "s",
    ...randomItems(businessType.keywords, 2),
  ];
}

// Generate tags
function generateTags(businessType, styles, categoryId) {
  const tags = [
    ...businessType.keywords,
    ...styles.map((s) => s.toLowerCase()),
    categoryId,
  ];
  return [...new Set(tags)].slice(0, 5);
}

// --- Generate Single Website ---
let websiteCounter = 0;
const generatedSkus = new Set();

async function generateWebsite() {
  websiteCounter++;

  // Pick random category and business type
  const categoryIds = Object.keys(BUSINESS_TYPES);
  const categoryId = randomItem(categoryIds);
  const businessType = randomItem(BUSINESS_TYPES[categoryId]);

  // Generate unique SKU
  let sku;
  do {
    const prefix = categoryId.substring(0, 4).toUpperCase();
    const num = String(Math.floor(1000 + Math.random() * 9000));
    sku = `${prefix}-${num}`;
  } while (generatedSkus.has(sku));
  generatedSkus.add(sku);

  // Generate name and details
  const name = generateBusinessName(businessType, categoryId);
  const styles = randomItems(STYLES, 2);
  const price = randomPrice();
  const short = generateDescription(businessType, categoryId).slice(0, 80) + "...";
  const pitch = generatePitch(businessType, styles[0]);
  const pages = generatePages(businessType, categoryId);
  const includes = generateIncludes();
  const bestFor = generateBestFor(businessType);
  const tags = generateTags(businessType, styles, categoryId);
  const accent = randomItem(ACCENT_PALETTES);
  const addedAt = new Date().toISOString().split("T")[0];

  const website = {
    sku,
    categoryId,
    name,
    style: styles,
    price,
    short,
    pitch,
    pages,
    bestFor,
    includes,
    tags,
    accent,
    featuredRank: websiteCounter,
    addedAt,
  };

  return website;
}

// --- HTML Template Generator ---
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
  <meta name="color-scheme" content="dark light" />
  <title>${escapeHtml(website.name)} — Preview</title>
  <meta name="description" content="Preview: ${escapeHtml(website.name)} (${escapeHtml(website.sku)})." />
  <link rel="stylesheet" href="../_shared/preview.css" />
</head>
<body>
  <a class="skip" href="#main">Skip to content</a>

  <header class="hdr" role="banner">
    <div class="hdr__inner">
      <a class="brand" href="../../index.html" aria-label="Back to catalogue">
        <span class="brand__mark" aria-hidden="true"></span>
        <span class="brand__text">
          <span class="brand__name" id="brandName">Template Preview</span>
          <span class="brand__sub" id="brandSub">—</span>
        </span>
      </a>

      <nav class="nav" aria-label="Preview navigation">
        <a class="nav__link" href="#about">About</a>
        <a class="nav__link" href="#offer">Offer</a>
        <a class="nav__link" href="#proof">Proof</a>
        <a class="nav__link" href="#faq">FAQ</a>
        <a class="nav__link nav__link--cta" href="#contact">Contact</a>
      </nav>

      <div class="hdr__actions">
        <button id="themeToggle" class="btn btn--ghost" type="button">Theme</button>
        <a class="btn" href="../../index.html">Back</a>
      </div>
    </div>
  </header>

  <main id="main" class="main" role="main">
    <section class="hero" aria-label="Hero">
      <div class="hero__inner">
        <div class="hero__copy">
          <div class="hero__kicker" id="kicker">Template</div>
          <h1 class="hero__title" id="title">Loading…</h1>
          <p class="hero__sub" id="subtitle"></p>

          <div class="hero__meta">
            <div class="meta">
              <div class="meta__label">Template code</div>
              <div class="meta__value" id="sku">—</div>
            </div>
            <div class="meta">
              <div class="meta__label">Style</div>
              <div class="meta__value" id="style">—</div>
            </div>
            <div class="meta">
              <div class="meta__label">Price</div>
              <div class="meta__value" id="price">—</div>
            </div>
          </div>

          <div class="hero__actions">
            <button id="buyBtn" class="btn" type="button">Buy this template</button>
            <button id="copySkuBtn" class="btn btn--ghost" type="button">Copy code</button>
          </div>

          <div class="chips" id="chips" aria-label="Tags"></div>
        </div>

        <div class="hero__mock" aria-hidden="true">
          <div class="mock">
            <div class="mock__top"></div>
            <div class="mock__body">
              <div class="mock__h"></div>
              <div class="mock__p"></div>
              <div class="mock__p"></div>
              <div class="mock__cards">
                <div class="mock__card"></div>
                <div class="mock__card"></div>
                <div class="mock__card"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec" id="about" aria-label="About">
      <div class="sec__head">
        <h2 class="sec__title">About</h2>
        <p class="sec__desc" id="aboutText"></p>
      </div>
      <div class="grid3" id="aboutCards"></div>
    </section>

    <section class="sec" id="offer" aria-label="Offer">
      <div class="sec__head">
        <h2 class="sec__title" id="offerTitle">What you get</h2>
        <p class="sec__desc">A buyer-ready layout with clear sections and strong call-to-action.</p>
      </div>
      <div class="grid2">
        <div class="panel">
          <div class="panel__title">Includes</div>
          <ul class="list" id="includes"></ul>
        </div>
        <div class="panel">
          <div class="panel__title">Pages</div>
          <ul class="list" id="pages"></ul>
        </div>
      </div>
    </section>

    <section class="sec" id="proof" aria-label="Proof">
      <div class="sec__head">
        <h2 class="sec__title">Proof & trust</h2>
        <p class="sec__desc">These blocks show how the website can look for real customers.</p>
      </div>
      <div class="grid3" id="proofCards"></div>
    </section>

    <section class="sec" id="faq" aria-label="FAQ">
      <div class="sec__head">
        <h2 class="sec__title">FAQ</h2>
        <p class="sec__desc">Common questions buyers ask before purchasing.</p>
      </div>
      <div class="faq" id="faqList"></div>
    </section>

    <section class="sec sec--contact" id="contact" aria-label="Contact">
      <div class="contact">
        <div class="contact__copy">
          <h2 class="contact__title">Ready to customize this template?</h2>
          <p class="contact__desc">Send the code and I'll deliver the ZIP + quick edit guide.</p>
          <div class="contact__row">
            <button id="contactBuyBtn" class="btn" type="button">Buy now</button>
            <a class="btn btn--ghost" href="../../index.html">Browse more templates</a>
          </div>
        </div>
        <div class="contact__panel">
          <div class="panel">
            <div class="panel__title">Best for</div>
            <ul class="list" id="bestFor"></ul>
          </div>
        </div>
      </div>
    </section>

    <footer class="ftr" role="contentinfo">
      <div class="ftr__inner">
        <div>
          <div class="ftr__title">${escapeHtml(website.name)}</div>
          <div class="ftr__muted">Preview page: /catalogue/${escapeHtml(slug)}/${escapeHtml(slug)}.html</div>
        </div>
        <a class="ftr__link" href="../../index.html">Back to catalogue</a>
      </div>
    </footer>
  </main>

  <script>
    window.PREVIEW_SKU = ${JSON.stringify(website.sku)};
  </script>
  <script type="module" src="../_shared/preview.js"></script>
</body>
</html>
`;
}

// --- Save Website ---
async function saveWebsite(website) {
  const slug = slugify(website.name);
  const dir = path.join(CONFIG.outputDir, slug);
  
  // Create directory
  await fs.mkdir(dir, { recursive: true });
  
  // Write HTML file
  const htmlFile = path.join(dir, `${slug}.html`);
  const html = generateHTML(website, slug);
  await fs.writeFile(htmlFile, html, "utf8");
  
  return { slug, dir, htmlFile };
}

// --- Update catalogue-data.js ---
async function appendToCatalogueData(website) {
  try {
    let content = await fs.readFile(CONFIG.dataFile, "utf8");
    
    // Find the last item in ITEMS array
    const lastItemIndex = content.lastIndexOf("];");
    if (lastItemIndex === -1) return;
    
    // Generate the new item code
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
    
    // Insert before the closing bracket
    content = content.slice(0, lastItemIndex) + newItem + content.slice(lastItemIndex);
    
    await fs.writeFile(CONFIG.dataFile, content, "utf8");
  } catch (error) {
    console.error("Error updating catalogue data:", error.message);
  }
}

// --- Logging ---
async function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  await fs.appendFile(CONFIG.logFile, logMessage, "utf8");
}

// --- Main Loop ---
let running = true;
let generatedCount = 0;

process.on("SIGINT", () => {
  console.log("\n\n🛑 Stopping generation...");
  running = false;
});

process.on("SIGTERM", () => {
  console.log("\n\n🛑 Stopping generation...");
  running = false;
});

async function main() {
  console.log("🚀 ENDLESS WEBSITE GENERATOR STARTED");
  console.log("=====================================");
  console.log(`📁 Output: ${CONFIG.outputDir}`);
  console.log(`📝 Log: ${CONFIG.logFile}`);
  console.log(`⏱️  Delay: ${CONFIG.delay}ms between generations`);
  console.log("\n Press Ctrl+C to stop\n");
  
  await log("🚀 Generator started");

  while (running) {
    try {
      // Generate website data
      const website = await generateWebsite();
      
      // Save files
      const { slug, htmlFile } = await saveWebsite(website);
      
      // Update catalogue data
      await appendToCatalogueData(website);
      
      generatedCount++;
      
      const message = `✅ Generated #${generatedCount}: ${website.name} (${website.sku}) → ${slug}`;
      await log(message);
      
      // Wait before next generation
      if (running) {
        await new Promise((resolve) => setTimeout(resolve, CONFIG.delay));
      }
    } catch (error) {
      const errorMsg = `❌ Error: ${error.message}`;
      await log(errorMsg);
      console.error(error);
      
      // Wait before retrying
      if (running) {
        await new Promise((resolve) => setTimeout(resolve, CONFIG.delay * 2));
      }
    }
  }

  console.log("\n=====================================");
  console.log(`✅ Generation stopped`);
  console.log(`📊 Total websites generated: ${generatedCount}`);
  await log(`✅ Generator stopped. Total: ${generatedCount} websites`);
}

// Run the generator
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

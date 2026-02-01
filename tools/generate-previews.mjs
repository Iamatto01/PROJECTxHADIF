import fs from "node:fs/promises";
import path from "node:path";

// Import your data
import { ITEMS } from "../catalogue/catalogue-data.js";

// --- Helper: Convert names to URL-friendly slugs ---
function slugify(name) {
  return (name || "")
    .toString()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

// --- Helper: Escape special characters for HTML safety ---
function escapeHtml(s) {
  return (s ?? "")
    .toString()
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// --- Template: The HTML Structure for your pages ---
function pageHtml({ sku, name, slug }) {
  // This uses your shared CSS and JS to load the content dynamically
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark light" />
  <title>${escapeHtml(name)} — Preview</title>
  <meta name="description" content="Preview: ${escapeHtml(name)} (${escapeHtml(sku)})." />
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
          <p class="contact__desc">Send the code and I’ll deliver the ZIP + quick edit guide.</p>
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
          <div class="ftr__title">${escapeHtml(name)}</div>
          <div class="ftr__muted">Preview page: /catalogue/${escapeHtml(slug)}/${escapeHtml(slug)}.html</div>
        </div>
        <a class="ftr__link" href="../../index.html">Back to catalogue</a>
      </div>
    </footer>
  </main>

  <script>
    window.PREVIEW_SKU = ${JSON.stringify(sku)};
  </script>
  <script type="module" src="../_shared/preview.js"></script>
</body>
</html>
`;
}

// --- Main Function: Reads data and writes files ---
async function main() {
  console.log("🚀 Starting Website Generation...");
  
  const outRoot = path.resolve("../catalogue"); // Target folder
  const reserved = new Set(["_shared"]); // Don't overwrite this folder
  const used = new Map(); // Track slugs to avoid duplicates

  // 1. Loop through every item in your database
  for (const item of ITEMS) {
    const base = slugify(item.name);
    let slug = base;

    // Handle duplicate names
    if (!slug || reserved.has(slug)) slug = `${base || "template"}_${item.sku.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
    const prevSku = used.get(slug);
    if (prevSku && prevSku !== item.sku) {
      slug = `${base}_${item.sku.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`;
    }
    used.set(slug, item.sku);

    // 2. Create the folder: /catalogue/template_name/
    const dir = path.join(outRoot, slug);
    await fs.mkdir(dir, { recursive: true });

    // 3. Write the HTML file
    const file = path.join(dir, `${slug}.html`);
    await fs.writeFile(file, pageHtml({ sku: item.sku, name: item.name, slug }), "utf8");
    
    // console.log(`   - Created: ${slug}`);
  }

  console.log(`✅ Generated ${ITEMS.length} preview pages under /catalogue/`);
}

// Run the function
await main();

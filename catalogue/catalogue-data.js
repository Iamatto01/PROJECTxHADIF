export const STYLES = [
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

export const CATEGORIES = [
  { id: "food", name: "Restaurant & Cafe", blurb: "Menus, bookings, promos, delivery CTA." },
  { id: "realestate", name: "Real Estate", blurb: "Listings, agents, lead capture, trust." },
  { id: "fitness", name: "Fitness & Wellness", blurb: "Programs, schedules, memberships, results." },
  { id: "beauty", name: "Beauty Salon & Spa", blurb: "Services, pricing, appointments, gallery." },
  { id: "services", name: "Local Services", blurb: "Handyman, cleaning, HVAC, quick quotes." },
  { id: "education", name: "Education & Tutoring", blurb: "Courses, enrollment, credibility, FAQs." },
  { id: "portfolio", name: "Portfolio & Creative", blurb: "Show work, win clients, look premium." },
  { id: "events", name: "Events & Wedding", blurb: "RSVP, schedules, vendors, locations." },
  { id: "shop", name: "Mini Shop", blurb: "Product catalog, bundles, socials, CTA." },
  { id: "tech", name: "Tech & Startup", blurb: "SaaS landing, waitlists, pricing, demos." },
];

const money = (n) => Math.round(n);

const baseIncludes = [
  "Responsive layout (mobile-first)",
  "Modern sections & spacing",
  "SEO-friendly structure",
  "Fast load (no backend)",
  "Easy color + font swap",
];

const pagesCommon = ["Home", "About", "Services", "Contact"];

/**
 * 10 catalogue items (10 categories × 1 product each)
 * Each website has a unique style inspired by beautiful real-world designs.
 */
export const ITEMS = [
  // ─── 1. Restaurant & Cafe ── Warm, Elegant ── Inspired by Noma / Alinea style sites
  {
    sku: "FOOD-001",
    categoryId: "food",
    name: "Ember & Grain",
    style: ["Warm", "Elegant"],
    price: money(89),
    short: "A warm and inviting fine-dining website with rich textures, earthy tones, and elegant typography.",
    pitch:
      "Inspired by the world's best restaurant websites like Noma and Alinea. Ember & Grain brings a cinematic warmth to your cafe or restaurant — with full-bleed imagery, a curated menu section, a reservations CTA, and an atmosphere that makes visitors hungry before they even walk in. The earthy color palette and serif headings feel artisanal and high-end.",
    pages: ["Home", "Menu", "Reservations", "Gallery", "Contact"],
    bestFor: ["Fine dining", "Farm-to-table", "Wine bars", "Brunch spots"],
    includes: [...baseIncludes, "Full-bleed hero with overlay text", "Curated menu grid section", "Reservation CTA block", "Instagram gallery section"],
    tags: ["restaurant", "fine dining", "warm", "elegant", "menu", "reservation"],
    accent: { a: "#c2703e", b: "#8b5e3c", c: "#d4a76a" },
    featuredRank: 1,
    addedAt: "2026-03-01",
  },

  // ─── 2. Real Estate ── Corporate, Modern ── Inspired by Compass / Sotheby's Realty
  {
    sku: "REAL-001",
    categoryId: "realestate",
    name: "Skyline & Co",
    style: ["Corporate", "Modern"],
    price: money(99),
    short: "A sleek, corporate real estate site with bold property cards, map integration areas, and lead capture forms.",
    pitch:
      "Modelled after premium agencies like Compass and Sotheby's International Realty. Skyline & Co features a clean hero with search prompt, featured listings in a responsive card grid, agent profile sections, and powerful trust signals. The navy and gold color scheme communicates authority and exclusivity — perfect for agencies that sell high-value properties.",
    pages: ["Home", "Listings", "Agents", "About", "Contact"],
    bestFor: ["Real estate agencies", "Property managers", "Luxury agents", "Condo developers"],
    includes: [...baseIncludes, "Property listing card grid", "Agent profile cards", "Lead capture CTA form", "Trust badge section"],
    tags: ["realestate", "corporate", "modern", "listings", "agents", "lead capture"],
    accent: { a: "#1e3a5f", b: "#c9a84c", c: "#3b82f6" },
    featuredRank: 2,
    addedAt: "2026-03-01",
  },

  // ─── 3. Fitness & Wellness ── Bold, Neon ── Inspired by Peloton / CrossFit sites
  {
    sku: "FIT-001",
    categoryId: "fitness",
    name: "Titan Pulse",
    style: ["Bold", "Neon"],
    price: money(79),
    short: "An intense, high-energy fitness site with dark backgrounds, neon accents, and powerful call-to-action blocks.",
    pitch:
      "Inspired by Peloton, CrossFit, and Nike Training Club. Titan Pulse is built for gyms, trainers, and fitness studios that want to project strength and motivation. The dark base with electric neon highlights creates urgency. Features include program tiers, class schedules, transformation showcases, and bold membership CTAs that convert browsers into members.",
    pages: ["Home", "Programs", "Schedule", "Trainers", "Join Now"],
    bestFor: ["Gyms", "CrossFit boxes", "Personal trainers", "Fitness studios"],
    includes: [...baseIncludes, "Program tier cards", "Weekly class schedule grid", "Trainer spotlight section", "Bold membership CTA block"],
    tags: ["fitness", "bold", "neon", "gym", "training", "dark theme"],
    accent: { a: "#39ff14", b: "#00e5ff", c: "#ff3d00" },
    featuredRank: 3,
    addedAt: "2026-03-01",
  },

  // ─── 4. Beauty Salon & Spa ── Luxury, Elegant ── Inspired by Chanel / Glossier
  {
    sku: "BEAUTY-001",
    categoryId: "beauty",
    name: "Velvet Rose Studio",
    style: ["Luxury", "Elegant"],
    price: money(89),
    short: "A luxurious, soft-toned beauty website with delicate typography, rose-gold accents, and spa-like serenity.",
    pitch:
      "Inspired by the visual identity of Glossier, Chanel Beauty, and high-end day spas. Velvet Rose Studio wraps your salon in an air of sophistication — soft gradients, gentle serif fonts, rose-gold accent lines, and generous whitespace. It includes a services menu with pricing, a visual gallery, booking CTAs, and testimonial cards that build trust with elegance.",
    pages: ["Home", "Services", "Gallery", "Booking", "Contact"],
    bestFor: ["Beauty salons", "Day spas", "Nail studios", "Skincare clinics"],
    includes: [...baseIncludes, "Services menu with pricing tiers", "Gallery masonry grid", "Booking CTA with WhatsApp", "Testimonial slider section"],
    tags: ["beauty", "luxury", "elegant", "salon", "spa", "rose gold"],
    accent: { a: "#d4a0a0", b: "#b76e79", c: "#f0d5c8" },
    featuredRank: 4,
    addedAt: "2026-03-02",
  },

  // ─── 5. Local Services ── Minimal, Modern ── Inspired by Jobber / Housecall Pro
  {
    sku: "SERV-001",
    categoryId: "services",
    name: "SwiftFix Pro",
    style: ["Minimal", "Modern"],
    price: money(69),
    short: "A clean, no-nonsense service website with clear pricing, quick-quote CTA, and trust-building review blocks.",
    pitch:
      "Inspired by modern service platforms like Jobber and Housecall Pro. SwiftFix Pro is designed for plumbers, electricians, cleaners, and handymen who need a site that gets straight to the point. Minimal layout, sharp sans-serif typography, service list with icons, a prominent quote request button, and customer review blocks. No fluff — just conversions.",
    pages: ["Home", "Services", "Pricing", "Reviews", "Contact"],
    bestFor: ["Plumbers", "Electricians", "Cleaners", "HVAC technicians", "Handymen"],
    includes: [...baseIncludes, "Service list with icons", "Quick-quote CTA block", "Customer review cards", "Service area section"],
    tags: ["services", "minimal", "modern", "plumber", "cleaner", "handyman"],
    accent: { a: "#2563eb", b: "#0ea5e9", c: "#6366f1" },
    featuredRank: 5,
    addedAt: "2026-03-02",
  },

  // ─── 6. Education & Tutoring ── Playful, Warm ── Inspired by Duolingo / Khan Academy
  {
    sku: "EDU-001",
    categoryId: "education",
    name: "BrightPath Academy",
    style: ["Playful", "Warm"],
    price: money(79),
    short: "A friendly, colorful education site with rounded cards, playful illustrations, and inviting enrollment CTAs.",
    pitch:
      "Takes cues from Duolingo, Khan Academy, and Coursera's inviting interfaces. BrightPath Academy uses cheerful colors, rounded corners, playful iconography, and warm tones to make learning feel accessible. Features include course cards, instructor profiles, a curriculum overview, student testimonials, and a bright enrollment CTA that parents and students trust immediately.",
    pages: ["Home", "Courses", "Instructors", "FAQ", "Enroll"],
    bestFor: ["Tutoring centers", "Language schools", "Coding bootcamps", "Music academies"],
    includes: [...baseIncludes, "Course cards with categories", "Instructor profile section", "Curriculum timeline layout", "Enrollment CTA with trust badges"],
    tags: ["education", "playful", "warm", "tutoring", "courses", "academy"],
    accent: { a: "#f59e0b", b: "#10b981", c: "#f97316" },
    featuredRank: 6,
    addedAt: "2026-03-03",
  },

  // ─── 7. Portfolio & Creative ── Editorial, Minimal ── Inspired by Awwwards / Behance portfolios
  {
    sku: "PORT-001",
    categoryId: "portfolio",
    name: "Studio Monochrome",
    style: ["Editorial", "Minimal"],
    price: money(99),
    short: "A striking editorial portfolio with black-and-white contrast, large typography, and dramatic project showcases.",
    pitch:
      "Draws inspiration from Awwwards-winning portfolios and the editorial layouts of magazines like Kinfolk and Cereal. Studio Monochrome uses bold typographic hierarchy, dramatic black-and-white contrast, and generous negative space to let creative work speak for itself. Features oversized project cards, a case study layout, a minimal about section, and a clean contact CTA.",
    pages: ["Home", "Work", "Case Studies", "About", "Contact"],
    bestFor: ["Designers", "Photographers", "Art directors", "Freelance creatives"],
    includes: [...baseIncludes, "Large-format project grid", "Case study detail layout", "Minimal about / bio section", "Contact CTA with social links"],
    tags: ["portfolio", "editorial", "minimal", "designer", "photographer", "black and white"],
    accent: { a: "#171717", b: "#525252", c: "#a3a3a3" },
    featuredRank: 7,
    addedAt: "2026-03-03",
  },

  // ─── 8. Events & Wedding ── Elegant, Warm ── Inspired by Zola / The Knot
  {
    sku: "EVENT-001",
    categoryId: "events",
    name: "Golden Hour Events",
    style: ["Elegant", "Warm"],
    price: money(89),
    short: "A romantic, golden-toned event website with floral accents, timeline layout, and beautiful RSVP sections.",
    pitch:
      "Inspired by Zola, The Knot, and premium wedding stationery. Golden Hour Events creates a romantic atmosphere with warm golden hues, delicate serif fonts, soft floral accent patterns, and a timeline-style event schedule. Includes RSVP placeholder, venue info with map area, vendor showcase, and a gift registry section. Perfect for weddings, galas, and milestone celebrations.",
    pages: ["Home", "Schedule", "Venue", "RSVP", "Gallery"],
    bestFor: ["Wedding planners", "Event organizers", "Gala coordinators", "Birthday parties"],
    includes: [...baseIncludes, "Event timeline section", "RSVP CTA block", "Venue info with map area", "Vendor / sponsor showcase"],
    tags: ["events", "wedding", "elegant", "warm", "romantic", "golden"],
    accent: { a: "#d4a257", b: "#b8860b", c: "#f5e6cc" },
    featuredRank: 8,
    addedAt: "2026-03-04",
  },

  // ─── 9. Mini Shop ── Playful, Bold ── Inspired by Gumroad / Shopify storefronts
  {
    sku: "SHOP-001",
    categoryId: "shop",
    name: "Pixel Market",
    style: ["Playful", "Bold"],
    price: money(79),
    short: "A vibrant, bold mini shop with colorful product cards, bundle deals, and social-commerce CTA buttons.",
    pitch:
      "Inspired by Gumroad storefronts, Pop-up shops, and colorful Shopify themes. Pixel Market is a punchy mini-catalog that makes products irresistible. Bold colors, chunky buttons, product cards with hover effects, bundle deal sections, and prominent WhatsApp/Instagram order CTAs. Designed for sellers who want personality and urgency — from streetwear drops to handmade crafts.",
    pages: ["Home", "Products", "Bundles", "About", "Order"],
    bestFor: ["Small product sellers", "Streetwear brands", "Craft makers", "Digital product sellers"],
    includes: [...baseIncludes, "Product card grid with hover effects", "Bundle deal spotlight section", "WhatsApp/Instagram order CTA", "Social proof / review badges"],
    tags: ["shop", "playful", "bold", "products", "bundles", "colorful"],
    accent: { a: "#e11d48", b: "#7c3aed", c: "#facc15" },
    featuredRank: 9,
    addedAt: "2026-03-04",
  },

  // ─── 10. Tech & Startup ── Modern, Neon ── Inspired by Linear / Vercel / Stripe
  {
    sku: "TECH-001",
    categoryId: "tech",
    name: "NovaByte",
    style: ["Modern", "Neon"],
    price: money(99),
    short: "A futuristic SaaS landing page with glassmorphism, gradient meshes, and a sleek pricing table.",
    pitch:
      "Inspired by the landing pages of Linear, Vercel, Stripe, and Raycast. NovaByte is a cutting-edge SaaS/startup template with a dark base, iridescent gradient mesh backgrounds, glassmorphism cards, and sharp modern typography. Features include a hero with waitlist CTA, animated feature cards, a three-tier pricing table, testimonial blocks, and an FAQ accordion. Built to impress investors and convert early adopters.",
    pages: ["Home", "Features", "Pricing", "Testimonials", "Contact"],
    bestFor: ["SaaS startups", "Dev tools", "AI products", "Tech agencies"],
    includes: [...baseIncludes, "Glassmorphism feature cards", "Three-tier pricing table", "Waitlist / early access CTA", "FAQ accordion section"],
    tags: ["tech", "modern", "neon", "saas", "startup", "glassmorphism", "dark"],
    accent: { a: "#8b5cf6", b: "#06b6d4", c: "#22d3ee" },
    featuredRank: 10,
    addedAt: "2026-03-05",
  },
];

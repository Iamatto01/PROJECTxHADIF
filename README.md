# Iamatto Web Catalog

A polished catalogue for selling small website templates online.

- 10 categories
- 50+ products (expandable with automation)
- Search / filter / sort
- Product detail modal
- Optional admin backend (email magic-link login)
- **NEW: Automated website generator for endless mockups**

## Run the catalogue (simple)

Open `index.html` in your browser.

If your browser blocks ES modules when opening from file://, use a tiny local server:

### Option A: Python (if installed)

```bash
python -m http.server 5173
```

Then open: `http://localhost:5173/`

Main entry point:

- `http://localhost:5173/`

### Option B: Node (if installed)

```bash
npx serve .
```

## Customize for your business

### 1) Change your contact links

Edit `CONTACT` in `catalogue/config.js`:

- `whatsappNumberInternational` (recommended)
- `email`

The “Buy this template” button will open WhatsApp or Email with a prefilled message.

## Template previews (one website per example)

Open any template in the catalogue and click **Open preview**.

Direct link format:

`/catalogue/<slug>/<slug>.html` (example: `/catalogue/bakery_luxe/bakery_luxe.html`)

### 2) Change catalogue products

Edit the data in `catalogue/catalogue-data.js`:

- Categories: `CATEGORIES`
- Products: `ITEMS`

Each product has:

- `sku` (template code)
- `name`, `short`, `pitch`
- `price`
- `pages`, `bestFor`, `includes`, `tags`
- `accent` colors (used for thumbnails)

## 🤖 Automated Website Generator (NEW!)

Generate unlimited mockup websites automatically with realistic content!

### Quick Start (Easy Way)

**Using the quickstart script:**
```bash
cd tools
./quickstart.sh batch 20    # Generate 20 websites
./quickstart.sh endless     # Generate forever (Ctrl+C to stop)
./quickstart.sh help        # See all options
```

### Alternative (Direct Commands)

**Endless Generation** (runs until you stop it):
```bash
cd tools
node endless-generator.mjs
```

Press `Ctrl+C` to stop. Each website is saved automatically.

**Batch Generation** (generate specific number):
```bash
cd tools
node batch-generator.mjs 20  # generates 20 websites
```

### What Gets Generated

Each website includes:
- **Unique business name** with realistic details
- **10 business categories**: Food, Real Estate, Fitness, Beauty, Services, Education, Portfolio, Events, Shop, Tech
- **Multiple styles**: Modern, Minimal, Bold, Elegant, Playful, Corporate, Luxury, Editorial, Neon, Warm
- **Realistic content**: Descriptions, features, pricing, pages
- **Full HTML preview** page with detailed sections
- **Auto-added** to catalogue database

### Features

✅ Generates detailed, realistic websites (not simple/empty)  
✅ Creates unique business names and descriptions  
✅ Automatic variety across categories and styles  
✅ Saves continuously until stopped  
✅ Progress logging with timestamps  
✅ Each website has 6-7 relevant pages  
✅ Includes pricing, features, and business details  
✅ Enhanced content with multiple template variations  
✅ Professional quality suitable for real use  

### Generated Content Details

Every website includes:
- Hero section with business name and tagline
- About section with business description
- Services/Features with 7-8 included items
- Multiple page templates (Home, About, Services, Contact, etc.)
- Realistic pricing ($49-$149)
- Style combinations and color palettes
- SEO-friendly structure
- Mobile-responsive layout

See `tools/README-GENERATOR.md` for full documentation.

## Next step (later)

When you want, we can add:

- real checkout
- auto delivery (download link)
- admin panel to add/edit templates
- preview pages for each template

## Admin backend (email login)

Start backend:

```bash
cd server
npm install
npm run dev
```

Admin UI:

- `http://localhost:5174/admin/`

### Gmail setup (send login link to your inbox)

1) Turn on Google 2-Step Verification
2) Create an **App Password** (Google Account → Security → App passwords)
3) Create `server/.env` (copy from `server/.env.example`) and set:

```env
PUBLIC_BASE_URL=http://localhost:5174

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=Iamatto Web Catalog <yourgmail@gmail.com>
```

If SMTP is not set, the backend prints the login link to the console (dev mode).

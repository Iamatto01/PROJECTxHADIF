# Endless Website Generator

Automatically generates endless mockup websites with realistic content until you stop it.

## Features

- **Endless Generation**: Continuously creates new websites until you press Ctrl+C
- **Realistic Content**: Generates business names, descriptions, and details based on real business types
- **10 Categories**: Food, Real Estate, Fitness, Beauty, Services, Education, Portfolio, Events, Shop, Tech
- **Variety**: Multiple styles (Modern, Minimal, Bold, Elegant, Playful, etc.)
- **Auto-Save**: Each website is automatically saved to the catalogue
- **Detailed Content**: Each website includes realistic pages, services, pricing, and features
- **Progress Tracking**: Logs all generated websites with timestamps

## Quick Start

### Run the Generator

```bash
cd tools
node endless-generator.mjs
```

### Stop the Generator

Press `Ctrl+C` at any time to stop generation. The generator will finish the current website and display the total count.

## What It Generates

Each website includes:
- **Unique SKU**: Automatically generated unique identifier
- **Business Name**: Realistic business names with prefixes and suffixes
- **Category**: One of 10 business categories
- **Style**: 2 random styles (e.g., "Modern, Elegant")
- **Price**: Realistic pricing between $49-$149
- **Description**: Short and long descriptions
- **Pages**: 5-6 relevant pages for the business type
- **Features**: Detailed list of included features
- **Tags**: Relevant keywords for searchability
- **Color Palette**: Unique accent colors
- **HTML Preview**: Full HTML preview page

## Example Output

```
🚀 ENDLESS WEBSITE GENERATOR STARTED
=====================================
📁 Output: /path/to/catalogue
📝 Log: /path/to/generation-log.txt
⏱️  Delay: 5000ms between generations

 Press Ctrl+C to stop

✅ Generated #1: Elite Restaurant Kitchen (FOOD-1234) → elite_restaurant_kitchen
✅ Generated #2: Modern Yoga Studio (FITN-5678) → modern_yoga_studio
✅ Generated #3: Premium Hair Salon (BEAU-9012) → premium_hair_salon
...
```

## Configuration

Edit the `CONFIG` object in `endless-generator.mjs` to customize:

- `delay`: Time between generations (default: 5000ms / 5 seconds)
- `outputDir`: Where to save generated websites
- `logFile`: Where to save the generation log

## Generated Files

For each website, the generator creates:

1. **HTML File**: `/catalogue/{slug}/{slug}.html` - Full preview page
2. **Catalogue Entry**: Added to `/catalogue/catalogue-data.js`
3. **Log Entry**: Timestamped entry in `generation-log.txt`

## Business Types

The generator includes realistic templates for:

### Food & Beverage
- Restaurants, Cafes, Bakeries, Bars, Food Trucks

### Real Estate
- Agencies, Property Management, Luxury Homes

### Fitness & Wellness
- Gyms, Yoga Studios, CrossFit, Pilates

### Beauty & Spa
- Hair Salons, Spas, Nail Salons, Beauty Salons

### Local Services
- Plumbing, Cleaning, Electrician, HVAC

### Education
- Tutoring, Music Schools, Language Schools, Bootcamps

### Creative Portfolio
- Photographers, Designers, Artists, Writers

### Events
- Wedding Planners, Venues, Catering

### Retail Shops
- Clothing Stores, Gift Shops, Bookstores

### Technology
- SaaS Startups, App Development, Web Agencies

## Logs

All generation activity is logged to `generation-log.txt` with timestamps:

```
[2026-02-01T13:30:00.000Z] 🚀 Generator started
[2026-02-01T13:30:05.000Z] ✅ Generated #1: Elite Restaurant Kitchen (FOOD-1234) → elite_restaurant_kitchen
[2026-02-01T13:30:10.000Z] ✅ Generated #2: Modern Yoga Studio (FITN-5678) → modern_yoga_studio
```

## Tips

- **Let It Run**: Start the generator and let it run in the background while you work
- **Check Progress**: Monitor the console output or check `generation-log.txt`
- **Storage**: Each website is ~15KB, so you can generate thousands before worrying about space
- **Integration**: Generated websites automatically integrate with the existing catalogue system

## Stopping Safely

The generator handles shutdown gracefully:
- Press `Ctrl+C` to signal stop
- Current generation completes
- Final statistics displayed
- Log updated with shutdown message

## Troubleshooting

**Generator won't start?**
- Make sure you're running Node.js 16 or higher
- Check that you're in the `tools` directory

**Files not appearing?**
- Check the console for error messages
- Verify write permissions on the `catalogue` directory

**Want to change generation speed?**
- Edit `delay` in the CONFIG object (in milliseconds)

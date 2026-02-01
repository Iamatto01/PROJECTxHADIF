# Netlify Deployment Guide

This repository is optimized for seamless deployment on Netlify with automatic preview page generation.

## 🚀 Quick Deploy

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

## 📋 Setup Instructions

### 1. Connect Your Repository

1. Go to [Netlify](https://app.netlify.com/) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository: `Iamatto01/PROJECTxHADIF`
4. Netlify will automatically detect the `netlify.toml` configuration

### 2. Build Settings (Auto-configured)

The `netlify.toml` file already contains the correct settings:

```toml
[build]
  command = "node tools/generate-previews.mjs"
  publish = "."
```

**What this means:**
- **Build Command**: Runs the preview generator script before deployment
- **Publish Directory**: Deploys the entire repository (`.` means root)

### 3. Deploy!

Click "Deploy site" and Netlify will:
1. Clone your repository
2. Run `node tools/generate-previews.mjs` to generate all preview pages
3. Publish the complete site with all generated files

## ✨ Benefits of This Setup

### 🧹 Cleaner Repository
- Generated HTML files don't need to be committed to git
- Only source files (`catalogue-data.js`) are tracked
- Smaller repository size and cleaner git history

### ⚡ Faster Updates
- Edit `catalogue/catalogue-data.js` to add/modify products
- Push the change to GitHub
- Netlify automatically rebuilds and regenerates all preview pages
- Changes go live in seconds!

### 🔄 No Infinite Loops
- No git operations during build
- No risk of build triggering another build
- Simple, predictable deployment pipeline

### 🎯 Fresh Builds Every Time
- Preview pages generated fresh on every deploy
- Always in sync with your catalogue data
- No stale or outdated files

## 📝 How to Update Your Catalogue

1. **Edit catalogue data**:
   ```bash
   # Edit the products/items
   nano catalogue/catalogue-data.js
   ```

2. **Commit and push**:
   ```bash
   git add catalogue/catalogue-data.js
   git commit -m "Add new product: Amazing Template"
   git push
   ```

3. **Automatic deployment**:
   - Netlify detects the push
   - Runs the build command
   - Regenerates all preview pages
   - Deploys the updated site
   - ✅ Done!

## 🔧 Local Testing

Before pushing, you can test the build locally:

```bash
# Generate preview pages
node tools/generate-previews.mjs

# Start a local server
npx serve .
# Or: python -m http.server 5173

# Open browser
# http://localhost:5173/
```

## 📁 What Gets Generated

During the Netlify build, the script creates:

```
catalogue/
├── _shared/                    # Shared assets (already in git)
├── catalogue-data.js           # Source data (in git)
├── config.js                   # Configuration (in git)
├── bistro_bloom/               # Generated during build
│   └── bistro_bloom.html
├── beauty_shop_luxe/           # Generated during build
│   └── beauty_shop_luxe.html
└── ... (75+ preview pages)
```

## 🎨 Customization

### Change Build Command

Edit `netlify.toml`:

```toml
[build]
  command = "node tools/generate-previews.mjs && node tools/other-script.mjs"
```

### Change Publish Directory

If you want to publish only the `catalogue` folder:

```toml
[build]
  publish = "catalogue"
```

(Note: This requires updating paths in HTML files)

## 🐛 Troubleshooting

### Build fails with "Cannot find module"

- Ensure all imports in `generate-previews.mjs` use relative paths
- Check that `catalogue-data.js` is committed to git

### Preview pages not showing

- Check Netlify build logs for errors
- Verify the script ran successfully (look for "✅ Netlify Build Complete")
- Ensure publish directory is correct (`.` or root)

### Changes not appearing

- Clear Netlify cache: Site Settings → Build & deploy → Clear cache
- Trigger a manual deploy: Deploys → Trigger deploy → Deploy site

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)

## ✅ Verification

After deployment, verify your site:

1. **Main catalogue**: `https://your-site.netlify.app/`
2. **Example preview**: `https://your-site.netlify.app/catalogue/bistro_bloom/bistro_bloom.html`
3. **Check build logs**: Deployments → [Latest Deploy] → Deploy log

Look for this in the logs:
```
🚀 Netlify Build: Generating Website Preview Pages...
✅ Netlify Build Complete: Generated 75 preview pages successfully!
```

---

**🎉 You're all set!** Your website will now build and deploy automatically on every push to GitHub.

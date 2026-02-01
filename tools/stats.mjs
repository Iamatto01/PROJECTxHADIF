#!/usr/bin/env node

/**
 * Statistics viewer for generated websites
 * Shows breakdown of generated content
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, "..", "catalogue", "catalogue-data.js");

async function getStats() {
  try {
    const content = await fs.readFile(dataFile, "utf8");
    
    // Count total items
    const itemMatches = content.match(/sku:/g);
    const totalItems = itemMatches ? itemMatches.length : 0;
    
    // Extract category counts
    const categoryMatches = content.matchAll(/categoryId:\s*"(\w+)"/g);
    const categories = {};
    for (const match of categoryMatches) {
      const cat = match[1];
      categories[cat] = (categories[cat] || 0) + 1;
    }
    
    // Extract style counts
    const styleMatches = content.matchAll(/style:\s*\[(.*?)\]/g);
    const styles = {};
    for (const match of styleMatches) {
      const styleList = match[1].match(/"([^"]+)"/g) || [];
      styleList.forEach(style => {
        const clean = style.replace(/"/g, '');
        styles[clean] = (styles[clean] || 0) + 1;
      });
    }
    
    // Extract price range
    const priceMatches = content.matchAll(/price:\s*(\d+)/g);
    const prices = Array.from(priceMatches).map(m => parseInt(m[1]));
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;
    const avgPrice = prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0;
    
    // Latest additions
    const dateMatches = content.matchAll(/addedAt:\s*"([^"]+)"/g);
    const dates = Array.from(dateMatches).map(m => m[1]);
    const latestDate = dates.length ? dates[dates.length - 1] : 'N/A';
    
    return {
      totalItems,
      categories,
      styles,
      prices: { min: minPrice, max: maxPrice, avg: avgPrice },
      latestDate,
    };
  } catch (error) {
    console.error("Error reading catalogue data:", error.message);
    return null;
  }
}

async function main() {
  console.log("\n📊 WEBSITE CATALOGUE STATISTICS\n");
  console.log("=".repeat(50));
  
  const stats = await getStats();
  
  if (!stats) {
    console.log("❌ Could not load statistics");
    return;
  }
  
  console.log(`\n📈 OVERVIEW`);
  console.log(`   Total Websites: ${stats.totalItems}`);
  console.log(`   Latest Addition: ${stats.latestDate}`);
  
  console.log(`\n💰 PRICING`);
  console.log(`   Range: $${stats.prices.min} - $${stats.prices.max}`);
  console.log(`   Average: $${stats.prices.avg}`);
  
  console.log(`\n📁 CATEGORIES`);
  const sortedCategories = Object.entries(stats.categories)
    .sort(([, a], [, b]) => b - a);
  sortedCategories.forEach(([cat, count]) => {
    const bar = "█".repeat(Math.floor(count / 2));
    console.log(`   ${cat.padEnd(12)} ${count.toString().padStart(3)} ${bar}`);
  });
  
  console.log(`\n🎨 STYLES`);
  const sortedStyles = Object.entries(stats.styles)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  sortedStyles.forEach(([style, count]) => {
    const bar = "▓".repeat(Math.floor(count / 2));
    console.log(`   ${style.padEnd(12)} ${count.toString().padStart(3)} ${bar}`);
  });
  
  console.log("\n" + "=".repeat(50));
  console.log("✨ Run ./quickstart.sh to generate more websites!");
  console.log("");
}

main().catch(console.error);

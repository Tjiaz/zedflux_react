/**
 * One-time script: reads Frontend/src/BlogArticle.jsx, extracts articlesData,
 * and writes Backend/seed/articles.json for seeding the database.
 * Run from repo root: node Backend/scripts/export-articles-from-frontend.js
 */
const fs = require("fs");
const path = require("path");

const frontendPath = path.join(__dirname, "..", "..", "Frontend", "src", "BlogArticle.jsx");
const seedPath = path.join(__dirname, "..", "seed", "articles.json");
const code = fs.readFileSync(frontendPath, "utf8");

const startMarker = "const articlesData = ";
const startIdx = code.indexOf(startMarker);
if (startIdx === -1) {
  console.error("Could not find 'const articlesData = ' in BlogArticle.jsx");
  process.exit(1);
}

let pos = startIdx + startMarker.length;
// skip whitespace
while (pos < code.length && /\s/.test(code[pos])) pos++;
if (code[pos] !== "{") {
  console.error("Expected '{' after articlesData =");
  process.exit(1);
}

let depth = 1;
const start = pos;
pos++;
while (pos < code.length && depth > 0) {
  const ch = code[pos];
  if (ch === '"' || ch === "'" || ch === "`") {
    const quote = ch;
    pos++;
    while (pos < code.length) {
      if (code[pos] === "\\") {
        pos += 2;
        continue;
      }
      if (code[pos] === quote) {
        pos++;
        break;
      }
      pos++;
    }
    continue;
  }
  if (ch === "{") depth++;
  else if (ch === "}") depth--;
  pos++;
}

const extracted = code.slice(start, pos);
// articlesData may reference defaultImage from the component
const defaultImage = "/images/default_image.png";
let obj;
try {
  obj = new Function("defaultImage", "return " + extracted)(defaultImage);
} catch (e) {
  console.error("Failed to parse extracted object:", e.message);
  process.exit(1);
}

const articles = Object.entries(obj).map(([slug, a]) => ({ slug, ...a }));
const seedDir = path.dirname(seedPath);
if (!fs.existsSync(seedDir)) {
  fs.mkdirSync(seedDir, { recursive: true });
}
fs.writeFileSync(seedPath, JSON.stringify(articles, null, 2), "utf8");
console.log(`Exported ${articles.length} articles to ${seedPath}`);

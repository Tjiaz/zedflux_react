/**
 * Seed blog_articles table from Backend/seed/articles.json.
 * Requires .env with DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT.
 * Run from repo root: node Backend/scripts/seed-articles.js
 */
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
const mysql = require("mysql2");
const fs = require("fs");
const path = require("path");

const seedPath = path.join(__dirname, "..", "seed", "articles.json");
if (!fs.existsSync(seedPath)) {
  console.error("Seed file not found:", seedPath);
  console.error("Run first: node Backend/scripts/export-articles-from-frontend.js");
  process.exit(1);
}

const articles = JSON.parse(fs.readFileSync(seedPath, "utf8"));
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

function toDb(article) {
  return {
    slug: article.slug,
    title: article.title,
    header_image: article.headerImage || article.header_image || "",
    meta_json: JSON.stringify(article.meta || {}),
    intro: article.intro || "",
    intro_continuation: article.introContinuation || article.intro_continuation || null,
    intro_closing: article.introClosing || article.intro_closing || null,
    sections_json: JSON.stringify(article.sections || []),
    tool_sections_json: article.toolSections != null ? JSON.stringify(article.toolSections) : null,
    similar_stories_json: article.similarStories != null ? JSON.stringify(article.similarStories) : null,
    author_json: article.author != null ? JSON.stringify(article.author) : null,
    ad_section_json: article.adSection != null ? JSON.stringify(article.adSection) : null,
  };
}

const sql = `
  INSERT INTO blog_articles (slug, title, header_image, meta_json, intro, intro_continuation, intro_closing, sections_json, tool_sections_json, similar_stories_json, author_json, ad_section_json)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    title = VALUES(title),
    header_image = VALUES(header_image),
    meta_json = VALUES(meta_json),
    intro = VALUES(intro),
    intro_continuation = VALUES(intro_continuation),
    intro_closing = VALUES(intro_closing),
    sections_json = VALUES(sections_json),
    tool_sections_json = VALUES(tool_sections_json),
    similar_stories_json = VALUES(similar_stories_json),
    author_json = VALUES(author_json),
    ad_section_json = VALUES(ad_section_json),
    updated_at = CURRENT_TIMESTAMP
`;

let done = 0;
let failed = 0;
articles.forEach((article) => {
  const row = toDb(article);
  const params = [
    row.slug,
    row.title,
    row.header_image,
    row.meta_json,
    row.intro,
    row.intro_continuation,
    row.intro_closing,
    row.sections_json,
    row.tool_sections_json,
    row.similar_stories_json,
    row.author_json,
    row.ad_section_json,
  ];
  db.query(sql, params, (err) => {
    if (err) {
      console.error("Error inserting", article.slug, err.message);
      failed++;
    } else {
      done++;
    }
    if (done + failed === articles.length) {
      console.log(`Seeded ${done} articles, ${failed} failed.`);
      process.exit(failed > 0 ? 1 : 0);
    }
  });
});

if (articles.length === 0) {
  console.log("No articles in seed file.");
  process.exit(0);
}

// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
// Configure RSS parser with custom fields to extract more image data
const parser = new Parser({
  customFields: {
    item: [
      ['content:encoded', 'content'],
      ['media:content', 'media'],
      ['media:thumbnail', 'thumbnail'],
    ]
  }
});
const mysql = require("mysql2");

//create connection to mysql database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10, // Allows multiple connections
  queueLimit: 0,
});

// Configure CORS
const allowedOrigins = [
  "https://zedfluxtechnologies.com",
  "https://www.zedfluxtechnologies.com",
  "http://zedfluxtechnologies.com",
  "http://www.zedfluxtechnologies.com",
  "https://zedflux-react.vercel.app",
  "https://zedflux-react-cogx17a13-tjiazs-projects.vercel.app",
  "http://localhost:3000",
];

// Add frontend URL from environment variable if set
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost / 127.0.0.1 on any port for development
      if (
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin)
      ) {
        return callback(null, true);
      }
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        // Log for debugging
        console.log("CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Technology-focused RSS Feed URLs - Using reliable tech news sources
const RSS_FEEDS = {
  technologies: "https://feeds.bbci.co.uk/news/technology/rss.xml",
  "ai-ml": "https://techcrunch.com/tag/artificial-intelligence/feed/", // Primary
  "ai-ml-fallback": "https://www.wired.com/feed/tag/ai/latest/rss", // Alternative AI news
  "software-dev": "https://www.theverge.com/rss/index.xml",
  "digital-innovation": "https://techcrunch.com/feed/", // Primary
  "digital-innovation-fallback": "https://www.wired.com/feed/rss", // Fallback - different from AI-ML
  "cloud-devops": "https://aws.amazon.com/blogs/aws/feed/",
};

// Helper function to parse RSS feed with timeout and retry
const fetchFeed = async (url, retries = 3) => {
  for (let i = 0; i <= retries; i++) {
    try {
      // Fetch feed with axios first to add headers and better error handling
      const response = await Promise.race([
        axios.get(url, {
          timeout: 12000, // Increased timeout for slower feeds
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*',
          },
          maxRedirects: 5,
          validateStatus: function (status) {
            return status >= 200 && status < 400; // Accept redirects
          },
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Feed timeout")), 12000)
        ),
      ]);

      // Check if response is valid
      if (!response.data) {
        throw new Error("Empty response from feed");
      }

      // Parse the XML response
      const feed = await parser.parseString(response.data);
      
      // Validate feed has items
      if (!feed || !feed.items || feed.items.length === 0) {
        throw new Error("Feed has no items");
      }
      
      return feed;
    } catch (error) {
      console.error(`Error fetching feed from ${url} (attempt ${i + 1}/${retries + 1}):`, error.message);
      
      // Try direct parsing as fallback (for feeds that might work with rss-parser directly)
      if (i === retries) {
        try {
          console.log(`Attempting direct parse for ${url}`);
          const feed = await Promise.race([
            parser.parseURL(url),
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Direct parse timeout")), 10000)
            ),
          ]);
          return feed;
        } catch (directError) {
          console.error(`Direct parse also failed for ${url}:`, directError.message);
          return null;
        }
      }
      
      // Wait before retry with exponential backoff
      await new Promise((resolve) => setTimeout(resolve, (i + 1) * 1500));
    }
  }
  return null;
};

// Get latest posts
app.get("/api/latest-posts", async (req, res) => {
  try {
    const latestPosts = {};
    
    // Map categories to their feed URLs (handle fallbacks) - Only include main categories, not fallbacks
    // Fallback feeds are used internally and won't appear as separate categories
    const categoryFeedMap = {
      technologies: ["technologies"],
      "ai-ml": ["ai-ml", "ai-ml-fallback"], // Try TechCrunch AI first, then Wired AI
      "software-dev": ["software-dev"],
      "digital-innovation": ["digital-innovation", "digital-innovation-fallback"], // Try TechCrunch main, then Wired main
      "cloud-devops": ["cloud-devops"],
    };

    for (const [category, feedKeys] of Object.entries(categoryFeedMap)) {
      let feedSuccess = false;
      
      for (const feedKey of feedKeys) {
        if (feedSuccess) break; // Already got a successful feed for this category
        
        const url = RSS_FEEDS[feedKey];
        if (!url) continue;
        
        try {
          console.log(`Fetching ${category} from ${url}`);
          const feed = await fetchFeed(url);

          if (feed && feed.items && feed.items.length > 0) {
            const item = feed.items[0];
            // Extract image from RSS content (fast, works in production)
            let imageUrl = extractImageFromRSSContent(item);
            
            // Fallback to HTML scraping only in development
            if (!imageUrl && process.env.NODE_ENV !== "production") {
              imageUrl = await fetchImageFromHtml(item.link);
            }

            // Use placeholder service for default image (works everywhere)
            // Category-specific placeholders
            const categoryPlaceholders = {
              'ai-ml': 'https://via.placeholder.com/800x450/0066cc/ffffff?text=AI+%26+ML',
              'digital-innovation': 'https://via.placeholder.com/800x450/0066cc/ffffff?text=Digital+Innovation',
            };
            
            const defaultImageUrl = categoryPlaceholders[category] || 
              "https://via.placeholder.com/800x450/0066cc/ffffff?text=Tech+News";

            // Ensure we always have a valid image URL (never null or empty)
            const finalImageUrl = (imageUrl && imageUrl.trim() !== '') ? imageUrl : defaultImageUrl;

            latestPosts[category] = {
              title: item.title || "No title available",
              link: item.link || "#",
              pubDate: item.pubDate || new Date().toISOString(),
              category: category, // Use the main category name, not the feed key
              image: finalImageUrl, // Always ensure a valid image URL
              description: item.contentSnippet || "",
            };
            feedSuccess = true;
            console.log(`Successfully fetched ${category} from ${url}`);
          }
        } catch (feedError) {
          console.error(`Error processing ${category} feed from ${url}:`, feedError.message);
          // Continue to try fallback if available
        }
      }
      
      // If no feed succeeded, add error entry
      if (!feedSuccess) {
        console.error(`All feeds failed for category: ${category}`);
        latestPosts[category] = {
          title: "Content temporarily unavailable",
          link: "#",
          pubDate: new Date().toISOString(),
          category: category,
          image: null,
          description: "Please check back later",
        };
      }
    }

    res.json(latestPosts);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Failed to fetch RSS feeds" });
  }
});

// Function to extract image from RSS feed content (fast, works in production)
const extractImageFromRSSContent = (item) => {
  try {
    // Check enclosure first (most reliable)
    if (item.enclosure?.url) {
      // Accept any enclosure URL (many feeds use enclosure for images)
      if (item.enclosure.type?.startsWith('image/') || !item.enclosure.type) {
        const url = item.enclosure.url;
        if (url && url.trim() !== '' && url.startsWith('http')) {
          return url;
        }
      }
    }

    // Check media:content (common in many RSS feeds, especially TechCrunch)
    if (item.media) {
      if (typeof item.media === 'string') {
        // If it's a URL string
        if (item.media.startsWith('http')) return item.media;
      } else if (item.media.url && typeof item.media.url === 'string' && item.media.url.startsWith('http')) {
        return item.media.url;
      } else if (item.media.$ && item.media.$.url && item.media.$.url.startsWith('http')) {
        return item.media.$.url;
      } else if (Array.isArray(item.media)) {
        // Sometimes media is an array
        for (const mediaItem of item.media) {
          const url = typeof mediaItem === 'string' ? mediaItem : (mediaItem.url || mediaItem.$?.url);
          if (url && url.startsWith('http')) return url;
        }
      }
    }

    // Check media:thumbnail
    if (item.thumbnail) {
      if (typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
        return item.thumbnail;
      } else if (item.thumbnail.url && typeof item.thumbnail.url === 'string' && item.thumbnail.url.startsWith('http')) {
        return item.thumbnail.url;
      } else if (item.thumbnail.$ && item.thumbnail.$.url && item.thumbnail.$.url.startsWith('http')) {
        return item.thumbnail.$.url;
      }
    }

    // Check itunes image
    if (item.itunes?.image) {
      const itunesImg = typeof item.itunes.image === 'string' ? item.itunes.image : item.itunes.image.href;
      if (itunesImg && itunesImg.startsWith('http')) {
        return itunesImg;
      }
    }

    // Extract from content/description HTML
    const contentSources = [
      item['content:encoded'],
      item.content,
      item.contentSnippet,
      item.description,
    ];

    for (const content of contentSources) {
      if (!content) continue;
      
      // Try to find img tags in HTML content
      const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch && imgMatch[1]) {
        let imgUrl = imgMatch[1];
        // Convert relative URLs to absolute
        if (imgUrl.startsWith('//')) {
          imgUrl = 'https:' + imgUrl;
        } else if (imgUrl.startsWith('/')) {
          // Try to get base URL from item.link
          try {
            const url = new URL(item.link);
            imgUrl = url.origin + imgUrl;
          } catch (e) {
            continue;
          }
        }
        if (imgUrl.startsWith('http')) {
          return imgUrl;
        }
      }

      // Try to find og:image or twitter:image in meta tags
      const ogMatch = content.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
      if (ogMatch && ogMatch[1] && ogMatch[1].startsWith('http')) {
        return ogMatch[1];
      }

      const twitterMatch = content.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']+)["']/i);
      if (twitterMatch && twitterMatch[1] && twitterMatch[1].startsWith('http')) {
        return twitterMatch[1];
      }
    }

    return null;
  } catch (error) {
    console.error('Error extracting image from RSS content:', error);
    return null;
  }
};

// Function to fetch image from URL (slower, only for development)
const fetchImageFromHtml = async (articleUrl) => {
  try {
    const response = await axios.get(articleUrl, {
      timeout: 10000, // Increased timeout for React apps
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    // Parse the article URL to handle relative image URLs
    const baseUrl = new URL(articleUrl);

    // Try multiple common image selectors (prioritize meta tags)
    const selectors = [
      { selector: 'meta[property="og:image"]', attr: 'content' },
      { selector: 'meta[name="twitter:image"]', attr: 'content' },
      { selector: 'meta[property="og:image:url"]', attr: 'content' },
      { selector: 'img[class*="main"]', attr: 'src' },
      { selector: 'img[class*="article"]', attr: 'src' },
      { selector: 'img[class*="featured"]', attr: 'src' },
      { selector: 'img[class*="header"]', attr: 'src' },
      { selector: "img:first", attr: 'src' },
    ];

    for (const { selector, attr } of selectors) {
      const imageUrl = $(selector).attr(attr);
      if (imageUrl) {
        // If it's already an absolute URL, return it
        if (imageUrl.startsWith("http")) {
          return imageUrl;
        }
        // If it's a relative URL, convert it to absolute
        if (imageUrl.startsWith("/")) {
          return baseUrl.origin + imageUrl;
        }
        // If it's a relative path, resolve it relative to the article URL
        try {
          return new URL(imageUrl, baseUrl.origin).href;
        } catch (e) {
          // Skip invalid URLs
          continue;
        }
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image from ${articleUrl}:`, error.message);
    return null;
  }
};
// Get category posts
app.get("/api/posts/:category", async (req, res) => {
  try {
    const { category } = req.params;
    
    // Handle category mapping and fallbacks
    const categoryFeedMap = {
      technologies: ["technologies"],
      "ai-ml": ["ai-ml", "ai-ml-fallback"],
      "software-dev": ["software-dev"],
      "digital-innovation": ["digital-innovation", "digital-innovation-fallback"],
      "cloud-devops": ["cloud-devops"],
    };
    
    const feedKeys = categoryFeedMap[category];
    if (!feedKeys) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    let feed = null;
    for (const feedKey of feedKeys) {
      const url = RSS_FEEDS[feedKey];
      if (!url) continue;
      
      try {
        feed = await fetchFeed(url);
        if (feed && feed.items && feed.items.length > 0) {
          break; // Success, use this feed
        }
      } catch (error) {
        console.error(`Failed to fetch ${feedKey} for category ${category}:`, error.message);
        // Continue to try fallback
      }
    }

    if (!feed || !feed.items) {
      return res.status(404).json({ message: "Feed not available" });
    }

    // Limit items to improve performance
    const itemsToProcess = feed.items.slice(0, 12);
    
    // Category-specific placeholders
    const categoryPlaceholders = {
      'ai-ml': 'https://via.placeholder.com/800x450/0066cc/ffffff?text=AI+%26+ML',
      'digital-innovation': 'https://via.placeholder.com/800x450/0066cc/ffffff?text=Digital+Innovation',
    };
    const defaultImageUrl = categoryPlaceholders[category] || 
      "https://via.placeholder.com/800x450/0066cc/ffffff?text=Tech+News";

    const postsPromises = itemsToProcess.map(async (item) => {
      // Extract image from RSS content (fast, works in production)
      let imageUrl = extractImageFromRSSContent(item);
      
      // Fallback to HTML scraping only in development
      if (!imageUrl && process.env.NODE_ENV !== "production") {
        imageUrl = await fetchImageFromHtml(item.link);
      }

      // Ensure we always have a valid image URL (never null or empty)
      const finalImageUrl = (imageUrl && imageUrl.trim() !== '') ? imageUrl : defaultImageUrl;

      return {
        title: item.title || "No title available",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        category: category,
        image: finalImageUrl, // Always ensure a valid image URL
        description: item.contentSnippet || "",
      };
    });

    const posts = await Promise.all(postsPromises);

    res.json(posts);
  } catch (error) {
    console.error("Error fetching category posts:", error);
    res.status(500).json({ message: "Failed to fetch category posts" });
  }
});

app.post("/api/contact", (req, res) => {
  // Support multiple frontend payload shapes (Contact page, Services/Portfolio CTAs, etc.)
  const body = req.body || {};

  const name =
    (body.name || "").trim() ||
    (body.fullName || "").trim() ||
    `${(body.firstName || "").trim()} ${(body.lastName || "").trim()}`.trim();

  const email = (body.email || "").trim();

  const subject =
    (body.subject || "").trim() ||
    "Website Contact";

  const message =
    (body.message || "").trim() ||
    (body.projectDescription || "").trim() ||
    "Contact request submitted from website.";

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Create table if missing (keeps local/dev setup working)
  const createContactsTableQuery = `
    CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createContactsTableQuery, (tableErr) => {
    if (tableErr) {
      console.error("Error creating contacts table:", tableErr);
      // continue attempt to insert anyway
    }

    const insertQuery =
      "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";

    db.query(insertQuery, [name, email, subject, message], (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        return res
          .status(500)
          .json({ error: "Failed to save contact information" });
      }

      res.json({ message: "Message sent successfully!", id: result.insertId });
    });
  });
});

// Service inquiry endpoint
app.post("/api/service-inquiry", (req, res) => {
  const { firstName, lastName, workEmail, company, serviceType } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !workEmail || !company || !serviceType) {
    return res.status(400).json({ 
      error: "All fields are required",
      details: { firstName, lastName, workEmail, company, serviceType }
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(workEmail)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Create service_inquiries table if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS service_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      work_email VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      service_type VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
    }

    // Insert the inquiry
    const insertQuery = `
      INSERT INTO service_inquiries (first_name, last_name, work_email, company, service_type) 
      VALUES (?, ?, ?, ?, ?)
    `;
    
    db.query(
      insertQuery,
      [firstName, lastName, workEmail, company, serviceType],
      (err, result) => {
        if (err) {
          console.error("Database insertion error:", err);
          return res
            .status(500)
            .json({ error: "Failed to save service inquiry" });
        }

        res.json({ 
          message: "Thank you! We'll be in touch soon.",
          id: result.insertId 
        });
      }
    );
  });
});

// ------------------------------------------------------------
// Blog articles (MySQL)
// ------------------------------------------------------------

const createBlogArticlesTableQuery = `
  CREATE TABLE IF NOT EXISTS blog_articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title VARCHAR(500) NOT NULL,
    header_image VARCHAR(500) NOT NULL DEFAULT '',
    meta_json JSON,
    intro TEXT,
    intro_continuation TEXT,
    intro_closing TEXT,
    sections_json JSON NOT NULL,
    tool_sections_json JSON,
    similar_stories_json JSON,
    author_json JSON,
    ad_section_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_slug (slug)
  )
`;

db.query(createBlogArticlesTableQuery, (err) => {
  if (err) {
    console.error("Error creating blog_articles table:", err);
  }
});

// GET /api/articles — list all articles (for blog listing and recent blog)
app.get("/api/articles", (req, res) => {
  const { category } = req.query;
  const sql = category
    ? "SELECT slug, title, header_image, meta_json, intro, created_at FROM blog_articles WHERE LOWER(JSON_UNQUOTE(JSON_EXTRACT(meta_json, '$.category'))) = LOWER(?) ORDER BY created_at DESC"
    : "SELECT slug, title, header_image, meta_json, intro, created_at FROM blog_articles ORDER BY created_at DESC";
  const params = category ? [category] : [];

  db.query(sql, params, (err, rows) => {
    if (err) {
      console.error("Error fetching articles:", err);
      return res.status(500).json({ error: "Failed to fetch articles" });
    }
    const list = (rows || []).map((row) => ({
      slug: row.slug,
      title: row.title,
      image: row.header_image,
      headerImage: row.header_image,
      intro: row.intro,
      meta: typeof row.meta_json === "string" ? JSON.parse(row.meta_json) : row.meta_json,
      category: (row.meta_json && (typeof row.meta_json === "string" ? JSON.parse(row.meta_json) : row.meta_json).category) || "",
      date: (row.meta_json && (typeof row.meta_json === "string" ? JSON.parse(row.meta_json) : row.meta_json).date) || null,
      readTime: (row.meta_json && (typeof row.meta_json === "string" ? JSON.parse(row.meta_json) : row.meta_json).readTime) || null,
      created_at: row.created_at,
    }));
    res.json(list);
  });
});

// GET /api/articles/:slug — full article by slug
app.get("/api/articles/:slug", (req, res) => {
  const { slug } = req.params;
  const sql = "SELECT * FROM blog_articles WHERE slug = ? LIMIT 1";
  db.query(sql, [slug], (err, rows) => {
    if (err) {
      console.error("Error fetching article:", err);
      return res.status(500).json({ error: "Failed to fetch article" });
    }
    const row = (rows && rows[0]);
    if (!row) {
      return res.status(404).json({ error: "Article not found" });
    }
    const parse = (v) => (v == null ? v : typeof v === "string" ? JSON.parse(v) : v);
    const article = {
      title: row.title,
      headerImage: row.header_image,
      meta: parse(row.meta_json),
      intro: row.intro,
      introContinuation: row.intro_continuation || undefined,
      introClosing: row.intro_closing || undefined,
      sections: parse(row.sections_json) || [],
      toolSections: parse(row.tool_sections_json) || undefined,
      similarStories: parse(row.similar_stories_json) || undefined,
      author: parse(row.author_json) || undefined,
      adSection: parse(row.ad_section_json) || undefined,
    };
    res.json(article);
  });
});

// POST /api/articles — create or update article (for admin or seed script)
app.post("/api/articles", (req, res) => {
  const body = req.body;
  const slug = body.slug || body.title && body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  if (!slug || !body.title || !body.sections) {
    return res.status(400).json({ error: "slug, title, and sections are required" });
  }
  const meta = body.meta || {};
  const header_image = body.headerImage || body.header_image || "";
  const intro = body.intro || "";
  const intro_continuation = body.introContinuation || body.intro_continuation || null;
  const intro_closing = body.introClosing || body.intro_closing || null;
  const sections_json = JSON.stringify(body.sections);
  const tool_sections_json = body.toolSections != null ? JSON.stringify(body.toolSections) : null;
  const similar_stories_json = body.similarStories != null ? JSON.stringify(body.similarStories) : null;
  const author_json = body.author != null ? JSON.stringify(body.author) : null;
  const ad_section_json = body.adSection != null ? JSON.stringify(body.adSection) : null;
  const meta_json = JSON.stringify(meta);

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
  const params = [slug, body.title, header_image, meta_json, intro, intro_continuation, intro_closing, sections_json, tool_sections_json, similar_stories_json, author_json, ad_section_json];

  db.query(sql, params, (err, result) => {
    if (err) {
      console.error("Error saving article:", err);
      return res.status(500).json({ error: "Failed to save article" });
    }
    res.json({ ok: true, slug, id: result.insertId || result.affectedRows });
  });
});

// ------------------------------------------------------------
// Social Auto-post (optional, disabled by default)
// ------------------------------------------------------------

const AUTOSOCIAL_STATE_PATH = path.join(__dirname, "data", "autopost-state.json");

function ensureAutopostStateDir() {
  const dir = path.dirname(AUTOSOCIAL_STATE_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readAutopostState() {
  try {
    ensureAutopostStateDir();
    if (!fs.existsSync(AUTOSOCIAL_STATE_PATH)) return { categories: {}, lastRunAt: null };
    const raw = fs.readFileSync(AUTOSOCIAL_STATE_PATH, "utf8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read autopost state:", e.message);
    return { categories: {}, lastRunAt: null, error: e.message };
  }
}

function writeAutopostState(state) {
  try {
    ensureAutopostStateDir();
    fs.writeFileSync(AUTOSOCIAL_STATE_PATH, JSON.stringify(state, null, 2), "utf8");
  } catch (e) {
    console.error("Failed to write autopost state:", e.message);
  }
}

function formatSocialPost({ title, link, category }) {
  const tagMap = {
    technologies: ["Tech"],
    "ai-ml": ["AI", "MachineLearning"],
    "software-dev": ["SoftwareDevelopment"],
    "digital-innovation": ["DigitalInnovation"],
    "cloud-devops": ["Cloud", "DevOps"],
  };
  const tags = (tagMap[category] || ["Tech"]).map((t) => `#${t}`).join(" ");
  return `${title}\n\n${link}\n\n${tags}`;
}

async function postToX(text, imageUrl = null, link = null) {
  const bearerToken = process.env.X_BEARER_TOKEN || process.env.TWITTER_BEARER_TOKEN;
  if (!bearerToken) return { ok: false, skipped: true, reason: "Missing X_BEARER_TOKEN" };

  // Twitter/X API v2 endpoint for tweets
  const url = "https://api.twitter.com/2/tweets";
  
  console.log(`postToX called with imageUrl: ${imageUrl}, link: ${link}`);
  
  // Note: Twitter/X API v2 with Bearer tokens (OAuth 2.0) cannot directly upload media
  // However, when a URL is included in the tweet, Twitter automatically creates a card
  // and fetches the image from Open Graph (og:image) or Twitter Card (twitter:image) meta tags
  // So if the article URL has proper meta tags, Twitter will automatically include the image
  
  // Check for OAuth 1.0a credentials for direct media upload (optional)
  const consumerKey = process.env.X_CONSUMER_KEY || process.env.TWITTER_CONSUMER_KEY;
  const consumerSecret = process.env.X_CONSUMER_SECRET || process.env.TWITTER_CONSUMER_SECRET;
  const accessToken = process.env.X_ACCESS_TOKEN || process.env.TWITTER_ACCESS_TOKEN;
  const accessTokenSecret = process.env.X_ACCESS_TOKEN_SECRET || process.env.TWITTER_ACCESS_TOKEN_SECRET;
  
  let mediaId = null;
  
  // If OAuth 1.0a credentials are available, try to upload media directly
  if (imageUrl && consumerKey && consumerSecret && accessToken && accessTokenSecret) {
    console.log(`Attempting to upload image to Twitter: ${imageUrl}`);
    try {
      let oauth;
      try {
        oauth = require('oauth-1.0a');
      } catch (e) {
        console.log('oauth-1.0a package not found. Twitter will use URL card instead.');
      }
      
      if (oauth) {
        const crypto = require('crypto');
        
        // Check if imageUrl is localhost - Twitter can't fetch from localhost, so we must upload directly
        const isLocalhost = imageUrl && (imageUrl.includes('localhost') || imageUrl.includes('127.0.0.1'));
        if (isLocalhost) {
          console.log(`Image URL is localhost, must upload directly: ${imageUrl}`);
        }
        
        // Download the image
        try {
          const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
            timeout: 10000,
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
            }
          });
          
          const imageBuffer = Buffer.from(imageResponse.data);
          const imageBase64 = imageBuffer.toString('base64');
          
          if (!imageBase64 || imageBase64.length === 0) {
            throw new Error('Downloaded image is empty');
          }
          
          console.log(`Successfully downloaded image (${imageBuffer.length} bytes, base64 length: ${imageBase64.length})`);
          
          // Create OAuth 1.0a instance
          const oauthInstance = oauth({
            consumer: { key: consumerKey, secret: consumerSecret },
            signature_method: 'HMAC-SHA1',
            hash_function(base_string, key) {
              return crypto.createHmac('sha1', key).update(base_string).digest('base64');
            },
          });
          
          // Prepare OAuth request for media upload
          const requestData = {
            url: 'https://upload.twitter.com/1.1/media/upload.json',
            method: 'POST',
            data: { media_data: imageBase64 },
          };
          
          const token = { key: accessToken, secret: accessTokenSecret };
          const authHeader = oauthInstance.toHeader(oauthInstance.authorize(requestData, token));
          
          // Upload media to Twitter/X
          const uploadRes = await axios.post(
            requestData.url,
            { media_data: imageBase64 },
            {
              headers: {
                ...authHeader,
                "Content-Type": "application/x-www-form-urlencoded"
              },
              timeout: 15000
            }
          );
          
          mediaId = uploadRes.data?.media_id_string || null;
          if (mediaId) {
            console.log(`Successfully uploaded image to Twitter. Media ID: ${mediaId}`);
          } else {
            console.log(`Image upload succeeded but no media_id_string in response`);
          }
        } catch (downloadError) {
          console.error(`Error downloading image from ${imageUrl}:`, downloadError.message);
          throw downloadError;
        }
      }
    } catch (error) {
      console.error('Error uploading media to X:', error.message);
      if (error.response) {
        console.error('Twitter API error response:', error.response.data);
      }
      // Fall back to URL card (Twitter will fetch image from meta tags)
      mediaId = null;
    }
  } else {
    if (!imageUrl) {
      console.log('No imageUrl provided, will use URL card');
    } else {
      console.log('OAuth 1.0a credentials missing, will use URL card');
    }
  }
  
  const payload = { text };
  
  // If media uploaded successfully, attach it to the tweet
  if (mediaId) {
    payload.media = { media_ids: [mediaId] };
    console.log(`Attaching media to tweet: ${mediaId}`);
  }
  // Note: The text already includes the link (from formatSocialPost)
  // Twitter will automatically create a card from the URL's meta tags if no media is attached
  // Ensure your blog article pages have og:image and twitter:image meta tags

  console.log(`Posting to Twitter with payload:`, JSON.stringify(payload, null, 2));
  
  const res = await axios.post(
    url,
    payload,
    { headers: { Authorization: `Bearer ${bearerToken}`, "Content-Type": "application/json" }, timeout: 15000 }
  );
  
  console.log(`Twitter post successful. Response:`, res.data);
  
  return { ok: true, data: res.data, mediaId, usedImage: !!mediaId, imageUrl };
}

async function postToFacebook({ message, link, imageUrl = null }) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  if (!pageId || !accessToken) {
    return { ok: false, skipped: true, reason: "Missing FACEBOOK_PAGE_ID or FACEBOOK_PAGE_ACCESS_TOKEN" };
  }

  const url = `https://graph.facebook.com/v19.0/${encodeURIComponent(pageId)}/feed`;
  const params = new URLSearchParams();
  params.set("message", message);
  if (link) params.set("link", link);
  
  // Add image if provided - Facebook will automatically fetch and attach it from the URL
  if (imageUrl && imageUrl.startsWith('http')) {
    // Use picture parameter for image preview
    params.set("picture", imageUrl);
    // Also set attached_media if we want to upload it directly (alternative approach)
    // For now, using picture parameter is simpler
  }
  
  params.set("access_token", accessToken);

  const res = await axios.post(url, params.toString(), {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    timeout: 15000,
  });
  return { ok: true, data: res.data };
}

async function runSocialAutopostOnce() {
  const enabled = String(process.env.SOCIAL_AUTOPOST_ENABLED || "").toLowerCase() === "true";
  if (!enabled) return { ok: false, skipped: true, reason: "SOCIAL_AUTOPOST_ENABLED is not true" };

  const state = readAutopostState();
  const nowIso = new Date().toISOString();
  state.lastRunAt = nowIso;
  state.categories = state.categories || {};

  const categoriesFromEnv = (process.env.SOCIAL_AUTOPOST_CATEGORIES || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const categories = categoriesFromEnv.length
    ? categoriesFromEnv
    : ["technologies", "ai-ml", "software-dev", "digital-innovation", "cloud-devops"];

  // Same mapping logic as /api/latest-posts
  const categoryFeedMap = {
    technologies: ["technologies"],
    "ai-ml": ["ai-ml", "ai-ml-fallback"],
    "software-dev": ["software-dev"],
    "digital-innovation": ["digital-innovation", "digital-innovation-fallback"],
    "cloud-devops": ["cloud-devops"],
  };

  const results = {};

  for (const category of categories) {
    const feedKeys = categoryFeedMap[category];
    if (!feedKeys) {
      results[category] = { ok: false, skipped: true, reason: "Unknown category" };
      continue;
    }

    let latestItem = null;
    let latestLink = null;

    for (const feedKey of feedKeys) {
      const url = RSS_FEEDS[feedKey];
      if (!url) continue;
      const feed = await fetchFeed(url);
      if (feed?.items?.length) {
        latestItem = feed.items[0];
        latestLink = latestItem.link || latestItem.guid || null;
        break;
      }
    }

    if (!latestItem || !latestLink) {
      results[category] = { ok: false, skipped: true, reason: "No feed item available" };
      continue;
    }

    const lastPostedLink = state.categories?.[category]?.lastPostedLink;
    if (lastPostedLink === latestLink) {
      results[category] = { ok: true, skipped: true, reason: "Already posted latest item" };
      continue;
    }

    const title = latestItem.title || "New article";
    const link = latestItem.link || latestLink;
    const text = formatSocialPost({ title, link, category });
    
    // Extract image from RSS item
    let imageUrl = extractImageFromRSSContent(latestItem);
    
    // If no image found in RSS content, try fetching from the article URL
    // This is especially important for blog articles on the same site
    if (!imageUrl && link) {
      try {
        imageUrl = await fetchImageFromHtml(link);
        if (imageUrl) {
          console.log(`Extracted image from HTML for ${link}: ${imageUrl}`);
        }
      } catch (e) {
        console.log(`Failed to fetch image from HTML for ${link}: ${e.message}`);
      }
    }
    
    // Convert relative image URLs to absolute if needed
    if (imageUrl && !imageUrl.startsWith('http')) {
      try {
        const articleUrl = new URL(link);
        if (imageUrl.startsWith('/')) {
          imageUrl = articleUrl.origin + imageUrl;
        } else {
          imageUrl = new URL(imageUrl, articleUrl.origin).href;
        }
        console.log(`Converted relative image URL to absolute: ${imageUrl}`);
      } catch (e) {
        console.log(`Failed to convert relative image URL: ${e.message}`);
        // If URL parsing fails, skip image
        imageUrl = null;
      }
    }
    
    // Log final image URL for debugging
    if (imageUrl) {
      console.log(`Final image URL for Twitter post: ${imageUrl}`);
    } else {
      console.log(`No image URL found for article: ${link}`);
    }

    const platformResults = {};
    try {
      platformResults.x = await postToX(text, imageUrl, link);
    } catch (e) {
      platformResults.x = { ok: false, error: e.message };
    }

    try {
      platformResults.facebook = await postToFacebook({ message: title, link, imageUrl });
    } catch (e) {
      platformResults.facebook = { ok: false, error: e.message };
    }

    // Only mark as posted if at least one platform succeeded
    const anyOk = Object.values(platformResults).some((r) => r && r.ok === true);
    if (anyOk) {
      state.categories[category] = {
        lastPostedLink: latestLink,
        lastPostedTitle: title,
        lastPostedAt: nowIso,
        platformResults,
      };
      writeAutopostState(state);
      results[category] = { ok: true, posted: true, latestLink, platformResults };
    } else {
      results[category] = { ok: false, posted: false, latestLink, platformResults };
    }
  }

  return { ok: true, ranAt: nowIso, results };
}

app.get("/api/social/autopost/status", (req, res) => {
  const state = readAutopostState();
  res.json({
    enabled: String(process.env.SOCIAL_AUTOPOST_ENABLED || "").toLowerCase() === "true",
    lastRunAt: state.lastRunAt || null,
    categories: state.categories || {},
  });
});

app.post("/api/social/autopost/run", async (req, res) => {
  const secret = process.env.SOCIAL_AUTOPOST_SECRET;
  const provided = req.headers["x-autopost-secret"];
  if (!secret || provided !== secret) {
    return res.status(401).json({ ok: false, error: "Unauthorized" });
  }

  try {
    const result = await runSocialAutopostOnce();
    res.json(result);
  } catch (e) {
    console.error("Autopost run failed:", e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);

  // Background scheduler (optional)
  const enabled = String(process.env.SOCIAL_AUTOPOST_ENABLED || "").toLowerCase() === "true";
  if (enabled) {
    const minutes = Number(process.env.SOCIAL_AUTOPOST_INTERVAL_MINUTES || 360);
    const intervalMs = Math.max(15, minutes) * 60 * 1000;
    console.log(`Social autopost enabled. Interval: ${Math.max(15, minutes)} minutes`);

    setTimeout(() => {
      runSocialAutopostOnce().catch((e) => console.error("Autopost error:", e.message));
    }, 5000);

    setInterval(() => {
      runSocialAutopostOnce().catch((e) => console.error("Autopost error:", e.message));
    }, intervalMs);
  }
});

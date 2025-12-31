// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");
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

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Technology-focused RSS Feed URLs - Using reliable tech news sources
const RSS_FEEDS = {
  technologies: "https://feeds.bbci.co.uk/news/technology/rss.xml",
  "ai-ml": "https://techcrunch.com/tag/artificial-intelligence/feed/",
  "software-dev": "https://www.theverge.com/rss/index.xml",
  "digital-innovation": "https://techcrunch.com/feed/",
  "cloud-devops": "https://aws.amazon.com/blogs/aws/feed/",
};

// Helper function to parse RSS feed with timeout and retry
const fetchFeed = async (url, retries = 2) => {
  for (let i = 0; i <= retries; i++) {
    try {
      const feed = await Promise.race([
        parser.parseURL(url),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Feed timeout")), 8000)
        ),
      ]);
      return feed;
    } catch (error) {
      console.error(`Error fetching feed from ${url} (attempt ${i + 1}/${retries + 1}):`, error.message);
      if (i === retries) {
        return null;
      }
      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  return null;
};

// Get latest posts
app.get("/api/latest-posts", async (req, res) => {
  try {
    const latestPosts = {};

    for (const [category, url] of Object.entries(RSS_FEEDS)) {
      try {
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
          const defaultImageUrl = "https://via.placeholder.com/800x450/0066cc/ffffff?text=Tech+News";

          latestPosts[category] = {
            title: item.title || "No title available",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            category: category,
            image: imageUrl || defaultImageUrl,
            description: item.contentSnippet || "",
          };
        } else {
          throw new Error("No feed items found");
        }
      } catch (feedError) {
        console.error(`Error processing ${category} feed:`, feedError);
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
        return item.enclosure.url;
      }
    }

    // Check media:content (common in many RSS feeds)
    if (item.media) {
      if (typeof item.media === 'string') {
        // If it's a URL string
        if (item.media.startsWith('http')) return item.media;
      } else if (item.media.url && item.media.url.startsWith('http')) {
        return item.media.url;
      } else if (item.media.$.url && item.media.$.url.startsWith('http')) {
        return item.media.$.url;
      }
    }

    // Check media:thumbnail
    if (item.thumbnail) {
      if (typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
        return item.thumbnail;
      } else if (item.thumbnail.url && item.thumbnail.url.startsWith('http')) {
        return item.thumbnail.url;
      } else if (item.thumbnail.$.url && item.thumbnail.$.url.startsWith('http')) {
        return item.thumbnail.$.url;
      }
    }

    // Check itunes image
    if (item.itunes?.image) {
      return item.itunes.image;
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
      timeout: 3000,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });
    const html = response.data;
    const $ = cheerio.load(html);

    // Try multiple common image selectors
    const selectors = [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
      'img[class*="main"]',
      'img[class*="article"]',
      'img[class*="featured"]',
      "img:first",
    ];

    for (const selector of selectors) {
      const imageUrl = $(selector).attr("content") || $(selector).attr("src");
      if (imageUrl && imageUrl.startsWith("http")) {
        return imageUrl;
      }
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image from ${articleUrl}:`, error);
    return null;
  }
};
// Get category posts
app.get("/api/posts/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const url = RSS_FEEDS[category];

    if (!url) {
      return res.status(404).json({ message: "Category not found" });
    }

    const feed = await fetchFeed(url);

    if (!feed || !feed.items) {
      return res.status(404).json({ message: "Feed not available" });
    }

    // Limit items to improve performance
    const itemsToProcess = feed.items.slice(0, 12);
    
    // Use placeholder service for default image (works everywhere)
    const defaultImageUrl = "https://via.placeholder.com/800x450/0066cc/ffffff?text=Tech+News";

    const postsPromises = itemsToProcess.map(async (item) => {
      // Extract image from RSS content (fast, works in production)
      let imageUrl = extractImageFromRSSContent(item);
      
      // Fallback to HTML scraping only in development
      if (!imageUrl && process.env.NODE_ENV !== "production") {
        imageUrl = await fetchImageFromHtml(item.link);
      }

      return {
        title: item.title || "No title available",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        category: category,
        image: imageUrl || defaultImageUrl,
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
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)";
  db.query(query, [name, email, subject, message], (err, result) => {
    if (err) {
      console.error("Database insertion error:", err);
      return res
        .status(500)
        .json({ error: "Failed to save contact information" });
    }

    res.json({ message: "Message sent successfully!" });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);
});

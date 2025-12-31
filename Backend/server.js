// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
const parser = new Parser();
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
// Add your Hostinger frontend domain to the origin array
const allowedOrigins = [
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
      
      if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // Log for debugging - you can add your domain here temporarily
        console.log("CORS blocked origin:", origin);
        callback(null, true); // Allow all origins for now - update this for production security
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
          let imageUrl = item.enclosure?.url;
          // Skip slow image fetching for latest posts to improve performance
          if (!imageUrl && process.env.NODE_ENV !== "production") {
            imageUrl = await fetchImageFromHtml(item.link);
          }

          latestPosts[category] = {
            title: item.title || "No title available",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            category: category,
            image: imageUrl || "/public/images/default_image2.png",
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

// Function to fetch image from URL
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
    
    const postsPromises = itemsToProcess.map(async (item) => {
      let imageUrl = item.enclosure?.url; // Check RSS enclosure first
      // Skip slow image fetching in production to improve response time
      // Images will fallback to default
      if (!imageUrl && process.env.NODE_ENV !== "production") {
        imageUrl = await fetchImageFromHtml(item.link); // Fetch from HTML if needed
      }

      return {
        title: item.title || "No title available",
        link: item.link || "#",
        pubDate: item.pubDate || new Date().toISOString(),
        category: category,
        image: imageUrl || "/public/images/default_image2.png",
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

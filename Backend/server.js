// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");

const app = express();
const parser = new Parser();
const mysql = require("mysql2/promise");

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Configure CORS
app.use(
  cors({
    origin: [
      "https://zedflux-react.vercel.app",
      "https://zedflux-react-cogx17a13-tjiazs-projects.vercel.app",
      "http://localhost:3000",
      "https://www.zedfluxtechnologies.com/",
      "http://www.zedfluxtechnologies.com",
      "http://localhost:5001",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/public", express.static(path.join(__dirname, "public")));

// Updated RSS Feed URLs with more reliable sources
const RSS_FEEDS = {
  sports: "https://www.skysports.com/rss/12040",
  politics: "https://feeds.bbci.co.uk/news/politics/rss.xml",
  entertainment: "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml", // Changed to BBC entertainment
  technologies: "https://feeds.bbci.co.uk/news/technology/rss.xml", // Added BBC Technology feed
};

// Helper function to parse RSS feed
const fetchFeed = async (url) => {
  try {
    const feed = await parser.parseURL(url);
    return feed;
  } catch (error) {
    console.error(`Error fetching feed from ${url}:`, error);
    return null;
  }
};

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Zedflux Technologies" });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Get latest posts
app.get("/api/latest-posts", async (req, res) => {
  try {
    const latestPosts = {};

    for (const [category, url] of Object.entries(RSS_FEEDS)) {
      try {
        const feed = await fetchFeed(url);

        if (feed && feed.items && feed.items.length > 0) {
          const item = feed.items[0];
          latestPosts[category] = {
            title: item.title || "No title available",
            link: item.link || "#",
            pubDate: item.pubDate || new Date().toISOString(),
            category: category,
            image: item.enclosure?.url || "/public/images/default_image2.png",
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

    const posts = feed.items.map((item) => ({
      title: item.title || "No title available",
      link: item.link || "#",
      pubDate: item.pubDate || new Date().toISOString(),
      category: category,
      image: item.enclosure?.url || null,
      description: item.contentSnippet || "",
    }));

    res.json(posts);
  } catch (error) {
    console.error("Error fetching category posts:", error);
    res.status(500).json({ message: "Failed to fetch category posts" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Get connection from pool
    const connection = await pool.getConnection();

    try {
      // Insert into database
      const [result] = await connection.execute(
        "INSERT INTO contact_submissions (name, email, subject, message, submission_date) VALUES (?, ?, ?, ?, NOW())",
        [name, email, subject, message]
      );

      // Release connection back to pool
      connection.release();

      // Return success response
      res.status(201).json({
        message: "Contact form submitted successfully",
        id: result.insertId,
      });
    } catch (dbError) {
      // Release connection on error
      connection.release();
      console.error("Database error:", dbError);
      res.status(500).json({ message: "Database error occurred" });
    }
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Failed to process contact form" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);
});

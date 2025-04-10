// Backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");

const app = express();
const parser = new Parser();

// Configure CORS
app.use(
  cors({
    origin: [
      "https://zedflux-react.vercel.app",
      "https://zedflux-react-cogx17a13-tjiazs-projects.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

// Updated RSS Feed URLs with more reliable sources
const RSS_FEEDS = {
  sports: "https://www.skysports.com/rss/12040",
  politics: "https://feeds.bbci.co.uk/news/politics/rss.xml",
  entertainment: "https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml", // Changed to BBC entertainment
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
            image: item.enclosure?.url || null,
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Environment:", process.env.NODE_ENV);
});

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/axiosConfig";
import { formatDate } from "./utils/dateFormatter";
import defaultImage from "./images/default_image.png";

const RecentBlog = () => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const response = await axiosInstance.get("/latest-posts", {
        timeout: 15000,
      });
      console.log("Latest posts response:", response.data);
      
      // Process the response - ensure it's an object, not array
      let processedPosts = {};
      if (Array.isArray(response.data)) {
        // If it's an array, take first 4 items and convert to object
        const validPosts = response.data
          .filter(post => post && post.title && post.title !== "Content temporarily unavailable")
          .slice(0, 4);
        
        validPosts.forEach((post, index) => {
          processedPosts[post.category || `category-${index}`] = post;
        });
      } else if (typeof response.data === 'object' && response.data !== null) {
        // If it's already an object, filter and limit to 4
        const entries = Object.entries(response.data)
          .filter(([category, post]) => 
            post && 
            post.title && 
            post.title !== "Content temporarily unavailable" &&
            post.pubDate
          )
          .slice(0, 4);
        
        processedPosts = Object.fromEntries(entries);
      }
      
      setLatestPosts(processedPosts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching latest posts:", err);
      setError(
        err.response?.data?.message || err.message || "Failed to fetch posts"
      );
      setLoading(false);
      setLatestPosts({});
    }
  };

  if (loading) {
    return (
      <section>
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Latest News</h2>
            <p>Stay updated with the latest headlines</p>
          </div>
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Latest News</h2>
            <p>Stay updated with the latest headlines</p>
          </div>
          <div className="alert alert-warning text-center" role="alert">
            {error}
          </div>
        </div>
      </section>
    );
  }

  // Get valid posts (max 4)
  // Priority order: technologies, ai-ml, software-dev, digital-innovation, cloud-devops
  const priorityOrder = ['technologies', 'ai-ml', 'software-dev', 'digital-innovation', 'cloud-devops'];
  
  const validPosts = latestPosts 
    ? Object.entries(latestPosts)
        .filter(([category, post]) => 
          post && 
          post.title && 
          post.title !== "Content temporarily unavailable" && 
          post.pubDate
        )
        .sort(([catA], [catB]) => {
          // Sort by priority order
          const indexA = priorityOrder.indexOf(catA);
          const indexB = priorityOrder.indexOf(catB);
          // If not in priority list, put at end
          if (indexA === -1 && indexB === -1) return 0;
          if (indexA === -1) return 1;
          if (indexB === -1) return -1;
          return indexA - indexB;
        })
        .slice(0, 4)
    : [];

  return (
    <section>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Latest News</h2>
          <p>Stay updated with the latest headlines</p>
        </div>

        {validPosts.length === 0 ? (
          <div className="text-center py-5">
            <p>No news available at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="row gy-4">
            {validPosts.map(([category, post]) => {
              // Ensure we have valid data
              if (!post || !post.title || post.title === "Content temporarily unavailable") {
                return null;
              }

              // Get image URL
              let imageUrl = defaultImage;
              if (post.image) {
                if (post.image.startsWith("http")) {
                  imageUrl = post.image;
                } else if (post.image.startsWith("/")) {
                  imageUrl = post.image;
                }
              }

              // Format category name
              const categoryName = category
                .replace(/-/g, " ")
                .replace(/\b\w/g, l => l.toUpperCase());

              return (
                <div key={category} className="col-xl-3 col-md-6">
                  <article>
                    <div className="post-img">
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="img-fluid"
                        onError={(e) => {
                          e.target.src = defaultImage;
                          e.target.onerror = null;
                        }}
                      />
                    </div>

                    <p className="post-category">{categoryName}</p>

                    <h2 className="title">
                      <a
                        href={post.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {post.title}
                      </a>
                    </h2>

                    <div className="d-flex align-items-center">
                      <div className="post-meta">
                        <p className="post-date">
                          {post.pubDate ? formatDate(post.pubDate, category) : "Recently"}
                        </p>
                      </div>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}

        <div className="text-center mt-4">
          <Link
            to="/blog"
            className="btn"
            style={{
              backgroundColor: "#174d90",
              color: "#fff",
              borderRadius: "5px",
            }}
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentBlog;

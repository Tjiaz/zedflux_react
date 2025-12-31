import React, { useState, useEffect } from "react";
import axiosInstance from "./utils/axiosConfig";
import { formatDate } from "./utils/dateFormatter";
import defaultImage from "./images/default_image.png";
import "./index.css";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("technologies");

  useEffect(() => {
    fetchCategoryPosts(activeCategory);
    console.log("posts:", posts);
  }, [activeCategory]);

  const fetchCategoryPosts = async (category) => {
    try {
      setLoading(true);
      setError(null);
      console.log(`Fetching posts for ${category}`);
      
      const response = await axiosInstance.get(`/posts/${category}`, {
        timeout: 15000, // 15 second timeout
      });

      // Validate response.data is an array
      if (!response || !response.data) {
        throw new Error("Invalid response from server");
      }

      let postsData = response.data;
      
      // Handle if response.data is not an array
      if (!Array.isArray(postsData)) {
        console.warn("Response data is not an array:", postsData);
        // If it's an object with a message, it might be an error
        if (postsData.message) {
          throw new Error(postsData.message);
        }
        // If it's an object, try to convert it
        postsData = Object.values(postsData);
        // If still not an array, set to empty array
        if (!Array.isArray(postsData)) {
          postsData = [];
        }
      }

      const processedPosts = postsData
        .filter(post => post && post.title) // Filter out invalid posts
        .map((post) => ({
          ...post,
          image: post.image?.startsWith("http")
            ? post.image
            : post.image?.startsWith("/")
            ? post.image
            : defaultImage,
        }));

      setPosts(processedPosts);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching ${category} posts:`, err);
      const errorMessage =
        err.code === "ECONNABORTED"
          ? "Request timed out. Please try again."
          : err.response?.data?.message || err.message || "Failed to fetch posts. Please try again later.";
      setError(errorMessage);
      setLoading(false);
      setPosts([]);
    }
  };

  // Category display names
  const categoryNames = {
    technologies: "Technologies",
    "ai-ml": "AI & Machine Learning",
    "software-dev": "Software Development",
    "digital-innovation": "Digital Innovation",
    "cloud-devops": "Cloud & DevOps",
  };

  const categories = Object.keys(categoryNames);

  return (
    <main id="main">
      <div className="container">
        <div className="category-tabs m-4">
          {categories.map((category) => (
            <button
              key={category}
              className={`btn ${
                activeCategory === category
                  ? "btn-primary"
                  : "btn-outline-primary"
              } me-2 mb-2`}
              onClick={() => setActiveCategory(category)}
              disabled={loading}
            >
              {categoryNames[category]}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading articles...</p>
          </div>
        )}

        {error && !loading && (
          <div className="alert alert-warning text-center" role="alert">
            <strong>Oops!</strong> {error}
            <button
              className="btn btn-sm btn-primary ms-3"
              onClick={() => fetchCategoryPosts(activeCategory)}
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="alert alert-info text-center" role="alert">
            No articles available for this category. Please try another category.
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="row gy-4 posts-list">
            {posts.map((post, index) => (
            <div key={index} className="col-xl-4 col-md-6">
              <article>
                <div className="post-img">
                  <img
                    src={post.image || defaultImage}
                    alt={post.title}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = defaultImage;
                      e.target.onerror = null;
                    }}
                  />
                </div>

                <p className="post-category">{post.category}</p>

                <h2 className="title">
                  <a href={post.link} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h2>

                <div className="post-meta">
                  <p className="post-date">
                    <time dateTime={post.pubDate}>
                      {formatDate(post.pubDate, post.category)}
                    </time>
                  </p>
                </div>
              </article>
            </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default BlogPage;

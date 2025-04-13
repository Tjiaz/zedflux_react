import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "./utils/dateFormatter";
import defaultImage from "./images/default_image.png";
import "./index.css";

const API_URL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_DEV
    : process.env.REACT_APP_API_URL_PROD;

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("sports");

  useEffect(() => {
    fetchCategoryPosts(activeCategory);
  }, [activeCategory]);

  const fetchCategoryPosts = async (category) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/posts/${category}`);
      setPosts(response.data);
      setLoading(false);
    } catch (err) {
      // Extract error message properly
      setError(
        err.response?.data?.message || err.message || "Failed to fetch posts"
      );
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  // Make sure to render error message as a string
  if (error) return <div>Error: {error}</div>;

  return (
    <main id="main">
      <div className="container">
        <div className="category-tabs mb-4">
          {["sports", "politics", "entertainment", "technologies"].map(
            (category) => (
              <button
                key={category}
                className={`btn ${
                  activeCategory === category
                    ? "btn-primary"
                    : "btn-outline-primary"
                } me-2`}
                onClick={() => setActiveCategory(category)}
              >
                {category.toUpperCase()}
              </button>
            )
          )}
        </div>

        <div className="row gy-4 posts-list">
          {posts.map((post, index) => (
            <div key={index} className="col-xl-4 col-md-6">
              <article>
                <div className="post-img">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="img-fluid"
                    onError={(e) => {
                      e.target.src = `${API_URL}/public/images/default_image2.png`; // Backend default image path
                      e.target.onerror = null; // Prevent infinite loop
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
      </div>
    </main>
  );
};

export default BlogPage;

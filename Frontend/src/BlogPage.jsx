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
    console.log("posts:", posts);
  }, [activeCategory]);

  const fetchCategoryPosts = async (category) => {
    try {
      setLoading(true);
      console.log(`Fetching posts for ${category}`); // Debug log
      const response = await axios.get(`${API_URL}/api/posts/${category}`);
      console.log(`${category} posts response:`, response.data); // Debug response

      const processedPosts = response.data.map((post) => ({
        ...post,
        image: post.image?.startsWith("http")
          ? post.image
          : `${API_URL}${post.image.startsWith("/") ? "" : "/"}${post.image}`,
      }));

      setPosts(processedPosts);
      setLoading(false);
    } catch (err) {
      console.error(`Error fetching ${category} posts:`, err); // Detailed error log
      setError(
        err.response?.data?.message || err.message || "Failed to fetch posts"
      );
      setLoading(false);
      setPosts([]); // Explicitly set empty array on error
    }
  };

  console.log(fetchCategoryPosts);

  if (loading) return <div>Loading...</div>;
  // Make sure to render error message as a string
  if (error) return <div>Error: {error}</div>;

  return (
    <main id="main">
      <div className="container">
        <div className="category-tabs m-4">
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
      </div>
    </main>
  );
};

export default BlogPage;

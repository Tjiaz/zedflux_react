import React, { useState, useEffect } from "react";
import axios from "axios";
import { formatDate } from "./utils/dateFormatter";
import defaultImage from "./images/default_image.png";

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
      const response = await axios.get(
        `http://localhost:5000/api/posts/${category}`
      );
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

    const handleImageError = (e) => {
      e.target.src = defaultImage;
      e.target.onerror = null;
    };

  if (loading) return <div>Loading...</div>;
  // Make sure to render error message as a string
  if (error) return <div>Error: {error}</div>;

  return (
    <main id="main">
      <div className="container">
        <div className="category-tabs mb-4">
          {["sports", "politics", "entertainment"].map((category) => (
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
          ))}
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
                    onError={handleImageError}
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
                      {new Date(post.pubDate).toLocaleDateString()}
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

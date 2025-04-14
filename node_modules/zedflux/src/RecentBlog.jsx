import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { formatDate } from "./utils/dateFormatter";

const RecentBlog = () => {
  const [latestPosts, setLatestPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_URL_DEV
      : process.env.REACT_APP_API_URL_PROD;

  useEffect(() => {
    fetchLatestPosts();
  }, []);

  const fetchLatestPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/latest-posts`);
      console.log("Latest posts response:", response.data); // Debugging line
      setLatestPosts(response.data);
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
    <section>
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Latest News</h2>
          <p>Stay updated with the latest headlines</p>
        </div>

        <div className="row gy-4">
          {latestPosts &&
            Object.entries(latestPosts).map(([category, post]) => (
              <div key={category} className="col-xl-3 col-md-6">
                <article>
                  <div className="post-img">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-fluid"
                      onError={(e) => {
                        e.target.src = `${API_URL}/public/images/default_image2.png`; // Add your default image path
                      }}
                    />
                  </div>

                  <p className="post-category">{category}</p>

                  <h2 className="title">
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {post.title}
                    </a>
                  </h2>

                  <div className="d-flex align-items-center">
                    <div className="post-meta">
                      <p className="post-date">
                        {formatDate(post.pubDate, category)}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            ))}
        </div>

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

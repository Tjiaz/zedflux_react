import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./blog.css";

const defaultImage = "/images/default_image.png";

const RecentBlog = () => {
  // Latest blog articles matching BlogPage structure
  const latestArticles = [
    {
      id: 1,
      title: "Top 11 AI Tools to Enhance Employee Productivity",
      category: "ai",
      image: "/blog/banner1.png",
      slug: "top-11-ai-tools-enhance-employee-productivity",
      date: "2025-01-15",
      readTime: "30 min read",
    },
    {
      id: 2,
      title: "What is API Integration: How Does It Work in Your Business",
      category: "analytics",
      image: "/blog/API/how_does_api_work.png",
      slug: "api-integration-how-does-it-work-business",
      date: "2026-01-14",
      readTime: "12 min read",
    },
    {
      id: 3,
      title: "ERP Modernization: A Practical Guide for Leaders",
      category: "transformation",
      image: "/blog/Transformation/ERP.png",
      slug: "erp-modernization-practical-guide-leaders",
      date: "2026-01-13",
      readTime: "15 min read",
    },
    {
      id: 4,
      title: "What is Middleware, and Why Does Your Business Require It",
      category: "transformation",
      image: "/blog/Transformation/middleware.png",
      slug: "middleware-why-business-require",
      date: "2026-01-12",
      readTime: "10 min read",
    },
    {
      id: 5,
      title: "Key Digital Transformation Challenges Organizations Face in 2026",
      category: "transformation",
      image: "/blog/Transformation/top.png",
      slug: "top-digital-transformation-challenges-businesses-2026",
      date: "2026-02-20",
      readTime: "22 min read",
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const getCategoryName = (category) => {
    const categoryMap = {
      ai: "AI",
      transformation: "Transformation",
      analytics: "Analytics",
      trends: "Trends",
      design: "Design",
    };
    return categoryMap[category] || category;
  };

  return (
    <section className="recent-blog-section" style={{ padding: "80px 0", background: "#ffffff" }}>
      <Container>
        <div className="section-header-modern">
          <h2 className="section-title-modern">Latest Insights</h2>
          <p className="section-subtitle-modern">
            Stay updated with the latest trends, insights, and innovations
          </p>
        </div>

        <div className="blog-articles-grid">
          {latestArticles.map((article) => (
            <article key={article.id} className="blog-article-card">
              <Link to={`/blog/${article.slug}`} className="article-link">
                <div className="article-image-wrapper">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="article-image"
                    onError={(e) => {
                      e.target.src = defaultImage;
                      e.target.onerror = null;
                    }}
                  />
                </div>
                <div className="article-content">
                  <span className="article-category">{getCategoryName(article.category)}</span>
                  <h3 className="article-title">{article.title}</h3>
                  <div className="article-meta">
                    <span className="article-date">{formatDate(article.date)}</span>
                    <span className="article-read-time">{article.readTime}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="text-center mt-5">
          <Link to="/blog" className="btn-explore-blog">
            Explore All Articles
            <i className="bi bi-arrow-right ms-2"></i>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default RecentBlog;

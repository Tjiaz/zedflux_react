import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "./blog.css";

const defaultImage = "/images/default_image.png";

const BlogPage = () => {
  const { category: urlCategory } = useParams();
  const [activeCategory, setActiveCategory] = useState(urlCategory || "all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;

  // Update active category when URL changes
  useEffect(() => {
    if (urlCategory) {
      setActiveCategory(urlCategory);
    } else {
      setActiveCategory("all");
    }
    setCurrentPage(1);
  }, [urlCategory]);

  // Blog categories
  const categories = [
    { id: "all", name: "All" },
    { id: "ai", name: "AI" },
    { id: "transformation", name: "Transformation" },
    { id: "analytics", name: "Analytics" },
    { id: "trends", name: "Trends" },
    { id: "design", name: "Design" },
  ];

  // Format date for display
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

  // Get category display name
  const getCategoryName = (category) => {
    const categoryMap = {
      ai: "AI",
      transformation: "Transformation",
      analytics: "Analytics",
      trends: "Trends",
      design: "Design",
    };
    return categoryMap[category] || category.toUpperCase();
  };

  // Sample blog articles - 2 pages worth (24 articles)
  const allArticles = [
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
      title: "Top AI Agent Development Companies 2026 for Custom Enterprise Solutions",
      category: "ai",
      image: "/blog/AI/top10.png",
      slug: "top-ai-agent-development-companies-2026",
      date: "2026-01-11",
      readTime: "18 min read",
    },
    {
      id: 25,
      title: "Top 5 AI Tools: The Essential Tools to Forge Ahead in a Data-Driven Future",
      category: "ai",
      image: "/blog/AI/top5.png",
      slug: "top-5-ai-tools-essential-tools-data-driven-future",
      date: "2026-01-20",
      readTime: "8 min read",
    },
    {
      id: 26,
      title: "Top 5 AI Tools: The Essential Tools to Forge Ahead in a Data-Driven Future",
      category: "trends",
      image: "/blog/AI/top5.png",
      slug: "top-5-ai-tools-essential-tools-data-driven-future",
      date: "2026-01-20",
      readTime: "8 min read",
    },
    {
      id: 6,
      title: "How to Modernize Tech Stack Without Disrupting Daily Operations",
      category: "trends",
      image: "/blog/Transformation/tech_stack.png",
      slug: "modernize-tech-stack-without-disrupting-operations",
      date: "2026-01-10",
      readTime: "14 min read",
    },
    {
      id: 27,
      title: "How to Modernize Tech Stack Without Disrupting Daily Operations",
      category: "transformation",
      image: "/blog/Transformation/tech_stack.png",
      slug: "modernize-tech-stack-without-disrupting-operations",
      date: "2026-01-10",
      readTime: "14 min read",
    },
    {
      id: 7,
      title: "10 Leading AI Retail Success Stories Driving Growth and Operational Excellence",
      category: "ai",
      image: "/blog/AI/retail.png",
      slug: "10-leading-ai-retail-success-stories",
      date: "2026-01-09",
      readTime: "20 min read",
    },
    {
      id: 28,
      title: "10 Leading AI Retail Success Stories Driving Growth and Operational Excellence",
      category: "trends",
      image: "/blog/AI/retail.png",
      slug: "10-leading-ai-retail-success-stories",
      date: "2026-01-09",
      readTime: "20 min read",
    },
    {
      id: 8,
      title: "How to Prioritize Which Systems to Integrate First (When Everything Feels Urgent)",
      category: "transformation",
      image: defaultImage,
      slug: "prioritize-systems-integrate-first",
      date: "2025-01-08",
      readTime: "11 min read",
    },
    {
      id: 9,
      title: "What System Integration Means and the Best Approaches in 2025",
      category: "analytics",
      image: defaultImage,
      slug: "system-integration-best-approaches-2025",
      date: "2025-01-07",
      readTime: "13 min read",
    },
    {
      id: 10,
      title: "The Top Digital Transformation Challenges Businesses are Facing in 2025",
      category: "trends",
      image: defaultImage,
      slug: "digital-transformation-challenges-2025",
      date: "2025-01-06",
      readTime: "16 min read",
    },
    {
      id: 11,
      title: "Legacy System Modernization Explained: Approaches, Benefits, and Considerations",
      category: "transformation",
      image: defaultImage,
      slug: "legacy-system-modernization-explained",
      date: "2025-01-05",
      readTime: "19 min read",
    },
    {
      id: 12,
      title: "Top Digital Transformation Trends for 2025",
      category: "trends",
      image: defaultImage,
      slug: "digital-transformation-trends-2025",
      date: "2025-01-04",
      readTime: "17 min read",
    },
    {
      id: 13,
      title: "Generative AI for Retail is Driving Profits Like Never Before",
      category: "ai",
      image: defaultImage,
      slug: "generative-ai-retail-driving-profits",
      date: "2025-01-03",
      readTime: "15 min read",
    },
    {
      id: 14,
      title: "Why Customer Experience Transformation is a Must in 2025",
      category: "design",
      image: defaultImage,
      slug: "customer-experience-transformation-2025",
      date: "2025-01-02",
      readTime: "12 min read",
    },
    {
      id: 15,
      title: "The Role of Generative AI In Transforming Your Business",
      category: "ai",
      image: defaultImage,
      slug: "role-generative-ai-transforming-business",
      date: "2025-01-01",
      readTime: "14 min read",
    },
    {
      id: 16,
      title: "Design Systems: Building Consistency Across Digital Platforms",
      category: "design",
      image: "/blog/design/1.png",
      slug: "design-systems-building-consistency",
      date: "2025-05-01",
      readTime: "18 min read",
    },
    {
      id: 17,
      title: "Data Analytics Best Practices for Modern Enterprises",
      category: "analytics",
      image: defaultImage,
      slug: "data-analytics-best-practices-enterprises",
      date: "2024-12-29",
      readTime: "16 min read",
    },
    {
      id: 18,
      title: "The Future of User Interface Design: Trends and Predictions",
      category: "design",
      image: defaultImage,
      slug: "future-user-interface-design-trends",
      date: "2024-12-28",
      readTime: "13 min read",
    },
    {
      id: 19,
      title: "Machine Learning in Business: Real-World Applications and Case Studies",
      category: "ai",
      image: defaultImage,
      slug: "machine-learning-business-applications",
      date: "2024-12-27",
      readTime: "20 min read",
    },
    {
      id: 20,
      title: "Building Scalable Analytics Infrastructure",
      category: "analytics",
      image: defaultImage,
      slug: "building-scalable-analytics-infrastructure",
      date: "2024-12-23",
      readTime: "17 min read",
    },
    {
      id: 21,
      title: "Design Thinking for Product Innovation",
      category: "design",
      image: defaultImage,
      slug: "design-thinking-product-innovation",
      date: "2024-12-22",
      readTime: "15 min read",
    },
    {
      id: 22,
      title: "Enterprise Architecture: Strategies for Digital Transformation",
      category: "transformation",
      image: defaultImage,
      slug: "enterprise-architecture-digital-transformation",
      date: "2024-12-21",
      readTime: "19 min read",
    },
    {
      id: 23,
      title: "The Impact of AI on Business Strategy and Decision Making",
      category: "ai",
      image: defaultImage,
      slug: "ai-impact-business-strategy",
      date: "2024-12-20",
      readTime: "16 min read",
    },
    {
      id: 24,
      title: "User Experience Design Principles for Modern Applications",
      category: "design",
      image: defaultImage,
      slug: "ux-design-principles-modern-apps",
      date: "2024-12-19",
      readTime: "14 min read",
    },
  ];

  // Filter articles by category
  const filteredArticles =
    activeCategory === "all"
      ? allArticles
      : allArticles.filter((article) => article.category === activeCategory);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <Container>
          <h1>Think. Create. Deliver.</h1>
        </Container>
      </section>

      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <nav>
          <Container>
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>Blog</li>
              {activeCategory !== "all" && (
                <li style={{ textTransform: "capitalize" }}>{activeCategory}</li>
              )}
            </ol>
          </Container>
        </nav>
      </div>

      {/* Blog Categories */}
      <div className="blog-categories">
        <Container>
          <div className="category-tabs">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.id === "all" ? "/blog" : `/blog/category/${category.id}`}
                className={`category-tab ${
                  activeCategory === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      <Container className="blog-container">
        {/* Latest Insights Section */}
        <section className="latest-insights-section">
          <h2 className="latest-insights-title">Latest Insights</h2>

          {/* Article Grid */}
          <div className="articles-grid">
            <Row>
              {currentArticles.length > 0 ? (
                currentArticles.map((article) => (
                  <Col md={6} key={article.id} className="article-col">
                    <Link to={`/blog/${article.slug}`} className="article-card">
                      <div className="article-image">
                        <img src={article.image} alt={article.title} />
                      </div>
                      <div className="article-meta">
                        <span className="article-category">{getCategoryName(article.category)}</span>
                        <span className="article-separator">•</span>
                        <span className="article-read-time">{article.readTime}</span>
                        <span className="article-separator">•</span>
                        <span className="article-date">{formatDate(article.date)}</span>
                      </div>
                      <h3 className="article-title">{article.title}</h3>
                    </Link>
                  </Col>
                ))
              ) : (
                <Col md={12}>
                  <p className="no-articles">No articles found in this category.</p>
                </Col>
              )}
            </Row>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                if (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                ) {
                  return (
                    <button
                      key={page}
                      className={`pagination-btn ${currentPage === page ? "active" : ""}`}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  );
                } else if (
                  page === currentPage - 3 ||
                  page === currentPage + 3
                ) {
                  return (
                    <span key={page} className="pagination-ellipsis">
                      ...
                    </span>
                  );
                }
                return null;
              })}
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                →
              </button>
            </div>
          )}
        </section>
      </Container>
    </div>
  );
};

export default BlogPage;

import React from "react";
import "./portfolio.css";
import SuccessStoryCard from "./SuccessStoryCard";
import ServicePill from "./ServicePill";
import diamond from "../images/diamond.webp";

const PortfolioPage = () => {
  const successStories = [
    {
      title: "Revolutionizing eCommerce",
      image: diamond,
      description:
        "Unifying systems and enhancing customer experiences for Diamonds Direct",
      services: ["AI/ML", "TRANSFORMATION", "MODERNIZATION"],
      team: [
        "Thomas Riberio",
        "Sihye Ryu",
        "Ricairis Tejada",
        "Viraj Upadhyay",
      ],
    },
    {
      title: "Bespoke B2B Sales Portal",
      image: diamond,
      description:
        "Transforming sales through a custom-built sales portal and ERP integration",
      services: ["DESIGN", "DEVOPS", "INNOVATION"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Automated Invoice Processing",
      image: diamond,
      description: "Reducing manual tasks with machine learning models",
      services: ["AI/ML", "TRANSFORMATION", "INNOVATION"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Sales Efficiency and Engagement",
      image: diamond,
      description: "Re-imagining cold outreach through Design Sprint",
      services: ["INNOVATION", "DESIGN", "STRATEGY"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "AI-Powered Personalization",
      image: diamond,
      description: "Enhancing eCommerce experiences",
      services: ["STRATEGY", "AI/ML", "STRATEGY"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Data Platform for Real-time insights",
      image: diamond,
      description: "Enabling data-backed decisions",
      services: ["INNOVATION", "ANALYTICS"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },

    // Add other success stories similarly
  ];
  const featuredItems = [
    {
      title: "Enterprise Risk Management Platform",
      services: ["BUSINESS RESILIENCE", "BUSINESS CONTINUITY"],
    },
    // Add other featured items
  ];

  return (
    <div className="portfolio-container">
      <section className="hero-section">
        <h1>Success Stories</h1>
        <p>
          Discover how we've helped businesses like yours reach their full
          potential
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Q Search" />
        </div>
      </section>

      <section className="success-stories-grid">
        {successStories.map((story, index) => (
          <SuccessStoryCard key={index} story={story} />
        ))}
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <h2>Let's talk business</h2>
        <div className="featured-items">
          {featuredItems.map((item, index) => (
            <div key={index} className="featured-card">
              <h3>{item.title}</h3>
              <div className="service-pills">
                {item.services.map((service, i) => (
                  <ServicePill key={i} service={service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;

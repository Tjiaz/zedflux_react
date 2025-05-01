import React, { useState, useEffect } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import mobilee from "./images/zedflux.webp";
import mobile from "./images/zede.png";
import digital from "./images/digital.webp";

import { fetchData } from "./services_request/api";

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const caseStudies = [
    {
      id: 1,
      title: "GROCERY APP",
      subtitle: "A fresh take on online grocery shopping",
      description:
        "How we helped Harris Teeter transform legacy systems, leverage analytics and deliver personalized omnichannel experiences for millions of shoppers?",
      bgColor: "#f5f5f5",
      textColor: "#333",
      image: mobile,
      path: "/case-studies/grocery-app",
    },
    {
      id: 2,
      title: "SALESMATE",
      subtitle: "A unified customer experience platform",
      description:
        "How we turn an idea of automating sales and customer relationships into a multi-million-dollar revenue sales operating system with thousands of customers?",
      bgColor: "#e8f4fc",
      textColor: "#1a3e72",
      image: mobilee,
      path: "/case-studies/salesmate",
    },
    {
      id: 3,
      title: "DIGITAL TRANSFORMATION",
      subtitle: "Transforming mfg. giant with digital and data",
      description:
        "How we unlocked massive savings and operational automation for a manufacturing and distribution enterprise?",
      bgColor: "#f0e6ff",
      textColor: "#4a1b9d",
      image: digital,
      path: "/case-studies/digital-transformation",
    },
  ];

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const currentCaseStudy = caseStudies[activeIndex];

  return (
    <section
      id="portfolio"
      className="portfolio sections-bg"
      style={{
        backgroundColor: currentCaseStudy.bgColor,
        transition: "background-color 0.5s ease",
      }}
    >
      <div
        className="case-study-carousel"
        style={{
          backgroundColor: currentCaseStudy.bgColor,
          color: currentCaseStudy.textColor,
        }}
      >
        <div className="case-study-container">
          <div className="case-study-content">
            <h1>{currentCaseStudy.title}</h1>
            <h2>{currentCaseStudy.subtitle}</h2>
            <p>{currentCaseStudy.description}</p>
            <Link to={currentCaseStudy.path} className="case-study-link">
              Discover More
            </Link>
          </div>
          <div className="case-study-image">
            <img
              src={currentCaseStudy.image}
              alt={`${currentCaseStudy.title} case study`}
            />
          </div>
        </div>
        <div className="carousel-dots">
          {caseStudies.map((study, index) => (
            <button
              key={study.id}
              className={`dot ${index === activeIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to case study ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;

import React from "react";
import ServiceItem from "./ServiceItem"; // Import the ServiceItem component
import { BrowserRouter, NavLink } from "react-router-dom";


const Services = () => {
 

  const serviceItems = [
    {
      icon: "bi bi-laptop",
      title: "Digital Transformation",
      description:
        "We provide end-to-end solutions including mobile app development, game development, website creation, app testing, and ongoing maintenance to drive your digital growth.",
    },
    {
      icon: "bi bi-bar-chart",
      title: "Data Analytics & AI",
      description:
        "Leverage advanced data analytics and AI-driven insights to make informed decisions and enhance your business performance.",
    },
    {
      icon: "bi bi-chat-square-text",
      title: "Business Intelligence",
      description:
        "Our team of experts delivers high-quality Android and iOS game development tailored to your business needs.",
    },
  ];

  return (
    <section id="services" className="services sections-bg">
      <div className="container" data-aos="fade-up">
        <div
          className="section-header"
          style={{
            backgroundColor: "var(--primary-color)",
            padding: "20px",
            textAlign: "left",
          }}
        >
          <h4
            style={{
              color: "var(--primary-color)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            What Can We Do For You
          </h4>
          <hr></hr>
        </div>

        <div className="row gy-4" data-aos="fade-up" data-aos-delay="100">
          {serviceItems.map((item, index) => (
            <ServiceItem
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
        <div>
          <NavLink
            to="/services"
            className="btn"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              padding: "8px 16px",
              marginTop: "20px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "var(--color-secondary)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "var(--color-primary)";
            }}
          >
            Explore all services
            <i
              className="bi bi-arrow-right"
              style={{
                marginLeft: "10px",
              }}
            ></i>
          </NavLink>
        </div>
      </div>
      
    </section>
  );
};

export default Services;

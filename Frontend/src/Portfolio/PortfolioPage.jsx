import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./portfolio.css";
import SuccessStoryCard from "./SuccessStoryCard";
import ServicePill from "./ServicePill";
import diamond from "../images/diamond.webp";
import axiosInstance from "../utils/axiosConfig";

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
      video: "/porfolio/cadence-cover.mp4",
      description:
        "Transforming sales through a custom-built sales portal and ERP integration",
      services: ["DESIGN", "DEVOPS", "INNOVATION"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Automated Invoice Processing",
      video: "/porfolio/automated-invoice.mp4",
      description: "Reducing manual tasks with machine learning models",
      services: ["AI/ML", "TRANSFORMATION", "INNOVATION"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Sales Efficiency and Engagement",
      video: "/porfolio/sale_efficiency.mp4",
      description: "Re-imagining cold outreach through Design Sprint",
      services: ["INNOVATION", "DESIGN", "STRATEGY"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "AI-Powered Personalization",
      video: "/porfolio/AI-Powered.mp4",
      description: "Enhancing eCommerce experiences",
      services: ["STRATEGY", "AI/ML", "STRATEGY"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },
    {
      title: "Data Platform for Real-time insights",
      video: "/porfolio/Data.mp4",
      description: "Enabling data-backed decisions",
      services: ["INNOVATION", "ANALYTICS"],
      team: ["Maryam Ghafoori", "Jingya Wang"],
    },

    // Add other success stories similarly
  ];
  const [contactFormData, setContactFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    message: "",
  });
  const [contactFormStatus, setContactFormStatus] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });

  const handleContactFormChange = (e) => {
    setContactFormData({ ...contactFormData, [e.target.name]: e.target.value });
    if (contactFormStatus.error) {
      setContactFormStatus({ ...contactFormStatus, error: false, message: "" });
    }
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    setContactFormStatus({ loading: true, error: false, success: false, message: "" });

    try {
      const response = await axiosInstance.post("/contact", {
        name: contactFormData.fullName.trim(),
        email: contactFormData.email.trim(),
        phone: contactFormData.phone.trim(),
        company: contactFormData.company.trim(),
        role: contactFormData.role.trim(),
        subject: "Portfolio Page Inquiry",
        message: contactFormData.message.trim(),
      });

      setContactFormStatus({
        loading: false,
        error: false,
        success: true,
        message: response.data.message || "Thank you! We'll be in touch soon.",
      });

      setContactFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        role: "",
        message: "",
      });

      setTimeout(() => {
        setContactFormStatus({ ...contactFormStatus, success: false, message: "" });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.";
      setContactFormStatus({
        loading: false,
        error: true,
        success: false,
        message: errorMessage,
      });
    }
  };

  return (
    <div className="portfolio-container">
      <section className="hero-section">
        <h1>Success Stories</h1>
        <p>
          Discover how we've helped businesses like yours reach their full
          potential
        </p>
        <div className="search-bar">
          <input type="text" placeholder="Search success stories..." />
        </div>
      </section>

      <section className="success-stories-grid">
        {successStories.map((story, index) => (
          <SuccessStoryCard key={index} story={story} />
        ))}
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="contact-form-wrapper">
          <div className="contact-form-left">
            <h2>Let's find out what we can do for you!</h2>
            <p>Tell us about your needs</p>
          </div>
          <div className="contact-form-right">
            <form className="portfolio-contact-form" onSubmit={handleContactFormSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name *"
                  value={contactFormData.fullName}
                  onChange={handleContactFormChange}
                  required
                  disabled={contactFormStatus.loading}
                />
              </div>
              <div className="form-group">
                <div className="email-phone-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={contactFormData.email}
                    onChange={handleContactFormChange}
                    required
                    disabled={contactFormStatus.loading}
                    className="email-input"
                  />
                  <div className="phone-code">
                    <span>+1</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="company"
                  placeholder="Company *"
                  value={contactFormData.company}
                  onChange={handleContactFormChange}
                  required
                  disabled={contactFormStatus.loading}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={contactFormData.role}
                  onChange={handleContactFormChange}
                  disabled={contactFormStatus.loading}
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="How can we help? *"
                  value={contactFormData.message}
                  onChange={handleContactFormChange}
                  required
                  disabled={contactFormStatus.loading}
                  rows="4"
                />
              </div>
              {contactFormStatus.loading && (
                <div className="form-status loading">Submitting...</div>
              )}
              {contactFormStatus.error && (
                <div className="form-status error">{contactFormStatus.message}</div>
              )}
              {contactFormStatus.success && (
                <div className="form-status success">{contactFormStatus.message}</div>
              )}
              <button type="submit" className="submit-btn" disabled={contactFormStatus.loading}>
                {contactFormStatus.loading ? "Submitting..." : "Submit →"}
              </button>
              <p className="privacy-disclaimer">
                By clicking submit button, you agree to our{" "}
                <Link to="/cookies" className="privacy-link">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CookieConsent.css";

const CookieConsent = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("TERMLY_COOKIE_CONSENT");
    if (!consent) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    const consentData = {
      essential: true,
      performance: true,
      analytics: true,
      advertising: true,
      social: true,
      uncategorized: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    setShowModal(false);
  };

  const handleDecline = () => {
    const consentData = {
      essential: true, // Essential cookies are always required
      performance: false,
      analytics: false,
      advertising: false,
      social: false,
      uncategorized: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    setShowModal(false);
  };

  const handlePreferences = () => {
    setShowModal(false);
    navigate("/cookie-preferences");
  };

  if (!showModal) return null;

  return (
    <div className="cookie-consent-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) {
        // Don't close on overlay click - user must make a choice
      }
    }}>
      <div className="cookie-consent-modal">
        <div className="cookie-consent-content">
          <h3>Cookie Consent</h3>
          <p>
            We use essential cookies to ensure our website functions properly. 
            With your permission, we may also use additional cookies to enhance 
            your experience, tailor content, customize advertisements, and analyze 
            website traffic. For these purposes, we may share your website usage 
            data with our social media, advertising, and analytics partners.
          </p>
          <p>
            By clicking "Accept," you consent to our website's use of cookies as 
            outlined in our <Link to="/cookies" className="cookie-policy-link">Cookie Policy</Link>. 
            You can modify your cookie preferences at any time by clicking "Preferences."
          </p>
        </div>
        <div className="cookie-consent-buttons">
          <button className="btn-cookie btn-preferences" onClick={handlePreferences}>
            Preferences
          </button>
          <button className="btn-cookie btn-decline" onClick={handleDecline}>
            Decline
          </button>
          <button className="btn-cookie btn-accept" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;


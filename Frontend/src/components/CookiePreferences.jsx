import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CookieConsent.css";

const CookiePreferences = () => {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    performance: true,
    analytics: true,
    advertising: true,
    social: true,
    uncategorized: true,
  });

  useEffect(() => {
    // Load existing preferences
    const saved = localStorage.getItem("TERMLY_COOKIE_CONSENT");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          essential: true, // Always enabled
          performance: parsed.performance ?? true,
          analytics: parsed.analytics ?? true,
          advertising: parsed.advertising ?? true,
          social: parsed.social ?? true,
          uncategorized: parsed.uncategorized ?? true,
        });
      } catch (e) {
        console.error("Error parsing cookie consent:", e);
      }
    }
  }, []);

  const handleToggle = (key) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    navigate("/");
  };

  const cookieCategories = [
    {
      key: "essential",
      title: "Essential Cookies",
      count: "8",
      description: "These cookies are necessary to the core functionality of our website and some of its features, such as access to secure areas.",
      required: true,
    },
    {
      key: "performance",
      title: "Performance and Functionality Cookies",
      description: "These cookies are used to enhance the performance and functionality of our websites but are nonessential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.",
      required: false,
    },
    {
      key: "analytics",
      title: "Analytics Cookies",
      description: "These cookies collect information that can help us understand how our websites are being used. This information can also be used to measure effectiveness in our marketing campaigns or to curate a personalized site experience for you.",
      required: false,
    },
    {
      key: "advertising",
      title: "Advertising Cookies",
      description: "These cookies are used to make advertising messages more relevant to you. They prevent the same ad from continuously reappearing, ensure that ads are properly displayed for advertisers, and in some cases select advertisements that are based on your interests.",
      required: false,
    },
    {
      key: "social",
      title: "Social Media Cookies",
      description: "These cookies enable you to share our website's content through third-party social networks and other websites. These cookies may also be used for advertising purposes.",
      required: false,
    },
    {
      key: "uncategorized",
      title: "Uncategorized Cookies",
      description: "These are cookies that have not yet been categorized. We are in the process of classifying these cookies with the help of their providers.",
      required: false,
    },
  ];

  return (
    <div className="cookie-preferences-page">
      <div className="container">
        <div className="cookie-preferences-content">
          <h1>Cookie Preferences</h1>
          <p className="preferences-intro">
            We use different types of cookies to optimize your experience on our website. 
            Click on the categories below to learn more about their purposes. You may choose 
            which types of cookies to allow and can change your preferences at any time. The 
            choices you make regarding the Purposes and Vendors listed in this notice are saved 
            in local storage under the key TERMLY_COOKIE_CONSENT for a maximum duration of 12 months. 
            Remember that disabling cookies may affect your experience on the website. You can learn 
            more about how we use cookies by visiting our <Link to="/cookies" className="cookie-policy-link">Cookie Policy</Link>.
          </p>

          <div className="cookie-categories">
            {cookieCategories.map((category) => (
              <div key={category.key} className="cookie-category-item">
                <div className="cookie-category-header">
                  <label className="cookie-checkbox-label">
                    <input
                      type="checkbox"
                      checked={preferences[category.key]}
                      onChange={() => handleToggle(category.key)}
                      disabled={category.required}
                      className="cookie-checkbox"
                    />
                    <span className="cookie-checkmark"></span>
                    <span className="cookie-category-title">
                      {category.title}
                      {category.count && <span className="cookie-count">({category.count})</span>}
                    </span>
                  </label>
                  {category.required && (
                    <span className="cookie-required-badge">Required</span>
                  )}
                </div>
                <p className="cookie-category-description">{category.description}</p>
                <button className="cookie-details-btn">Details</button>
              </div>
            ))}
          </div>

          <div className="cookie-preferences-actions">
            <button className="btn-cookie btn-save" onClick={handleSave}>
              Save Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookieConsent.css";

const CookiePreferences = ({ isOpen, onClose, onSave }) => {
  const [preferences, setPreferences] = useState({
    essential: true, // Always true, cannot be disabled
    performance: true,
    analytics: true,
    advertising: true,
    social: true,
    uncategorized: true,
  });
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  }, [isOpen]);

  const handleToggle = (key) => {
    if (key === "essential") return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAllowAll = () => {
    const allEnabled = {
      essential: true,
      performance: true,
      analytics: true,
      advertising: true,
      social: true,
      uncategorized: true,
    };
    setPreferences(allEnabled);
    const consentData = {
      ...allEnabled,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    if (onSave) onSave();
    onClose();
  };

  const handleDeclineAll = () => {
    const essentialOnly = {
      essential: true,
      performance: false,
      analytics: false,
      advertising: false,
      social: false,
      uncategorized: false,
    };
    setPreferences(essentialOnly);
    const consentData = {
      ...essentialOnly,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    if (onSave) onSave();
    onClose();
  };

  const handleSave = () => {
    const consentData = {
      ...preferences,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("TERMLY_COOKIE_CONSENT", JSON.stringify(consentData));
    if (onSave) onSave();
    onClose();
  };

  const cookieCategories = [
    {
      key: "essential",
      title: "Essential Cookies",
      count: "8",
      description:
        "These cookies are necessary to the core functionality of our website and some of its features, such as access to secure areas.",
      required: true,
      cookies: [
        {
          provider: ".zedfluxtechnologies.com",
          name: "session_id",
          purpose: "Maintains user session",
          type: "server_cookie",
          expires: "Session",
        },
        {
          provider: ".zedfluxtechnologies.com",
          name: "csrf_token",
          purpose: "Security token",
          type: "server_cookie",
          expires: "Session",
        },
      ],
    },
    {
      key: "performance",
      title: "Performance and Functionality Cookies",
      description:
        "These cookies are used to enhance the performance and functionality of our websites but are nonessential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.",
      required: false,
      cookies: [
        {
          provider: ".zedfluxtechnologies.com",
          name: "performance_tracking",
          purpose: "Track page load performance",
          type: "server_cookie",
          expires: "1 year",
        },
      ],
    },
    {
      key: "analytics",
      title: "Analytics Cookies",
      description:
        "These cookies collect information that can help us understand how our websites are being used. This information can also be used to measure effectiveness in our marketing campaigns or to curate a personalized site experience for you.",
      required: false,
      cookies: [
        {
          provider: ".google-analytics.com",
          name: "_ga",
          purpose: "Distinguish users",
          type: "server_cookie",
          expires: "2 years",
        },
        {
          provider: ".google-analytics.com",
          name: "_gid",
          purpose: "Distinguish users",
          type: "server_cookie",
          expires: "24 hours",
        },
      ],
    },
    {
      key: "advertising",
      title: "Advertising Cookies",
      count: "4",
      description:
        "These cookies are used to make advertising messages more relevant to you. They prevent the same ad from continuously reappearing, ensure that ads are properly displayed for advertisers, and in some cases select advertisements that are based on your interests.",
      required: false,
      cookies: [
        {
          provider: ".c.bing.com",
          name: "SRM_B",
          purpose: "Advertising tracking",
          type: "server_cookie",
          expires: "1 year 24 days",
          privacyPolicy: "https://privacy.microsoft.com/en-us/privacystatement",
        },
        {
          provider: ".c.clarity.ms",
          name: "ANONCHK",
          purpose: "Analytics and advertising",
          type: "server_cookie",
          expires: "10 minutes",
          privacyPolicy: "https://clarity.microsoft.com/terms",
        },
        {
          provider: ".youtube.com",
          name: "YSC",
          purpose: "Video preferences",
          type: "server_cookie",
          expires: "Session",
          privacyPolicy: "https://policies.google.com/privacy",
        },
        {
          provider: ".youtube.com",
          name: "VISITOR_INFO1_LIVE",
          purpose: "Video preferences",
          type: "server_cookie",
          expires: "5 months 27 days",
          privacyPolicy: "https://policies.google.com/privacy",
        },
      ],
    },
    {
      key: "social",
      title: "Social Media Cookies",
      description:
        "These cookies enable you to share our website's content through third-party social networks and other websites. These cookies may also be used for advertising purposes.",
      required: false,
      cookies: [
        {
          provider: ".facebook.com",
          name: "fr",
          purpose: "Social sharing",
          type: "server_cookie",
          expires: "3 months",
          privacyPolicy: "https://www.facebook.com/privacy/explanation",
        },
      ],
    },
    {
      key: "uncategorized",
      title: "Uncategorized Cookies",
      description:
        "These are cookies that have not yet been categorized. We are in the process of classifying these cookies with the help of their providers.",
      required: false,
      cookies: [],
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="cookie-consent-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          // Allow closing by clicking overlay, but save current preferences
          handleSave();
        }
      }}
    >
      <div className="cookie-preferences-modal">
        <div className="cookie-preferences-content">
          {!selectedCategory ? (
            <>
              <div className="cookie-preferences-header">
                <h2>Cookie Preferences</h2>
                <button className="cookie-modal-close" onClick={handleSave}>
                  ×
                </button>
              </div>

              <p className="preferences-intro">
                We use different types of cookies to optimize your experience on
                our website. Click on the categories below to learn more about
                their purposes. You may choose which types of cookies to allow
                and can change your preferences at any time. The choices you
                make regarding the Purposes and Vendors listed in this notice
                are saved in local storage under the key TERMLY_COOKIE_CONSENT
                for a maximum duration of 12 months. Remember that disabling
                cookies may affect your experience on the website. You can learn
                more about how we use cookies by visiting our{" "}
                <Link to="/cookies" className="cookie-policy-link">
                  Cookie Policy
                </Link>
                .
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
                          {category.count && (
                            <span className="cookie-count">
                              ({category.count})
                            </span>
                          )}
                        </span>
                      </label>
                      {category.required && (
                        <span className="cookie-required-badge">Required</span>
                      )}
                    </div>
                    <p className="cookie-category-description">
                      {category.description}
                    </p>
                    {category.cookies && category.cookies.length > 0 && (
                      <button
                        className="cookie-details-btn"
                        onClick={() => setSelectedCategory(category)}
                      >
                        Details
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="cookie-preferences-actions">
                <button
                  className="btn-cookie btn-decline-all"
                  onClick={handleDeclineAll}
                >
                  Decline All
                </button>
                <button
                  className="btn-cookie btn-allow-all"
                  onClick={handleAllowAll}
                >
                  Allow All
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="cookie-details-header">
                <button
                  className="cookie-back-btn"
                  onClick={() => setSelectedCategory(null)}
                >
                  ← Back
                </button>
                <h2>{selectedCategory.title}</h2>
                <button className="cookie-modal-close" onClick={handleSave}>
                  ×
                </button>
              </div>

              <div className="cookie-details-content">
                {selectedCategory.cookies &&
                selectedCategory.cookies.length > 0 ? (
                  <div className="cookie-providers-list">
                    {Object.entries(
                      selectedCategory.cookies.reduce((acc, cookie) => {
                        if (!acc[cookie.provider]) {
                          acc[cookie.provider] = [];
                        }
                        acc[cookie.provider].push(cookie);
                        return acc;
                      }, {})
                    ).map(([provider, cookies]) => (
                      <div key={provider} className="cookie-provider-group">
                        <h3 className="cookie-provider-name">
                          Provider {provider}
                        </h3>
                        <div className="cookie-table-container">
                          <table className="cookie-table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Purpose</th>
                                <th>Type</th>
                                <th>Expires In</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cookies.map((cookie, index) => (
                                <tr key={index}>
                                  <td>{cookie.name}</td>
                                  <td>{cookie.purpose}</td>
                                  <td>{cookie.type}</td>
                                  <td>{cookie.expires}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {cookies[0].privacyPolicy && (
                            <div className="cookie-privacy-link">
                              <a
                                href={cookies[0].privacyPolicy}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cookie-policy-link"
                              >
                                Privacy policy
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No cookies available for this category.</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;

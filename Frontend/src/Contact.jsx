import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "./utils/axiosConfig";
import "./contact.css";
import logo1 from "./images/logo1.png";
import logo2 from "./images/logo2.png";
import logo4 from "./images/logo4.png";
import logo5 from "./images/logo5.png";
import logo6 from "./images/logo6.png";
import logo7 from "./images/logo7.png";

const countryCodes = [
  { code: "+44", flag: "🇬🇧", country: "UK" },
  { code: "+1", flag: "🇺🇸", country: "USA" },
  { code: "+234", flag: "🇳🇬", country: "Nigeria" },
  { code: "+91", flag: "🇮🇳", country: "India" },
  { code: "+33", flag: "🇫🇷", country: "France" },
  { code: "+49", flag: "🇩🇪", country: "Germany" },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "+44",
    company: "",
    role: "",
    projectDescription: "",
    file: null,
  });
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (status.error) {
      setStatus({ ...status, error: false, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: false, success: false, message: "" });

    try {
      // Backend expects JSON at POST /api/contact (axiosInstance baseURL already includes /api)
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const subject = `Website contact — ${formData.company || "General"}`;
      const messageParts = [
        formData.projectDescription?.trim(),
        formData.phone?.trim() ? `Phone: ${formData.countryCode} ${formData.phone.trim()}` : null,
        formData.role?.trim() ? `Role: ${formData.role.trim()}` : null,
        formData.company?.trim() ? `Company: ${formData.company.trim()}` : null,
        formData.file?.name ? `Attachment: ${formData.file.name}` : null,
      ].filter(Boolean);

      const payload = {
        name: fullName,
        email: formData.email.trim(),
        subject,
        message: messageParts.join("\n"),
        // Also send raw fields (backend will ignore or use them if needed)
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() ? `${formData.countryCode} ${formData.phone.trim()}` : "",
        company: formData.company.trim(),
        role: formData.role.trim(),
        projectDescription: formData.projectDescription.trim(),
      };

      const response = await axiosInstance.post("/contact", payload);

      setStatus({
        loading: false,
        error: false,
        success: true,
        message: response.data.message || "Thank you! We'll be in touch within 1 business day.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "+44",
        company: "",
        role: "",
        projectDescription: "",
        file: null,
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ ...status, success: false, message: "" });
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.error
        ? error.response.data.error
        : (!error.response && error.message === "Network Error")
          ? `Network Error: could not reach the API server. If you're running locally, start the backend on port 5000 (and ensure your URL is allowed by CORS).`
          : (error.message || "Something went wrong. Please try again.");
      setStatus({
        loading: false,
        error: true,
        success: false,
        message: errorMessage,
      });
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <Container>
          <Row className="align-items-center">
            <Col lg={8}>
              <h1>Let's talk business.</h1>
              <p className="hero-subtitle">
                Request a free consultation by filling out the form below and receive a prompt response from our team within 1 business day.
              </p>
            </Col>
            <Col lg={4} className="hero-icon-col">
              <div className="hero-briefcase-icon">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="40" y="60" width="120" height="100" rx="8" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9" />
                  <rect x="50" y="70" width="100" height="80" rx="4" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.7" />
                  <path d="M60 60 L60 50 Q60 40 70 40 L130 40 Q140 40 140 50 L140 60" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.9" />
                  <circle cx="100" cy="110" r="15" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
                  <path d="M85 110 L100 110 L100 125" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.8" />
                </svg>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <Container>
          <Row>
            <Col lg={5}>
              <h2 className="section-title">Tell us about your needs</h2>
              <div className="contact-info">
                <div className="contact-info-item">
                  <div className="contact-icon">✉</div>
                  <div>
                    <a href="mailto:info@zedfluxtechnologies.com">info@zedfluxtechnologies.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">✉</div>
                  <div>
                    <a href="mailto:media@zedfluxtechnologies.com">media@zedfluxtechnologies.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <p>UK +44 20 1234 5678</p>
                  </div>
                </div>
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <p>NIGERIA +234 1 234 5678</p>
                  </div>
                </div>
              </div>

              <div className="client-logos-section">
                <h3>LEAD THE WAY, LIKE THEM</h3>
                <div className="client-logos">
                  <div className="logo-item">
                    <img src={logo1} alt="Client Logo 1" />
                  </div>
                  <div className="logo-item">
                    <img src={logo2} alt="Client Logo 2" />
                  </div>
                  <div className="logo-item">
                    <img src={logo7} alt="Client Logo 3" />
                  </div>
                  <div className="logo-item">
                    <img src={logo4} alt="Client Logo 4" />
                  </div>
                  <div className="logo-item">
                    <img src={logo5} alt="Client Logo 5" />
                  </div>
                  <div className="logo-item">
                    <img src={logo6} alt="Client Logo 6" />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={7}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-first-name">
                        First Name *
                      </label>
                      <input
                        id="contact-first-name"
                        type="text"
                        name="firstName"
                        placeholder=""
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        disabled={status.loading}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-last-name">
                        Last Name *
                      </label>
                      <input
                        id="contact-last-name"
                        type="text"
                        name="lastName"
                        placeholder=""
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        disabled={status.loading}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-email">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        placeholder=""
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={status.loading}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-phone">
                        Phone Number
                      </label>
                      <div className="phone-input-wrapper">
                        <div className="phone-country-select">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            disabled={status.loading}
                            className="country-code-select"
                            aria-label="Country code"
                          >
                            {countryCodes.map((country) => (
                              <option key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          placeholder=""
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={status.loading}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-company">
                        Company Name *
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        placeholder=""
                        value={formData.company}
                        onChange={handleChange}
                        required
                        disabled={status.loading}
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <label className="field-label" htmlFor="contact-role">
                        Role *
                      </label>
                      <input
                        id="contact-role"
                        type="text"
                        name="role"
                        placeholder=""
                        value={formData.role}
                        onChange={handleChange}
                        required
                        disabled={status.loading}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="form-group">
                  <label className="field-label" htmlFor="contact-project-description">
                    Project Description *
                  </label>
                  <textarea
                    id="contact-project-description"
                    name="projectDescription"
                    placeholder=""
                    rows="5"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    required
                    disabled={status.loading}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="file-upload-label">
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt"
                      disabled={status.loading}
                    />
                    <span className="file-upload-button">Choose File</span>
                    {formData.file && <span className="file-name">{formData.file.name}</span>}
                  </label>
                  <p className="file-upload-note">
                    PDF, Word, Excel, PNG, JPEG, and TXT files with less than 25MB in size are supported.
                  </p>
                </div>
                {status.loading && (
                  <div className="form-status loading">Submitting...</div>
                )}
                {status.error && (
                  <div className="form-status error">{status.message}</div>
                )}
                {status.success && (
                  <div className="form-status success">{status.message}</div>
                )}
                <button type="submit" className="submit-btn" disabled={status.loading}>
                  Submit →
                </button>
                <p className="privacy-note">
                  By clicking submit button, you agree to our <Link to="/cookies">privacy policy</Link>.
                </p>
              </form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* World Map Section */}
      <section className="world-map-section">
        <Container>
          <div className="world-map">
            <img src="/contact/map.png" alt="World Map" className="world-map-image" />
          </div>
        </Container>
      </section>

      {/* Office Locations Section */}
      <section className="office-locations-section">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="office-location-card">
                <div className="office-image">
                  <img src="/contact/leeds.avif" alt="Leeds, United Kingdom" />
                </div>
                <h3>Leeds, United Kingdom</h3>
                <p className="office-address">
                  Salisbury View, Leeds, LS1 4DQ, United Kingdom
                </p>
              </div>
            </Col>
            <Col lg={6}>
              <div className="office-location-card">
                <div className="office-image">
                  <img src="/contact/Nigeria.webp" alt="Marina, Nigeria" />
                </div>
                <h3>Marina, Nigeria</h3>
                <p className="office-address">
                  5 Broad Lane, Marina, Lagos, Nigeria
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Contact;

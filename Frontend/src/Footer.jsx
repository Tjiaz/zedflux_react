import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import "./footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = () => {
    // Scroll to top immediately when footer link is clicked
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  };

  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <NavLink to="/" className="logo d-flex align-items-center" onClick={handleLinkClick}>
              <img src={logo} className="logo" width={40} alt="Zedflux Logo" />
              <span className="ms-2">Zedflux</span>
            </NavLink>
            <p>
              Innovative IT solutions company that is dedicated to connecting
              people with technology.
            </p>
            <div className="social-links d-flex mt-4">
              <a
                href="https://twitter.com/zedflux"
                target="_blank"
                rel="noopener noreferrer"
                className="twitter"
                aria-label="Twitter"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://facebook.com/zedflux"
                target="_blank"
                rel="noopener noreferrer"
                className="facebook"
                aria-label="Facebook"
              >
                <i className="bi bi-facebook"></i>
              </a>
              <a
                href="https://instagram.com/zedflux"
                target="_blank"
                rel="noopener noreferrer"
                className="instagram"
                aria-label="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
              <a
                href="https://linkedin.com/company/zedflux"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin"
                aria-label="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={handleLinkClick}>About Us</NavLink>
              </li>
              <li>
                <NavLink to="/services" onClick={handleLinkClick}>Services</NavLink>
              </li>
              <li>
                <NavLink to="/portfolio" onClick={handleLinkClick}>Portfolio</NavLink>
              </li>
              <li>
                <NavLink to="/blog" onClick={handleLinkClick}>Blog</NavLink>
              </li>
              <li>
                <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <NavLink to="/data-services-details" onClick={handleLinkClick}>Data Analytics & AI</NavLink>
              </li>
              <li>
                <NavLink to="/software-engineering-details" onClick={handleLinkClick}>Software Engineering</NavLink>
              </li>
              <li>
                <NavLink to="/generative-ai-details" onClick={handleLinkClick}>Generative AI</NavLink>
              </li>
              <li>
                <NavLink to="/digital-transformation-details" onClick={handleLinkClick}>Digital Transformation</NavLink>
              </li>
              <li>
                <NavLink to="/experience-design-details" onClick={handleLinkClick}>Experience Design</NavLink>
              </li>
              <li>
                <NavLink to="/digital-strategy-details" onClick={handleLinkClick}>Digital Strategy</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
            <h4>Contact Us</h4>
            <p>
              108 Marina
              <br />
              Lagos, NG <br />
              Nigeria <br />
              <br />
              <strong>Phone:</strong>{" "}
              <a href="tel:+155895548855">+1 5589 55488 55</a>
              <br />
              <strong>Email:</strong>{" "}
              <a href="mailto:info@zedfluxtechnologies.com">
                info@zedfluxtechnologies.com
              </a>
              <br />
            </p>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <div className="copyright">
          &copy; Copyright{" "}
          <strong>
            <span>Zedflux</span>
          </strong>{" "}
          {currentYear}. All Rights Reserved
        </div>
      </div>
      <button
        onClick={scrollToTop}
        className={`scroll-top d-flex align-items-center justify-content-center ${showScrollTop ? "show" : ""}`}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up-short"></i>
      </button>
    </footer>
  );
};

export default Footer;

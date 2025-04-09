import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";
import logo from "./images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-5 col-md-12 footer-info">
            <NavLink to="index.html" class="logo d-flex align-items-center">
              <img src={logo} className="logo" width={40} alt="logo" />
            </NavLink>
            <p>
              Innovative IT solutions company that is dedicated to connecting
              people with technology"
            </p>
            <div className="social-links d-flex mt-4">
              <NavLink to="#" class="twitter">
                <i class="bi bi-twitter"></i>
              </NavLink>
              <NavLink to="#" class="facebook">
                <i class="bi bi-facebook"></i>
              </NavLink>
              <NavLink to="#" class="instagram">
                <i class="bi bi-instagram"></i>
              </NavLink>
              <NavLink to="#" class="linkedin">
                <i class="bi bi-linkedin"></i>
              </NavLink>
            </div>
          </div>

          <div className="col-lg-2 col-6 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <NavLink to="#">Home</NavLink>
              </li>
              <li>
                <NavLink to="#">About us</NavLink>
              </li>
              <li>
                <NavLink to="#">Services</NavLink>
              </li>
              <li>
                <NavLink to="#">Terms of service</NavLink>
              </li>
              <li>
                <NavLink to="#">Privacy policy</NavLink>
              </li>
            </ul>
          </div>

          <div class="col-lg-2 col-6 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <NavLink to="#">Business Intelligence</NavLink>
              </li>
              <li>
                <NavLink to="#">Web Development</NavLink>
              </li>
              <li>
                <NavLink to="#">IT Training and Education</NavLink>
              </li>
              <li>
                <NavLink to="#">Digital Marketing</NavLink>
              </li>
              <li>
                <NavLink to="#">Graphic Design</NavLink>
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
              <strong>Phone:</strong> +1 5589 55488 55
              <br />
              <strong>Email:</strong> info@zedfluxtechnologies.com
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
          {currentYear} All Rights Reserved
        </div>
      </div>
      <NavLink
        to="#"
        className="scroll-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </NavLink>
    </footer>
  );
};

export default Footer;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import logo from "./images/logo.png";
import "./index.css";

const Navbar = () => {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const mobileNavToggle = () => {
    setMobileNavActive(!mobileNavActive);
  };

  useEffect(() => {
    // Sticky Header on Scroll

    const headerElement = document.getElementById("header");

    if (headerElement) {
      let headerOffset = headerElement.offsetTop;
      let nextElement = headerElement.nextElementSibling;

      const headerFixed = () => {
        if (headerOffset - window.scrollY <= 0) {
          headerElement.classList.add("sticked");
          // Add 'position-relative' class here
        } else {
          headerElement.classList.remove("sticked");
          if (nextElement)
            nextElement.classList.remove("sticked-header-offset");
          // Remove 'position-relative' class here
        }
      };

      headerFixed();

      window.addEventListener("load", headerFixed);
      window.addEventListener("scroll", headerFixed);

      return () => {
        window.removeEventListener("load", headerFixed);
        window.removeEventListener("scroll", headerFixed);
      };
    }
  }, [mobileNavActive]);

  useEffect(() => {
    // Navbar links active state on scroll
    let navbarlinks = document.querySelectorAll("#navbar .nav-link");

    const navbarlinksActive = () => {
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;

        let section = document.querySelector(navbarlink.hash);
        if (!section) return;

        let position = window.scrollY + 200;

        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add("active");
        } else {
          navbarlink.classList.remove("active");
        }
      });
    };

    navbarlinksActive();

    window.addEventListener("load", navbarlinksActive);
    window.addEventListener("scroll", navbarlinksActive);

    return () => {
      window.removeEventListener("load", navbarlinksActive);
      window.removeEventListener("scroll", navbarlinksActive);
    };
  }, [mobileNavActive]);

  return (
    <header
      id="header"
      className={`header d-flex align-items-center ${
        isSticky ? "sticked" : ""
      } ${mobileNavActive ? "mobile-nav-active" : ""}`}
    >
      <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
        <NavLink to="/" className="logo d-flex align-items-center">
          <img src={logo} className="logo" alt="logo" />
        </NavLink>
        <nav id="navbar" className="navbar">
          <ul>
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setMobileNavActive(false)} //CLose mobile nav
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setMobileNavActive(false)} //CLose mobile nav
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setMobileNavActive(false)} //CLose mobile nav
              >
                Portfolio
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setMobileNavActive(false)} //CLose mobile nav
              >
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
                onClick={() => setMobileNavActive(false)} //CLose mobile nav
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        <i
          className={`mobile-nav-toggle mobile-nav-show bi bi-list ${
            isSticky ? "sticked" : ""
          }`}
          onClick={mobileNavToggle}
        ></i>
        <i
          className={`mobile-nav-toggle mobile-nav-hide d-none bi bi-x ${
            isSticky ? "sticked" : ""
          }`}
          onClick={mobileNavToggle}
        ></i>
      </div>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="row gy-4">
          <div className="col-lg-6">
            <h3>
              We specialize in building and transforming businesses through
              data-driven IT solutions and innovative software.
            </h3>

            <p>
              Our Core Values: Innovative Passion, Collaborative Teamwork,
              Precision through Data, Visionary Thinking, Lifelong Learning,
              Customer-Centric Focus, and Exceptional Service.
            </p>
            <p>
              As a leading technology company, we excel in web development, game
              development, and diverse IT services. Our mission is to empower
              organizations with customized and cutting-edge technology
              solutions to achieve their highest potential.
            </p>
          </div>
          <div className="col-lg-6">
            <div className="content ps-0 ps-lg-5">
              <div className="position-relative mt-4">
                <img
                  src="assets/img/about-2.jpg"
                  className="img-fluid rounded-4"
                  alt="About Us"
                />
                <NavLink
                  to="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  className="glightbox play-btn"
                ></NavLink>
                <NavLink
                  to="/about"
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
                  Who we are
                  <i
                    className="bi bi-arrow-right"
                    style={{
                      marginLeft: "10px",
                    }}
                  ></i>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

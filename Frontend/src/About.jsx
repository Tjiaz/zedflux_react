import React from "react";
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
            <div className="about-metrics" aria-label="Our impact">
              <div className="about-metrics__item">
                <i className="bi bi-kanban" aria-hidden="true" />
                <div>
                  <strong>43</strong>
                  <span>Projects</span>
                </div>
              </div>
              <div className="about-metrics__item">
                <i className="bi bi-phone" aria-hidden="true" />
                <div>
                  <strong>49</strong>
                  <span>Apps Deployed</span>
                </div>
              </div>
              <div className="about-metrics__item">
                <i className="bi bi-people" aria-hidden="true" />
                <div>
                  <strong>59</strong>
                  <span>Satisfied Clients</span>
                </div>
              </div>
            </div>

            <div className="content ps-0 ps-lg-5">
              <div className="mt-4">
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

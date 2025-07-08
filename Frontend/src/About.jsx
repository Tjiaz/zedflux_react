import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

import "./index.css";

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current && videoRef.current.play();
    }, 100); // Ensure video is rendered before play
  };

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
                {!isPlaying && (
                  <>
                    <img
                      src="assets/img/about-3.png"
                      className="img-fluid rounded-4"
                      alt="About Us"
                      style={{ width: "100%", display: "block" }}
                    />
                    <button
                      onClick={handlePlay}
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.5)",
                        border: "none",
                        borderRadius: "50%",
                        width: "64px",
                        height: "64px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        zIndex: 3,
                      }}
                    >
                      <i
                        className="bi bi-play-fill"
                        style={{ fontSize: "2rem", color: "#fff" }}
                      ></i>
                    </button>
                  </>
                )}
                {/* Show video when playing */}
                {isPlaying && (
                  <video
                    ref={videoRef}
                    controls
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                      zIndex: 2,
                      background: "#000",
                    }}
                  >
                    <source src="assets/img/zed...mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

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

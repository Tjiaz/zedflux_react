import React, { useEffect, useState } from "react";
import "./about.css";
import about from "../images/about.jpg";
import about1 from "../images/about-1.jpg";
import about2 from "../images/about-2.jpg";
import about3 from "../images/about-3.jpg";
import aboutHero from "../images/about_hero.png";
import Clients from "../Clients";
import Counter from "../Counter";
import Testimonials from "../Testimonials";

const AboutUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [about, about1, about2, about3];

  useEffect(() => {
    //create an interval to change the image every 5seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    //cleanup the intervals when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentImageIndex]);

  return (
    <section id="about" className="about-page">
      {/* Main Hero Section */}
      <div className="about-main-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h1 className="about-main-hero-title">
                Driven by Innovation™
              </h1>
              <p className="about-main-hero-description">
                Powering growth with innovative digital, data, and AI solutions 
                that transform businesses and drive measurable results.
              </p>
              <p className="about-main-hero-subtitle">
                We are one of the fastest-growing technology companies, 
                dedicated to connecting people with cutting-edge technology 
                that solves real-world challenges.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-main-hero-image-container">
                <img
                  src={aboutHero}
                  className="about-main-hero-image"
                  alt="Zedflux Technologies"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Hero Section */}
      <div className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="about-hero-title">Empower Growth</h2>
              <p className="about-hero-description">
                We are a team of passionate individuals dedicated to delivering the
                best solutions for our clients. At Zedflux Technologies, we believe
                in the power of technology to transform businesses and industries.
              </p>
              <p className="about-hero-subtitle">
                Our mission is to help businesses and organizations achieve their
                full potential through innovative and customized technology
                solutions.
              </p>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="about-image-container">
                <div className="about-image-wrapper">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      className={`about-image ${index === currentImageIndex ? "active" : ""}`}
                      alt={`About us ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="about-image-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="about-values">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2>Our Core Qualities</h2>
            <p className="section-description">
              The principles that guide everything we do
            </p>
          </div>
          <div className="row gy-4">
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="100">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h4>Zealous Innovation</h4>
                <p>Pushing boundaries with cutting-edge technology solutions</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="200">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <h4>Empowered Team</h4>
                <p>Collaborative experts driving transformative results</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="300">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-graph-up-arrow"></i>
                </div>
                <h4>Data-driven Excellence</h4>
                <p>Leveraging insights to make strategic decisions</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="400">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-eye-fill"></i>
                </div>
                <h4>Futuristic Vision</h4>
                <p>Anticipating and shaping technological landscapes</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="500">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-book-fill"></i>
                </div>
                <h4>Lifelong Learning</h4>
                <p>Continuously evolving with the latest technologies</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="600">
              <div className="value-card">
                <div className="value-icon">
                  <i className="bi bi-heart-fill"></i>
                </div>
                <h4>User-Centric Approach</h4>
                <p>Putting users at the center of every solution</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-mission">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-2 order-lg-1" data-aos="fade-right">
              <div className="mission-content">
                <h2>Our Commitment</h2>
                <p>
                  We are committed to delivering high-quality services and products 
                  that exceed our clients' expectations. Our team of experienced 
                  professionals is dedicated to staying at the forefront of 
                  technological advancements and continuously improving our processes 
                  to deliver top-notch solutions.
                </p>
                <div className="mission-features">
                  <div className="mission-feature">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>Web development, game development, and mobile app development</span>
                  </div>
                  <div className="mission-feature">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>AI, software development, and digital marketing</span>
                  </div>
                  <div className="mission-feature">
                    <i className="bi bi-check-circle-fill"></i>
                    <span>IT consulting and comprehensive technology solutions</span>
                  </div>
                </div>
                <div className="mt-4">
                  <a href="#services" className="btn-explore">
                    <span>Explore our services</span>
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left">
              <div className="mission-image-container">
                <img
                  src={about3}
                  className="mission-image"
                  alt="Our mission"
                />
                <div className="mission-image-shadow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <section id="partners" className="partners">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <div className="row">
              <div className="col-12 col-md-8 offset-md-2">
                <h2 className="text-center">Our Partners and Alliances</h2>
                <p className="text-center">
                  We collaborate with both local and international organizations
                  to expand our expertise and create transformative solutions
                  that positively impact businesses and customers alike.
                </p>
              </div>
            </div>
          </div>
          <Clients />
          <Counter />
          <Testimonials />
        </div>
      </section>
    </section>
  );
};

export default AboutUs;

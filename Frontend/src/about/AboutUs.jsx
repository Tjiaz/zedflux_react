import React, { useEffect, useState } from "react";
import "./about.css";
import about from "../images/about.jpg";
import about1 from "../images/about-1.jpg";
import about2 from "../images/about-2.jpg";
import about3 from "../images/about-3.jpg";
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
    <section id="about" className="about">
      <div className="container" data-aos="fade-up">
        <div className="section-header">
          <h2>Empower Growth</h2>
          <p>
            We are a team of passionate individuals dedicated to delivering the
            best solutions for our clients.
          </p>
        </div>
        <div className="row gy-4">
          <div className="col-lg-6">
            <img
              src={images[currentImageIndex]}
              className="img-fluid w-40 mb-4"
              alt="aboout"
            />
          </div>
          <div className="col-lg-6">
            <p>
              Our mission is to provide innovative and effective solutions that
              meet the needs of our clients.
            </p>

            <p>
              Our Qualities:Zealous Innovation, Empowered Team,Data-driven
              Excellence,Futuristic Vision,Lifelong Learning, User-Centric
              Approach, eXceptional Service.
            </p>
            <p>
              We are a leading technology company that specializes in web
              development, game development, and a range of other IT services.
              Our mission is to help businesses and organizations achieve their
              full potential through innovative and customized technology
              solutions.
            </p>
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">
                At Zedflux Technologies and Global Resources Limited, we believe
                in the power of technology to transform businesses and
                industries. Our primary objective is to develop solutions.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill"></i> committed to
                  delivering high-quality services and products that exceed our
                  clients' expectations. Our team of experienced professionals
                  is dedicated to staying at the forefront of technological
                  advancements and continuously improving our processes to
                  deliver top-notch solutions to our clients.
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> Our services
                  include data,web development, game development, mobile app
                  development
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i> AI, software
                  development, digital marketing, IT consulting, and more...
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <a href="#services" className=" d-inline-flex align-items-center">
                <span>Explore our services</span>
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <section id="partners" className="partners">
        <div className="container" data-aos="fade-up">
          <div className="section-header">
            <h2>Our Partners and Alliances</h2>
            <p>
              We collaborate with both local and international organizations to
              expand our expertise and create transformative solutions that
              positively impact businesses and customers alike.
            </p>
            <Clients />
            <Counter />
            <Testimonials />
          </div>
        </div>
      </section>
    </section>
  );
};

export default AboutUs;

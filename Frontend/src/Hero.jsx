// import React from "react";
// import "bootstrap-icons/font/bootstrap-icons.css";

// import { BrowserRouter, NavLink, Routes, Router } from "react-router-dom";
// import "./index.css";

// const Hero = () => {
//   return (

//       <section id="hero" className="hero">
//         <div className="container position-relative">
//           <div className="row gy-5" data-aos="fade-in">
//             <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
//               <h2>
//                 Welcome to <span>Zedflux</span>
//               </h2>
//               <p>
//                 Craft exceptional IT solutions by designing, developing, and
//                 providing them through the web.
//               </p>
//               <div className="d-flex justify-content-center justify-content-lg-start">
//                 <NavLink to="#about" className="btn-get-started">
//                   Learn More
//                 </NavLink>
//                 <NavLink
//                   href="https://www.youtube.com/watch?v=LXb3EKWsInQ"
//                   className="glightbox btn-watch-video d-flex align-items-center"
//                 >
//                   <i className="bi bi-play-circle"></i>
//                   <span>Watch Video</span>
//                 </NavLink>
//               </div>
//             </div>
//             <div className="col-lg-6 order-1 order-lg-2">
//               <img
//                 src="assets/img/hero.svg"
//                 className="img-fluid"
//                 alt=""
//                 data-aos="zoom-out"
//                 data-aos-delay="100"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="icon-boxes position-relative">
//           <div className="container position-relative">
//             <div className="row gy-4 mt-5">
//               <div
//                 className="col-xl-3 col-md-6"
//                 data-aos="fade-up"
//                 data-aos-delay="100"
//               >
//                 <div className="icon-box">
//                   <div className="icon">
//                     <i className="bi bi-easel"></i>
//                   </div>
//                   <h4 className="title">
//                     <NavLink href="" className="nav-link stretched-link">
//                       Zealous Innovation
//                     </NavLink>
//                   </h4>
//                 </div>
//               </div>

//               <div
//                 className="col-xl-3 col-md-6"
//                 data-aos="fade-up"
//                 data-aos-delay="200"
//               >
//                 <div className="icon-box">
//                   <div className="icon">
//                     <i className="bi bi-gem"></i>
//                   </div>
//                   <h4 className="title">
//                     <NavLink href="" className="nav-link stretched-link">
//                       Empowered Team
//                     </NavLink>
//                   </h4>
//                 </div>
//               </div>

//               <div
//                 className="col-xl-3 col-md-6"
//                 data-aos="fade-up"
//                 data-aos-delay="300"
//               >
//                 <div className="icon-box">
//                   <div className="icon">
//                     <i className="bi bi-geo-alt"></i>
//                   </div>
//                   <h4 className="title">
//                     <NavLink href="" className="nav-link stretched-link">
//                       Data-driven Excellence
//                     </NavLink>
//                   </h4>
//                 </div>
//               </div>

//               <div
//                 className="col-xl-3 col-md-6"
//                 data-aos="fade-up"
//                 data-aos-delay="500"
//               >
//                 <div className="icon-box">
//                   <div className="icon">
//                     <i className="bi bi-command"></i>
//                   </div>
//                   <h4 className="title">
//                     <NavLink to="/" className="stretched-link nav-link">
//                       Futuristic Vision..
//                     </NavLink>
//                   </h4>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//   );
// };

// export default Hero;

import React, { useState, useEffect, useCallback } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NavLink } from "react-router-dom";
import "./index.css";
import hero1 from "./images/hero3.jpg";
import hero2 from "./images/hero4.jpg";
import hero3 from "./images/hero5.jpg";

const heroFeatures = [
  {
    icon: "bi-easel",
    title: "Zealous Innovation",
    description: "Pushing boundaries with cutting-edge technology solutions.",
  },
  {
    icon: "bi-gem",
    title: "Empowered Team",
    description: "Collaborative experts driving transformative results.",
  },
  {
    icon: "bi-geo-alt",
    title: "Data-driven Excellence",
    description: "Leveraging insights to make strategic decisions.",
  },
  {
    icon: "bi-command",
    title: "Futuristic Vision",
    description: "Anticipating and shaping technological landscapes.",
  },
];

const heroServices = [
  "Mobile Apps",
  "Business Building",
  "AI Intelligence",
  "Digital Marketing",
  "Software Devops",
  "IT Training",
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [hero1, hero2, hero3];
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Change service every 3 seconds
    const intervalId = setInterval(() => {
      setCurrentServiceIndex(
        (prevIndex) => (prevIndex + 1) % heroServices.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="hero" className="hero">
      <div className="container position-relative">
        <div className="row gy-5" data-aos="fade-in">
          <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-lg-start">
            <h2>
              We Provide{" "}
              <span className="dynamic-service text-nowrap">
                {heroServices[currentServiceIndex]}
              </span>
            </h2>
            <p className="dynamic-description">
              Craft exceptional IT solutions by designing, developing, and
              providing them through the web.
            </p>
            <div className="hero-cta d-flex justify-content-center justify-content-lg-start">
              <NavLink to="#about" className="btn-get-started">
                Learn More
              </NavLink>
              <NavLink
                to="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                className="glightbox btn-watch-video d-flex align-items-center"
              >
                <i className="bi bi-play-circle"></i>
                <span>Watch Video</span>
              </NavLink>
            </div>
          </div>
          <div className="col-lg-6 order-1 order-lg-2 hero-image-container">
            <div className="hero-image-wrapper">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  className={`hero-image ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  alt={`Hero image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="icon-boxes position-relative">
        <div className="container position-relative">
          <div className="row gy-4 mt-5">
            {heroFeatures.map((feature, index) => (
              <div
                key={index}
                className="col-xl-3 col-md-6"
                data-aos="fade-up"
                data-aos-delay={`${100 * (index + 1)}`}
              >
                <div className="icon-box">
                  <div className="icon">
                    <i className={`bi ${feature.icon}`}></i>
                  </div>
                  <h4 className="title">
                    <NavLink to="/" className="nav-link stretched-link">
                      {feature.title}
                    </NavLink>
                  </h4>
                  <p className="feature-description">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

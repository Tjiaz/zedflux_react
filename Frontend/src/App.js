import React, { useEffect } from "react";
import About from "./About";

import Hero from "./Hero";
import Navbar from "./Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Services from "./Services";

import Porfolio from "./Porfolio";

import RecentBlog from "./RecentBlog";
import Contact from "./Contact";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import "./index.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TopBar from "./TopBar";
import BlogPage from "./BlogPage";
import AboutUs from "./about/AboutUs";
import ServicesPage from "./services/ServicesPage"; // Import the ServicesPage component
import PortfolioPage from "./Portfolio/PortfolioPage";
import GroceryApp from "./case-studies-details/GroceryApp";

const Home = () => (
  <>
    <Hero />
    <About />

    <Services />

    <Porfolio />

    <RecentBlog />
    <Contact />
  </>
);

function App() {
  useEffect(() => {
    // Preloader logic
    const handleDOMContentLoaded = () => {
      const preloader = document.querySelector("#preloader");
      if (preloader) {
        window.addEventListener("load", () => {
          preloader.remove();
        });
      }
    };

    // Add DOMContentLoaded event listener when the component mounts
    document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  return (
    <div className="App">
      <Router>
        <TopBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/case-studies/grocery-app" element={<GroceryApp />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

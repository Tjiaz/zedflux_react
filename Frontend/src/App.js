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
import ErrorBoundary from "./ErrorBoundary";
import DataServiceDetails from "./services/Dataservices_details";
import SoftwareEngineeringDetails from "./services/SoftwareEngineeringDetails";
import GenerativeAIDetails from "./services/GenerativeAIDetails";
import DigitalTransformationDetails from "./services/DigitalTransformationDetails";
import ExperienceDesignDetails from "./services/ExperienceDesignDetails";
import DigitalStrategyDetails from "./services/DigitalStrategyDetails";
import ScrollToTop from "./ScrollToTop";
import CookieConsent from "./components/CookieConsent";
import CookiePreferences from "./components/CookiePreferences";
import CookiePolicy from "./pages/CookiePolicy";

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
    <ErrorBoundary>
      <div className="App">
        <Router>
          <ScrollToTop />
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
            <Route
              path="/data-services-details"
              element={<DataServiceDetails />}
            />
            <Route
              path="/software-engineering-details"
              element={<SoftwareEngineeringDetails />}
            />
            <Route
              path="/generative-ai-details"
              element={<GenerativeAIDetails />}
            />
            <Route
              path="/digital-transformation-details"
              element={<DigitalTransformationDetails />}
            />
            <Route
              path="/experience-design-details"
              element={<ExperienceDesignDetails />}
            />
            <Route
              path="/digital-strategy-details"
              element={<DigitalStrategyDetails />}
            />
            <Route path="/cookie-preferences" element={<CookiePreferences />} />
            <Route path="/cookies" element={<CookiePolicy />} />
          </Routes>
          <CookieConsent />
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  );
}

export default App;

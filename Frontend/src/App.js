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

async function wakeUpBackend() {
  try {
    console.log("Ateempting to wake up backend");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL_PROD}/api/health`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(5000),
      }
    ); // 5 seconds timeout
    if (response.ok) {
      console.log("Backend is awake and responding");
    } else {
      console.warn(`Backend responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error waking up backend:", error);
  }
}

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

    // Call the wake-up function when the app loads
    wakeUpBackend();

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded);
    };
  }, []);

  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
}

export default App;

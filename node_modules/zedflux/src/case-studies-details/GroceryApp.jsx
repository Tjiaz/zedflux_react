import React from "react";
import PhoneFrame from "./PhoneFrame";
import "./GroceryApp.css";
import hlogo from "../images/hlogo.png";
import sandwich from "../images/sandwich.jpg";

const GroceryApp = () => {
  return (
    <div className="grocery-app-container">
      <PhoneFrame>
        <div className="grocery-app">
          {/* Header */}
          <header className="app-header">
            <img
              src={hlogo}
              alt="Harris Teeter"
              className="logo"
              style={{ width: "70px", height: "50px" }} // Adjust size as needed
            />
            <div className="location">4th Hill Street</div>
          </header>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="cart-button">🛒</button>
          </div>

          {/* Featured Banner */}
          <div className="featured-banner">
            <div className="save-badge">Save $20</div>
            <img
              src={sandwich}
              alt="Special offer"
              style={{ width: "300px", height: "200px" }}
            />
          </div>

          {/* Specials Section */}
          <section className="specials">
            <h2>Specials</h2>
            <div className="special-cards">
              <div className="special-card">
                <span>20% OFF</span>
              </div>
              <div className="special-card">
                <span>15% OFF</span>
              </div>
              <div className="special-card">
                <span>35% OFF</span>
              </div>
            </div>
          </section>

          {/* Favorites Section */}
          <section className="favorites">
            <div className="section-header">
              <h2>My Favorites</h2>
              <button>View All</button>
            </div>
            <div className="favorites-list">
              {/* Add your favorite items here */}
            </div>
          </section>
        </div>
      </PhoneFrame>
      <div className="grocery-app-description">
        <h1>A Fresh Take on Online Grocery Shopping</h1>
        <h2>How we helped Harris Teeter transform grocery shopping</h2>
      </div>
    </div>
  );
};

export default GroceryApp;

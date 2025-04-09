import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

const ServicesItem = ({ title, description, icon }) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="service-item position-relative">
        <div className="icon">
          <i className={icon}></i>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <NavLink to="#" className="readmore stretched-link">
          Read more <i className="bi bi-arrow-right"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default ServicesItem;

import React from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

const ServiceItem = ({ title, description, icon}) => {
  return (
  
      <div className="col-lg-4 col-md-6">
        <div className="service-item position-relative">
          <div className="icon">
            <i className={icon}></i>
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          
        </div>
      </div>
   
  );
};

export default ServiceItem;

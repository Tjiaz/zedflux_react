import React from "react";
import "./PhoneFrame.css";

const PhoneFrame = ({ children }) => {
  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="phone-notch"></div>
        <div className="phone-content">{children}</div>
        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;

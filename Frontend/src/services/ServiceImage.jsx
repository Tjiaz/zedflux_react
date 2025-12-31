import React, { useState } from "react";

const ServiceImage = ({ src, alt, title, className = "" }) => {
  const [imageError, setImageError] = useState(false);

  // Icon mapping for each service
  const getServiceIcon = (serviceTitle) => {
    const iconMap = {
      "Data Analytics": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3V21H21" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 16L12 11L16 15L21 10" stroke="#174d90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="7" cy="16" r="2" fill="#174d90"/>
          <circle cx="12" cy="11" r="2" fill="#174d90"/>
          <circle cx="16" cy="15" r="2" fill="#174d90"/>
          <circle cx="21" cy="10" r="2" fill="#174d90"/>
        </svg>
      ),
      "Software Engineering": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="#174d90" strokeWidth="2"/>
          <path d="M9 9H15M9 15H15M9 12H15" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      "Generative AI": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="#174d90" strokeWidth="2"/>
          <path d="M12 6V12L16 14" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="2" fill="#174d90"/>
        </svg>
      ),
      "Digital Transformation": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#174d90" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#174d90" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#174d90" strokeWidth="2" strokeLinejoin="round"/>
        </svg>
      ),
      "Experience Design": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="8" width="18" height="12" rx="2" stroke="#174d90" strokeWidth="2"/>
          <path d="M3 12C3 10.3431 4.34315 9 6 9H18C19.6569 9 21 10.3431 21 12" stroke="#174d90" strokeWidth="2"/>
          <circle cx="9" cy="15" r="1" fill="#174d90"/>
          <circle cx="15" cy="15" r="1" fill="#174d90"/>
          <path d="M12 5L12 9" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      "Digital Strategy": (
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 16V8C20.9996 7.64928 20.9071 7.30481 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.27L13 2.27C12.696 2.09446 12.3511 2.00205 12 2.00205C11.6489 2.00205 11.304 2.09446 11 2.27L4 6.27C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.30481 3.00036 7.64928 3 8V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16Z" stroke="#174d90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3.27002 6.96L12 12.01L20.73 6.96" stroke="#174d90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 22.08V12" stroke="#174d90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    };

    return iconMap[serviceTitle] || (
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="#174d90" strokeWidth="2"/>
        <path d="M9 9H15M9 15H15" stroke="#174d90" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  };

  if (imageError || !src) {
    return (
      <div className={`service-icon-fallback ${className}`}>
        {getServiceIcon(title)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`service-image ${className}`}
      onError={() => setImageError(true)}
    />
  );
};

export default ServiceImage;

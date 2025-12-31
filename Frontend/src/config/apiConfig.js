// API Configuration
// Update these values with your actual production URLs

const API_CONFIG = {
  // Development API URL
  development: "http://localhost:5000/api",
  
  // Production API URL - UPDATE THIS WITH YOUR RENDER BACKEND URL
  // Example: "https://zedflux-backend.onrender.com/api"
  // Get your URL from: https://dashboard.render.com → Your Service → URL
  // 
  // Option 1: Set REACT_APP_API_URL_PROD when building
  // Option 2: Update the fallback URL below
  production: (() => {
    if (process.env.REACT_APP_API_URL_PROD) {
      const url = process.env.REACT_APP_API_URL_PROD.replace(/\/$/, '');
      return url.endsWith('/api') ? url : `${url}/api`;
    }
    // ⚠️ UPDATE THIS with your actual Render backend URL
    // Format: https://your-service-name.onrender.com/api
    return "https://your-backend-service.onrender.com/api";
  })(),
};

export const getApiBaseURL = () => {
  return API_CONFIG[process.env.NODE_ENV] || API_CONFIG.development;
};

export default API_CONFIG;


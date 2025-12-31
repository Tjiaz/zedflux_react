// frontend/src/utils/axiosConfig.js
import axios from "axios";
import { getApiBaseURL } from "../config/apiConfig";

const getBaseURL = () => {
  return getApiBaseURL();
};

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  timeout: 20000, // Increased timeout for RSS feed processing
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("API Request:", config.url);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Response Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;

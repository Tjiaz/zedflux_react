import React, { useState } from "react";
import axiosInstance from "../utils/axiosConfig";
import "./services.css";

const ServiceInquiryForm = ({ serviceType }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    company: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (status.error) {
      setStatus({ ...status, error: false, message: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: false, success: false, message: "" });

    try {
      const response = await axiosInstance.post("/service-inquiry", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        workEmail: formData.workEmail.trim(),
        company: formData.company.trim(),
        serviceType: serviceType,
      });

      setStatus({
        loading: false,
        error: false,
        success: true,
        message: response.data.message || "Thank you! We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        workEmail: "",
        company: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ ...status, success: false, message: "" });
      }, 5000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.";
      setStatus({
        loading: false,
        error: true,
        success: false,
        message: errorMessage,
      });
    }
  };

  return (
    <section className="contact-section">
      <h2>Ready to get started?</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          disabled={status.loading}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          disabled={status.loading}
        />
        <input
          type="email"
          name="workEmail"
          placeholder="Work Email"
          value={formData.workEmail}
          onChange={handleChange}
          required
          disabled={status.loading}
        />
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={formData.company}
          onChange={handleChange}
          required
          disabled={status.loading}
        />
        {status.loading && (
          <div className="form-status loading">Submitting...</div>
        )}
        {status.error && (
          <div className="form-status error">{status.message}</div>
        )}
        {status.success && (
          <div className="form-status success">{status.message}</div>
        )}
        <button type="submit" disabled={status.loading}>
          {status.loading ? "Submitting..." : "Get Started"}
        </button>
      </form>
    </section>
  );
};

export default ServiceInquiryForm;

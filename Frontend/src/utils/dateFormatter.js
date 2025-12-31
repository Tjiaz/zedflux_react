// src/utils/dateFormatter.js
export const formatDate = (dateString, category = "") => {
  if (!dateString) {
    return "Recently";
  }

  try {
    let date;

    // Handle different date formats
    if (typeof dateString === 'string') {
      // Try parsing ISO date string
      if (dateString.includes("T") || dateString.includes("Z")) {
        date = new Date(dateString);
      } 
      // Try parsing date with timezone
      else if (dateString.includes("GMT") || dateString.includes("BST") || dateString.includes("UTC")) {
        // Remove timezone abbreviation and try parsing
        const cleanDateString = dateString.replace(/(GMT|BST|UTC)/, "").trim();
        date = new Date(cleanDateString);
      } 
      // Try standard date parsing
      else {
        date = new Date(dateString);
      }
    } else if (dateString instanceof Date) {
      date = dateString;
    } else {
      date = new Date(dateString);
    }

    // Check if date is valid
    if (!date || isNaN(date.getTime())) {
      console.warn("Invalid date:", dateString);
      return "Recently";
    }

    // Get current date for comparison
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // If date is within last 7 days, show relative time
    if (diffDays <= 7) {
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
    }

    // Format the date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    console.warn("Date formatting error:", error, "for date:", dateString);
    return "Recently";
  }
};

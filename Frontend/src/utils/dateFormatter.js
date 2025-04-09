// src/utils/dateFormatter.js
export const formatDate = (dateString, category = "") => {
  try {
    let date;

    // Special handling for sports feed
    if (category.toLowerCase() === "sports") {
      // Log the original date string for debugging
      console.log("Sports date string:", dateString);

      // Try different parsing methods for sports dates
      if (dateString.includes("GMT") || dateString.includes("BST")) {
        // Remove timezone abbreviation and try parsing
        const cleanDateString = dateString.replace(/(GMT|BST|UTC)/, "").trim();
        date = new Date(cleanDateString);
      } else {
        // Try parsing the original string
        date = new Date(dateString);
      }
    } else {
      date = new Date(dateString);
    }

    // Check if date is valid
    if (isNaN(date.getTime())) {
      console.error("Invalid date:", dateString);
      return "Date unavailable";
    }

    // Format the date
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Date formatting error:", error, "for date:", dateString);
    return "Date unavailable";
  }
};

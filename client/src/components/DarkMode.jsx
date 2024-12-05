import React, { useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Specific texts that should not change color
  const preserveColors = [
    "User Information",
    "User's First Post",
    "User's Second Post",
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);

    if (!darkMode) {
      document.documentElement.classList.add("dark");

      // Reverts the color of the specific texts
      document.querySelectorAll("*").forEach((element) => {
        if (preserveColors.includes(element.textContent.trim())) {
          element.style.color = "#4a5568"; // Sets a fixed color
        }
      });
    } else {
      document.documentElement.classList.remove("dark");

      // Resets the color of the specific texts
      document.querySelectorAll("*").forEach((element) => {
        if (preserveColors.includes(element.textContent.trim())) {
          element.style.color = ""; // Removes manual styling
        }
      });
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center text-white text-lg hover:text-gray-300 transition-all"
    >
      {darkMode ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
    </button>
  );
};

export default DarkMode;

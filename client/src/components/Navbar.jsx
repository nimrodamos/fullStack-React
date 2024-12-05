import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "./DarkMode"; // Import the DarkMode component

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Add your search query handling logic here, like navigating to a search results page or calling an API
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-project-color text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <h1 className="text-2xl font-bold">Social Media</h1>

        {/* Search form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search users..."
            className="p-2 rounded-md text-black"
          />
          <button
            type="submit"
            className="p-2 rounded-md text-white"
            style={{
              backgroundColor: "#4a4a4a", // Dark gray
              transition: "background 0.3s ease",
            }}
            onMouseOver={
              (e) => (e.target.style.backgroundColor = "#6b6b6b") // Lighter gray on hover
            }
            onMouseOut={
              (e) => (e.target.style.backgroundColor = "#4a4a4a") // Reset to dark gray
            }
          >
            Search
          </button>
        </form>

        {/* Navigation links */}
        <ul className="flex space-x-4 items-center">
          <li>
            <Link to="/Home" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </li>
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              LogOut
            </Link>
          </li>
          {/* Dark Mode toggle */}
          <li>
            <DarkMode />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

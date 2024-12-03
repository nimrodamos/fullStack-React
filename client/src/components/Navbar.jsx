import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // הוסיפו כאן את הפעולה המתאימה לשאילתת החיפוש, כמו ניווט לעמוד תוצאות חיפוש או קריאה ל-API
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-project-color text-white p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold"> Social Media</h1>{" "}
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
              backgroundColor: "#4a4a4a", // אפור כהה
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#6b6b6b")} // צבע hover אפור בהיר יותר
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4a4a4a")}
          >
            Search
          </button>
        </form>
        <ul className="flex space-x-4">
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

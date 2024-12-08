import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiSearch } from "react-icons/fi";
import { FaSun, FaMoon } from "react-icons/fa";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { resetUser } from "../store/slices/userSlice";
import axios from "axios";

const menuLinks = [
  { to: "/Home", label: "Home" },
  { to: "/about", label: "About" },
];

const MenuItems = ({ onClick }) => (
  <ul className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 items-center">
    {menuLinks.map((link, index) => (
      <li
        key={index}
        className="transition-transform duration-200 hover:scale-110"
      >
        <Link
          to={link.to}
          className="text-white text-lg transition-transform duration-200 hover:text-gray-300"
          onClick={onClick}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleDarkMode = useCallback(() => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.documentElement.classList.toggle("dark", newMode);
  }, [darkMode]);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt");
    dispatch(resetUser());
    navigate("/");
  };

  const toggleMenu = useCallback(() => {
    setIsHovered((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/users/search", {
        params: { query: searchQuery },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      setSearchResults([]);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-4 shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold flex-shrink-0 pl-4 md:pl-0">
          Social Media
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex items-center bg-gray-200 rounded-full px-4 py-2 w-full max-w-md mx-4 md:mx-auto dark:bg-gray-700 relative"
        >
          <input
            type="text"
            placeholder="Search for users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-gray-800 dark:text-gray-300 w-full outline-none px-2"
          />
          <button
            type="submit"
            className="text-gray-500 dark:text-gray-300"
            aria-label="Search"
          >
            <FiSearch className="text-xl" />
          </button>
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-lg rounded mt-2 z-50">
              <ul>
                {searchResults.map((user) => (
                  <li
                    key={user._id}
                    className="p-2 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
                    onClick={() => navigate(`/profile/${user.username}`)}
                  >
                    <span className="font-medium text-gray-800 dark:text-gray-300">
                      {user.username}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>

        <div className="hidden md:flex items-center space-x-6 pr-4 md:pr-0">
          <MenuItems />
          <button
            onClick={handleLogout}
            className="text-white text-lg transition-transform duration-200 hover:text-gray-300"
          >
            Logout
          </button>
          <div
            className="cursor-pointer text-2xl transition-colors duration-200"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <div
            className="cursor-pointer text-2xl transition-colors duration-200"
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-800" />
            )}
          </div>
          <FiMenu
            className="text-white text-3xl cursor-pointer"
            aria-label="Menu"
            onClick={toggleMenu}
          />
        </div>
      </div>
      {isHovered && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30"
            onClick={closeMenu}
          ></div>
          <div
            className="fixed top-16 right-0 bg-gray-800 text-white p-6 rounded-l-md z-40 shadow-lg transition-transform duration-300"
            style={{ width: "250px" }}
          >
            <MenuItems onClick={closeMenu} />
            <button
              onClick={handleLogout}
              className="text-white text-lg transition-transform duration-200 hover:text-gray-300 w-full text-center mt-4"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

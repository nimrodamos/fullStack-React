import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold"> Social Media</h1>{" "}
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
            <Link to="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="hover:text-gray-300 transition-colors"
            >
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

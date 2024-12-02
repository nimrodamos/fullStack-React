import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-project-color text-white p-4 shadow-md sticky top-0 z-50">
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

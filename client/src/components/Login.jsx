import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });

      const { token, message } = response.data; // Get JWT token and message
      Cookies.set("jwt", token); // Store JWT in cookies

      // עדכון Redux עם נתוני המשתמש (לפי השרת שלך, תוסיף כאן Fetch user data אם צריך)
      alert(message); // הצגת הודעת הצלחה למשתמש
      navigate("/home"); // Navigate to home page
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Login failed. Please try again.";
      console.error("Error during sign-in:", errorMessage);
      setError(errorMessage); // Set error for UI
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 bg-opacity-70 backdrop-blur-md rounded shadow-md max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-project-color text-white py-2 px-4 rounded transition-colors"
          >
            Login
          </button>

          <div className="text-center">
            <p className="text-gray-500 mb-2">Don't have an account?</p>
            <Link
              to="/signup"
              className="text-blue-500 hover:text-blue-600 transition-colors underline"
            >
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

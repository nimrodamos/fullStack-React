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

  const handleFetch = async () => {
    try {
      const jwt = Cookies.get("jwt");
      const { data } = await axios.get("http://localhost:3000/users/get-self", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log(data);
      dispatch(setUser(data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/sign-in",
        { email, password },
        { withCredentials: true }
      );
      console.log("Response:", response.data);
      await handleFetch(); // קריאה ל-`handleFetch` לאחר התחברות
      navigate("/home"); // ניווט לדף הבית לאחר הצלחה
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Error during sign-in:");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-gray-100 bg-opacity-70 backdrop-blur-md rounded shadow-md max-w-md w-full p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors "
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

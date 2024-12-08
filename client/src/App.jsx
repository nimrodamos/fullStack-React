import "./app.css";

import Login from "./components/Login";
import Signup from "./components/SIgnup";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import WelcomePage from "./pages/WelcomePage";
import ProfilePage from "./pages/ProfilePage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/slices/userSlice";
import Cookies from "js-cookie";
import axios from "axios";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("jwt"); // Retrieve JWT from Cookies
      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setUser(response.data)); // Update Redux with user details
        } catch (error) {
          console.error("Failed to fetch user profile:", error.message);
        }
      }
    };

    fetchUser();
  }, [dispatch]); // Run once when the component mounts

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/Home" element={<HomePage />}></Route>
          <Route path="/About" element={<AboutPage />}></Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";

const WelcomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-project-color">
      {/* Additional information */}
      <div className="text-white text-center mt-8">
        <h1 className="text-3xl font-bold mb-6">Welcome</h1>
        <img
          src="https://cdn-icons-png.flaticon.com/512/1626/1626179.png"
          alt="Description"
          className="w-40 h-40 rounded-full object-cover mb-6" /* Circular and proportional image */
        />
        <h2>{user?.email || ""}</h2>
      </div>

      {/* Login form */}
      <div className="max-w-md w-full rounded-xl overflow-hidden ">
        <Login />
      </div>
    </div>
  );
};

export default WelcomePage;

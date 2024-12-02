import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";

const WelcomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div className="min-h-screen bg-blue-500 flex flex-col items-center justify-center">
      {/* מידע נוסף ב-WelcomePage */}
      <div className="text-white text-center mt-8">
        <h1 className="text-3xl font-bold">WelcomePage</h1>
        <h2>{user?.email || "Guest"}</h2>
      </div>

      {/* טופס Login */}
      <div className="bg-white rounded shadow-md max-w-md w-full">
        <Login />
      </div>
    </div>
  );
};

export default WelcomePage;

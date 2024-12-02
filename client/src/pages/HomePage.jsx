import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <h1>Social Network</h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default HomePage;

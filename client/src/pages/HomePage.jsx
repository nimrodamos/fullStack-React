import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Posts from "../components/post";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <Posts />
      <h1>{user?.email}</h1>
    </div>
  );
};

export default HomePage;

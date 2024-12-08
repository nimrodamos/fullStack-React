import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Posts from "../components/posts";
import AddPost from "../components/AddPost";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Navbar />
      <br></br>
      <AddPost />
      <Posts />
      <h1>{user?.email}</h1>
    </div>
  );
};

export default HomePage;

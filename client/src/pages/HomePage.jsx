import React from "react";
import { useSelector } from "react-redux";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Social Network</h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default HomePage;

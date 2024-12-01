import React from "react";
import { useSelector } from "react-redux";

const WelcomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>WelcomePage </h1>
      <h1>{user?.email}</h1>
    </div>
  );
};

export default WelcomePage;

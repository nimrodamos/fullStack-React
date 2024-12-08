import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logoutUser from "../store/slices/userSlice.js";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Remove JWT from cookies
    Cookies.remove("jwt");

    // Dispatch Redux action to reset user state
    dispatch(logoutUser()); // פעולה שמעדכנת את Redux, אם רלוונטי

    // Redirect to the welcome or login page
    navigate("/");
  }, [dispatch, navigate]);

  return <div className="text-center text-gray-500 mt-10">Logging out...</div>;
};

export default Logout;

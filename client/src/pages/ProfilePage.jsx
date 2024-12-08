import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { username } = useParams(); // Access the `username` from the URL
  const [user, setUser] = useState(null); // State to hold user data
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Fetch user details based on the username
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/users/name/${username}`
        );
        setUser(response.data); // Set user data
      } catch (err) {
        setError("User not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">{user.username}'s Profile</h1>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">About {user.username}</h2>
          <p className="mb-4 text-gray-800">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <p className="text-gray-600">{user.bio || "No bio available."}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

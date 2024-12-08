import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";

const ProfilePage = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/profile/${username}`
      );
      setUser(response.data.user);
      setPosts(response.data.posts);
    } catch (err) {
      console.error("Error fetching profile:", err.message);
      setError("Failed to load profile. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [username]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-500">User not found.</div>;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <header className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {user.username}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Email: {user.email}
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Joined:{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </header>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {user.username}'s Posts
          </h2>
          {posts.length > 0 ? (
            <Posts posts={posts} />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No posts available.
            </p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;

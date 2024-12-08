import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Posts from "../components/posts";

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
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 min-h-screen flex items-center justify-center">
        User not found.
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-10 text-center rounded-lg shadow-lg mb-8">
          <img
            src="https://img.lovepik.com/png/20231020/Birthday-party-cute-cat-avatar-happy-children-frame_280591_wh1200.png"
            alt={`${user.username}'s avatar`}
            className="w-24 h-24 rounded-full mx-auto shadow-lg border-4 border-white dark:border-gray-700"
          />
          <h1 className="text-5xl font-bold mt-4">{user.username}</h1>
          <p className="mt-2 text-lg font-light">
            {user.bio || "This user hasn't added a bio yet."}
          </p>
        </header>

        {/* About Section */}
        <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            About {user.username}
          </h2>
          <p className="mb-4 text-gray-800 dark:text-gray-300">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4 text-gray-800 dark:text-gray-300">
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </section>

        {/* Posts Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
            Posts by {user.username}
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

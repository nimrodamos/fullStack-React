import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const { username } = useParams(); // קבלת שם המשתמש מה-URL
  const [user, setUser] = useState(null); // מידע על המשתמש
  const [posts, setPosts] = useState([]); // רשימת הפוסטים
  const [error, setError] = useState(null); // שגיאות
  const [loading, setLoading] = useState(true); // מצב טעינה

  useEffect(() => {
    // שליפת המידע
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/users/profile/${username}`
        );

        setUser(response.data.user); // עדכון מצב המשתמש
        setPosts(response.data.posts); // עדכון מצב הפוסטים
      } catch (err) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return <div className="text-center text-gray-600">User not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <header className="text-center mb-6">
          <h1 className="text-4xl font-bold">{user.username}'s Profile</h1>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">About {user.username}</h2>
          <p className="mb-4 text-gray-800">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4 text-gray-800">
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-gray-600">{user.bio}</p>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Posts by {user.username}
          </h2>
          {posts.length > 0 ? (
            posts.map((post) => (
              <article
                key={post._id}
                className="border-b border-gray-300 pb-4 mb-4 last:border-none"
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </article>
            ))
          ) : (
            <p className="text-gray-600 text-center">No posts available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;

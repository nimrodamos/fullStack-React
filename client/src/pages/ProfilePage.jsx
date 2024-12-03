import React from "react";
import { useSelector } from "react-redux"; // נשתמש כדי לשלוף מידע מה-Redux
import Posts from "../components/Posts"; // ייבוא רכיב הפוסטים
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  // שליפת פרטי המשתמש מ-Redux
  const { name, email } = useSelector((state) => state.user);

  // רשימת הפוסטים לדוגמה, אפשר להחליף ב-API
  const userPosts = [
    {
      id: 1,
      title: "User's First Post",
      content: "This is the user's first post",
    },
    {
      id: 2,
      title: "User's Second Post",
      content: "This is the user's second post",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white shadow-md rounded p-4 mb-4 border">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p className="text-gray-700 mb-1">
            <strong>Name:</strong> {name || "Guest"}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Email:</strong> {email || "Not provided"}
          </p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
          {userPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded p-4 mb-4 border"
            >
              <h3 className="text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

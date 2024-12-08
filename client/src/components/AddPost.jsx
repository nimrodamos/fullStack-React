import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie"; // Import js-cookie to access the token

const AddPost = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);

  const handlePostSubmit = async () => {
    if (!user || !user._id) {
      alert("You must be logged in to add a post.");
      return;
    }

    if (!title.trim() || !content.trim()) {
      alert("Both title and content are required.");
      return;
    }

    try {
      const token = Cookies.get("jwt"); // Retrieve the JWT from cookies

      const response = await axios.post(
        "http://localhost:5000/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct syntax for the token
          },
        }
      );

      alert("Post added successfully!");
      setTitle("");
      setContent("");

      if (onPostAdded) {
        onPostAdded(response.data); // Notify parent about the new post
      }
    } catch (error) {
      console.error("Error adding post:", error.message);
      alert("Failed to add the post. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Add New Post
      </h1>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
      />
      <button
        onClick={handlePostSubmit}
        className="bg-blue-500 dark:bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
      >
        POST
      </button>
    </div>
  );
};

export default AddPost;

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

    if (!title || !content) {
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
            Authorization: `Bearer ${token}`, // Add the token to the Authorization header
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
      alert("Failed to add the post.");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Post Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 rounded"
      />
      <button
        onClick={handlePostSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        POST
      </button>
    </div>
  );
};

export default AddPost;

import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaMapMarkerAlt } from "react-icons/fa";
import Cookies from "js-cookie";

const AddPost = ({ onPostAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const user = useSelector((state) => state.user);

  const emojis = ["😊", "😢", "😂", "😡", "😍", "🎉", "💔", "🤔", "🙌", "🌟"];

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
      const token = Cookies.get("jwt");

      const response = await axios.post(
        "http://localhost:5000/posts",
        {
          title,
          content,
          location,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post added successfully!");
      setTitle("");
      setContent("");
      setLocation("");

      if (onPostAdded) {
        onPostAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding post:", error.message);
      alert("Failed to add the post.");
    }
  };

  const handleAddEmoji = (emoji) => {
    setContent((prev) => prev + emoji);
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = "https://www.google.com/maps";
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div className="max-w-md mx-auto bg-gray-100 dark:bg-gray-800 shadow-lg rounded-xl p-6 border border-gray-300 dark:border-gray-700">
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
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-3 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
      ></textarea>

      {/* Emoji Selector */}
      <div className="mb-4">
        <h2 className="text-gray-800 dark:text-gray-300 mb-2">Add Emoji:</h2>
        <div className="grid grid-cols-5 gap-2">
          {emojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleAddEmoji(emoji)}
              className="text-2xl p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-blue-400 dark:hover:bg-blue-600 transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Location Input */}
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
        />
        <button
          onClick={openGoogleMaps}
          className="ml-3 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
          title="Open Google Maps"
        >
          <FaMapMarkerAlt size={20} />
        </button>
      </div>

      <button
        onClick={handlePostSubmit}
        className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        POST
      </button>
    </div>
  );
};

export default AddPost;

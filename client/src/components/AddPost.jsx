import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const AddPost = ({ refreshPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const handlePostSubmit = async () => {
    if (!title || !content) {
      alert("Both title and content are required.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/posts", {
        title,
        content,
        authorId: user._id, // ID of an existing user
      });

      alert("Post created successfully!");
      setTitle("");
      setContent("");

      // Refresh posts after adding the new one
      if (refreshPosts) refreshPosts();
    } catch (error) {
      console.error("Error creating post:", error.message);
      alert("Failed to create the post.");
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
        Submit
      </button>
    </div>
  );
};

export default AddPost;

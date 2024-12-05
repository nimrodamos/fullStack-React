import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPost from "./AddPost"; // Import AddPost component

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts:", err.message);
      setError("Failed to fetch posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const refreshPosts = () => {
    fetchPosts(); // Refresh posts by fetching them again from the server
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>

      {/* AddPost Component */}
      <AddPost refreshPosts={refreshPosts} />

      {/* Posts List */}
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-lg rounded-lg mb-6 border"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="mb-4 text-gray-800">{post.content}</p>
            <div className="text-sm text-gray-500">
              Author ID: {post.authorId}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

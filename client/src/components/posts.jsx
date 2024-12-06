import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts from the server
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data); // Update the posts
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center text-gray-500">No posts available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white shadow-lg rounded-lg mb-6 border"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">
              {post.title || "Untitled Post"}
            </h2>
            <p className="mb-4 text-gray-800">
              {post.content || "No content available"}
            </p>
            <div className="text-sm text-gray-500">
              Author ID:{" "}
              {post.authorId && typeof post.authorId === "object"
                ? post.authorId._id || "Unknown"
                : post.authorId || "Unknown"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

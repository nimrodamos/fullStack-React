import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState({}); // Store new comment text for each post
  const userId = useSelector((state) => state.user._id); // Get logged-in user ID from Redux store

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

  // Handle adding a new comment
  const handleAddComment = async (postId) => {
    if (!newComment[postId]) return;

    try {
      const response = await axios.post("http://localhost:5000/comments", {
        postId,
        text: newComment[postId],
        authorId: userId,
      });

      // Update the specific post's comments in state
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: "" })); // Clear the comment input
    } catch (err) {
      console.error("Error adding comment:", err.message);
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
              {post.authorId?.username ? (
                <Link
                  to={`/profile/${post.authorId.username}`}
                  className="text-blue-500 hover:underline"
                >
                  {post.authorId.username}
                </Link>
              ) : (
                "Unknown"
              )}
            </h2>

            <p className="mb-4 text-gray-800">
              {post.content || "No content available"}
            </p>

            <div className="text-sm text-gray-500">
              {post.title || "Untitled Post"}
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6 border-t">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            {post.comments.length > 0 ? (
              <ul className="mb-4">
                {post.comments.map((comment) => (
                  <li key={comment._id} className="mb-2">
                    <strong>{comment.authorId?.username || "Unknown"}:</strong>{" "}
                    {comment.text}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}

            <textarea
              value={newComment[post._id] || ""}
              onChange={(e) =>
                setNewComment((prev) => ({
                  ...prev,
                  [post._id]: e.target.value,
                }))
              }
              placeholder="Add a comment..."
              className="w-full border rounded p-2 mb-2"
            ></textarea>
            <button
              onClick={() => handleAddComment(post._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Post Comment
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

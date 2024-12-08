import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState({});
  const [likedUsers, setLikedUsers] = useState([]);
  const [showLikes, setShowLikes] = useState(null);
  const userId = useSelector((state) => state.user._id);

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

  const handleLikeToggle = async (postId) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/posts/${postId}/toggle-like`,
        { userId }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                likes: response.data.likes,
                likedBy: response.data.likedBy,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error toggling like:", err.message);
    }
  };

  const fetchLikedUsers = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/posts/${postId}/likes`
      );
      setLikedUsers(response.data);
      setShowLikes(postId);
    } catch (err) {
      console.error("Error fetching liked users:", err.message);
    }
  };

  const handleAddComment = async (postId) => {
    if (!newComment[postId]) return;

    try {
      const response = await axios.post("http://localhost:5000/comments", {
        postId,
        text: newComment[postId],
        authorId: userId,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data] }
            : post
        )
      );
      setNewComment((prev) => ({ ...prev, [postId]: "" }));
    } catch (err) {
      console.error("Error adding comment:", err.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">{error}</div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        No posts available.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Posts
      </h1>
      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg mb-6 border border-gray-300 dark:border-gray-700"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
              {post.authorId?.username ? (
                <Link
                  to={`/profile/${post.authorId.username}`}
                  className="text-blue-500 dark:text-blue-400 hover:underline"
                >
                  {post.authorId.username}
                </Link>
              ) : (
                "Unknown"
              )}
            </h2>

            <p className="mb-4 text-gray-800 dark:text-gray-300">
              {post.content || "No content available"}
            </p>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              {post.title || "Untitled Post"}
            </div>

            <div className="flex items-center mt-4">
              <button
                onClick={() => handleLikeToggle(post._id)}
                className={`px-4 py-2 rounded ${
                  post.likedBy?.includes(userId)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {post.likedBy?.includes(userId) ? "Unlike" : "Like"}
              </button>
              <span
                onClick={() => fetchLikedUsers(post._id)}
                className="ml-2 text-blue-500 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {post.likes || 0} likes
              </span>
            </div>

            {showLikes === post._id && (
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-2">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-white">
                  Liked by:
                </h4>
                <ul>
                  {likedUsers.length > 0 ? (
                    likedUsers.map((user) => (
                      <li
                        key={user._id}
                        className="text-gray-800 dark:text-gray-300"
                      >
                        {user.username} ({user.email})
                      </li>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                      No likes yet.
                    </p>
                  )}
                </ul>
                <button
                  onClick={() => setShowLikes(null)}
                  className="mt-2 text-sm text-red-500 hover:underline"
                >
                  Close
                </button>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-300 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Comments
            </h3>
            {post.comments.length > 0 ? (
              <ul className="mb-4">
                {post.comments.map((comment) => (
                  <li key={comment._id} className="mb-2">
                    <strong className="text-gray-800 dark:text-white">
                      {comment.authorId?.username || "Unknown"}:
                    </strong>{" "}
                    <span className="text-gray-800 dark:text-gray-300">
                      {comment.text}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No comments yet.
              </p>
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
              className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 mb-2 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
            ></textarea>
            <button
              onClick={() => handleAddComment(post._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-700"
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

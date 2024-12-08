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
  const [newComment, setNewComment] = useState({}); // תגובות חדשות
  const [likedUsers, setLikedUsers] = useState([]); // רשימת משתמשים שעשו לייק
  const [showLikes, setShowLikes] = useState(null); // הצגת לייקים
  const userId = localStorage.getItem("userId"); // המזהה של המשתמש המחובר

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/users/profile/${username}`
        );
        setUser(response.data.user);
        setPosts(response.data.posts);
      } catch (err) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

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
              <div
                key={post._id}
                className="bg-white shadow-lg rounded-lg mb-6 border"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{post.title}</h3>
                  <p className="mb-4 text-gray-800">
                    {post.content || "No content available"}
                  </p>

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
                      className="ml-2 text-blue-500 hover:underline cursor-pointer"
                    >
                      {post.likes || 0} likes
                    </span>
                  </div>

                  {showLikes === post._id && (
                    <div className="bg-gray-100 p-4 rounded mt-2">
                      <h4 className="font-semibold mb-2">Liked by:</h4>
                      <ul>
                        {likedUsers.length > 0 ? (
                          likedUsers.map((user) => (
                            <li key={user._id} className="text-gray-700">
                              {user.username} ({user.email})
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-500">No likes yet.</p>
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

                <div className="p-6 border-t">
                  <h3 className="text-xl font-semibold mb-4">Comments</h3>
                  {post.comments.length > 0 ? (
                    <ul className="mb-4">
                      {post.comments.map((comment) => (
                        <li key={comment._id} className="mb-2">
                          <strong>
                            {comment.authorId?.username || "Unknown"}:
                          </strong>{" "}
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

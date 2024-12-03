import React, { useState } from "react";

const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post",
      author: "John Doe",
      likes: 0,
      liked: false,
      comments: [],
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post",
      author: "Jane Smith",
      likes: 0,
      liked: false,
      comments: [],
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the content of the third post",
      author: "Alice Johnson",
      likes: 0,
      liked: false,
      comments: [],
    },
  ]);

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleAddComment = (postId, comment) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-lg rounded-lg mb-6 border"
        >
          {/* תוכן הפוסט */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2">{post.author}</h2>
            <p className="mb-4 text-gray-800">{post.content}</p>
            <div className="text-sm text-gray-500">title: {post.title}</div>
          </div>

          {/* קו הפרדה */}
          <hr className="border-t border-gray-300 my-4" />

          {/* אזור אינטראקציות */}
          <div className="px-6 pb-6">
            <div className="flex justify-between items-center mb-4">
              {/* כפתור לייק */}
              <button
                onClick={() => toggleLike(post.id)}
                className={`px-4 py-2 rounded-full ${
                  post.liked
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-black"
                }`}
              >
                {post.liked ? "Unlike" : "Like"}{" "}
                {post.likes > 0 ? `(${post.likes})` : ""}
              </button>
            </div>

            {/* אזור תגובות */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Comments</h3>
              <ul className="space-y-2">
                {post.comments.length > 0 ? (
                  post.comments.map((comment, index) => (
                    <li
                      key={index}
                      className="bg-gray-100 text-gray-800 rounded-md p-2 shadow"
                    >
                      {comment}
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400">No comments yet.</li>
                )}
              </ul>
              {/* הוספת תגובה */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  className="w-full p-2 border rounded"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                      handleAddComment(post.id, e.target.value.trim());
                      e.target.value = ""; // Reset the input field
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

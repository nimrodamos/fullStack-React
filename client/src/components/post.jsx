import React from "react";

const Posts = () => {
  // רשימת פוסטים סטטית
  const posts = [
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "Third Post",
      content: "This is the content of the third post",
      author: "Alice Johnson",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded p-4 mb-4 border"
        >
          <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="text-sm text-gray-500">Author: {post.author}</div>
        </div>
      ))}
    </div>
  );
};

export default Posts;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Posts = () => {
//   const [posts, setPosts] = useState([]);
//   const [comments, setComments] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/posts");
//       setPosts(response.data);
//     } catch (err) {
//       setError("Failed to load posts. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchComments = async (postId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/comments/post/${postId}`
//       );
//       setComments((prev) => ({ ...prev, [postId]: response.data }));
//     } catch (err) {
//       console.error("Failed to load comments:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Posts</h1>
//       {posts.length > 0 ? (
//         posts.map((post) => (
//           <div
//             key={post._id}
//             className="bg-white shadow-md rounded p-4 mb-4 border"
//           >
//             <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
//             <p className="text-gray-700 mb-3">{post.content}</p>
//             <div className="text-sm text-gray-500">Author: {post.authorId}</div>
//             <button
//               onClick={() => fetchComments(post._id)}
//               className="text-blue-500 underline mt-2"
//             >
//               View Comments
//             </button>
//             {comments[post._id] && (
//               <ul className="mt-3 text-gray-700">
//                 {comments[post._id].map((comment) => (
//                   <li key={comment._id} className="border-t pt-2 mt-2">
//                     {comment.text}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))
//       ) : (
//         <div>No posts available.</div>
//       )}
//     </div>
//   );
// };

// export default Posts;

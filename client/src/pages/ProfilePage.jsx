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

  useEffect(() => {
    // שליפת המידע
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/users/profile/${username}`
        );

        setUser(response.data.user); // עדכון מצב המשתמש
        setPosts(response.data.posts); // עדכון מצב הפוסטים
      } catch (err) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

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
              <article
                key={post._id}
                className="border-b border-gray-300 pb-4 mb-4 last:border-none"
              >
                <h3 className="text-xl font-bold">{post.title}</h3>
                <p className="text-gray-700">{post.content}</p>
              </article>
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

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// const ProfilePage = () => {
//   const { username } = useParams(); // Nome de usuário da URL
//   const [user, setUser] = useState(null); // Dados do usuário
//   const [posts, setPosts] = useState([]); // Lista de posts
//   const [error, setError] = useState(null); // Estado de erro
//   const [loading, setLoading] = useState(true); // Estado de carregamento
//   const [editingBio, setEditingBio] = useState(""); // Estado para edição da bio

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           http://localhost:5000/users/profile/${username}
//         );
//         setUser(response.data.user);
//         setPosts(response.data.posts);
//         setEditingBio(response.data.user.bio || ""); // Inicializa a bio
//       } catch (err) {
//         setError("Failed to fetch profile.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [username]);

//   const handleBioSave = async () => {
//     if (!editingBio.trim()) {
//       alert("Bio cannot be empty.");
//       return;
//     }

//     try {
//       // Este código envia para o backend quando ele existir.
//       const response = await axios.put(
//         http://localhost:5000/users/profile/${username}/updateBio,
//         { bio: editingBio }
//       );

//       // Atualiza o estado do usuário localmente.
//       setUser((prevUser) => ({
//         ...prevUser,
//         bio: response.data.bio,
//       }));
//     } catch (err) {
//       alert("Failed to update bio. Please try again later.");
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   if (!user) {
//     return <div className="text-center text-gray-600">User not found.</div>;
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="bg-gray-100 min-h-screen">
//         {/* Header */}
//         <header className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-10 text-center">
//           <img
//             src="https://img.lovepik.com/png/20231020/Birthday-party-cute-cat-avatar-happy-children-frame_280591_wh1200.png"
//             alt={${user.username}'s avatar}
//             className="w-24 h-24 rounded-full mx-auto shadow-lg border-4 border-white"
//           />
//           <h1 className="text-5xl font-bold mt-4">{user.username}</h1>

//           {/* Bio Section */}
//           <div className="mt-4">
//             {user.bio ? (
//               <p className="mt-2 text-lg font-light">{user.bio}</p>
//             ) : (
//               <div>
//                 <input
//                   type="text"
//                   value={editingBio}
//                   onChange={(e) => setEditingBio(e.target.value)}
//                   placeholder="Add your bio here 😊"
//                   className="text-gray-700 p-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 w-80"
//                 />
//                 <button
//                   onClick={handleBioSave}
//                   className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             )}
//           </div>
//         </header>

//         {/* Main Content */}
//         <div className="max-w-5xl mx-auto p-6">
//           {/* About Section */}
//           <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
//             <h2 className="text-2xl font-semibold mb-4">About {user.username}</h2>
//             <p className="mb-4 text-gray-800">
//               <strong>Email:</strong> {user.email}
//             </p>
//             <p className="mb-4 text-gray-800">
//               <strong>Joined:</strong>{" "}
//               {new Date(user.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </section>

//           {/* Posts Section */}
//           <section>
//             <h2 className="text-2xl font-semibold mb-4 text-center">
//               Posts by {user.username}
//             </h2>
//             {posts.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {posts.map((post) => (
//                   <article
//                     key={post._id}
//                     className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
//                   >
//                     <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
//                     <p className="text-gray-600">{post.content}</p>
//                   </article>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-gray-600 text-center">No posts available.</p>
//             )}
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

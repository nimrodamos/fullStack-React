import React, { useState } from "react";
import { FaPhotoVideo, FaSmile, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";

function AddPost() {
  const [postContent, setPostContent] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState("");
  const [emoji, setEmoji] = useState("");

  const handlePostSubmit = async () => {
    if (!postContent) {
      alert("You forgot to write something for your post :)");
      return;
    }

    const formData = new FormData();
    formData.append("content", postContent);
    if (photo) formData.append("photo", photo);
    if (location) formData.append("location", location);
    if (emoji) formData.append("emoji", emoji);

    try {
      const response = await axios.post(
        "https://api.example.com/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Post created successfully!");
      console.log(response.data);
      setPostContent("");
      setPhoto(null);
      setLocation("");
      setEmoji("");
    } catch (error) {
      console.error("Erro on creating post:", error);
      alert("Error on creating your post. Try again");
    }
  };

  const handlePhotoUpload = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-5">
      <div className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="What would you like to share? :)"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center justify-center text-gray-500 bg-gray-100 p-3 rounded-full cursor-pointer hover:bg-gray-200">
          <FaPhotoVideo className="text-xl" />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
        <button
          className="flex items-center justify-center text-gray-500 bg-gray-100 p-3 rounded-full hover:bg-gray-200"
          onClick={() => setEmoji("😁")}
        >
          <FaSmile className="text-xl" />
        </button>
        <button
          className="flex items-center justify-center text-gray-500 bg-gray-100 p-3 rounded-full hover:bg-gray-200"
          onClick={() => setLocation("Minha localização")}
        >
          <FaMapMarkerAlt className="text-xl" />
        </button>
      </div>
      <button
        className="w-full bg-project-color text-white font-bold py-2 rounded-lg "
        onClick={handlePostSubmit}
      >
        Post
      </button>
    </div>
  );
}

export default AddPost;

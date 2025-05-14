// CreatePost.js
import React, { useState } from "react";
import API from "../api";

export default function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // adjust if stored elsewhere

      const res = await API.post(
        "/post",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Post Created!");
      setTitle("");
      setContent("");

      if (onPostCreated) {
        onPostCreated(res.data); // send new post back to parent
      }
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to create post. Check console."
      );
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Enter content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <br />
      <button type="submit">Create Post</button>
    </form>
  );
}

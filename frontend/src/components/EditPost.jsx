import React, { useState } from "react";
import API from "../api";

export default function EditPost({ postId }) {
  const [content, setContent] = useState("");

  const handleEdit = async (e) => {
    e.preventDefault();
    await API.put(`/editPost/${postId}`, { content });
    alert("Post edited!");
  };

  return (
    <form onSubmit={handleEdit}>
      <textarea onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Save Edit</button>
    </form>
  );
}

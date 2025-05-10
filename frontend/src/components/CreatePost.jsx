import React, { useState } from "react";
import API from "../api";

export default function CreatePost() {
  const [content, setContent] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await API.post("/post", { content });
    console.log(res);
    alert("Post Created!");
  };

  return (
    <form onSubmit={handleCreate}>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Create Post</button>
    </form>
  );
}

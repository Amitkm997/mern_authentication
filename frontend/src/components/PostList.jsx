import React, { useEffect, useState } from "react";
import API from "../api";
import EditPost from "./EditPost";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token in localStorage:", token);
    API.get("/allPosts")
      .then((res) => setPosts(res.data))
      .catch((err) => {
        if (err.config && err.config.headers) {
          console.log("Request headers:", err.config.headers);
        }
        console.error("Error fetching posts:", err);
      });
  }, []);

  const like = async (id) => {
    try {
      await API.put(`/likePost/${id}`);
      alert("Post liked!");
    } catch (err) {
      alert("Error liking post: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      {posts.map((p) => (
        <div key={p._id}>
          <p>{p.content}</p>
          <button onClick={() => like(p._id)}>Like</button>
          <button onClick={() => setEditingPostId(p._id)}>Edit</button>
        </div>
      ))}
      {editingPostId && <EditPost postId={editingPostId} />}
    </div>
  );
}

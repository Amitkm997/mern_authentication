import React, { useEffect, useState } from "react";
import API from "../api";
import EditPost from "./EditPost";
import "../App.css";
export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    let a = API.get("/allPosts")
      .then((res) => setPosts(res.data.posts))
      .catch((err) => {
        if (err.config && err.config.headers) {
          console.log("Request headers:", err.config.headers);
        }
        console.error("Error fetching posts:", err);
      });
    console.log("return promises", a);
  }, []);

  const like = async (id) => {
    try {
      const { data: updatedPost } = await API.put(`/likePost/${id}`);
      // Update the post in state
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === id ? updatedPost : post))
      );

      // alert("Post liked!");
    } catch (err) {
      alert("Error liking post: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="post-container">
      {posts.map((p) => (
        <div key={p._id} className="post-card">
          <h1>{p.title}</h1>
          <p>Likes: {p.likes}</p>
          <div className="post-actions">
            <button onClick={() => like(p._id)} className="like-btn">
              Like
            </button>
            <button
              onClick={() => setEditingPostId(p._id)}
              className="edit-btn"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
      {editingPostId && <EditPost postId={editingPostId} />}
    </div>
  );
}

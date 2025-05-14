import React, { useState } from "react";
import API from "../api";
export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("");

    try {
      const res = await API.post("/register", form);
      console.log(res);
      setSuccess(res.data.message);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      setErr(message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Register</button>

      {err && <p style={{ color: "red" }}>{err}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

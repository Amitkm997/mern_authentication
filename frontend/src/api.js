import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL }); // adjust if needed

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

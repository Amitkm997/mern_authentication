import "./App.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <div>
      <nav style={{ margin: "10px" }}>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/create">CreatePost</Link>
      </nav>
    </div>
  );
}

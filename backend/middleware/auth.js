import jwt from "jsonwebtoken";
import Post from "../models/postModel.js";

export const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorization = async (req, res, next) => {
  let userId = req.user.id;
  let postId = req.params.postId;
  let post = await Post.findById(postId);
  if (!post) return res.send("invalid post");
  let loggedInUser = post.createdBy;

  if (loggedInUser != userId) res.send("unauthorized user");
  next();
};

import express from "express";
import { register, login } from "../controller/userController.js";
import {
  createPost,
  editPost,
  likePost,
  getAllposts,
} from "../controller/postController.js";
import { authentication, authorization } from "../middleware/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/posts", authentication, createPost);
router.get("/allPosts", authentication, getAllposts);
router.put("/likePost/:postId", authentication, likePost);
router.put("/editPost/:postId", authentication, authorization, editPost);
//protected route
router.post("/protect", authentication, (req, res) => {
  res.send("protected route");
});

export default router;

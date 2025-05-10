import mongoose, { model } from "mongoose";
const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  likes: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("post", postSchema);

export default Post;

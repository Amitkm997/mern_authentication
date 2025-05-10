import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.create({ title, content, createdBy: req.user.id });
  res.send(post);
};

export const getAllposts = async (req, res) => {
  const post = await Post.find();
  res.send(post);
};

export const likePost = async (req, res) => {
  let post = await Post.findById(req.params.postId);
  if (!post) return res.send("post not found");
  post.likes += 1;
  await post.save();
  res.send(post);
};

export const editPost = async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  const { title, content } = req.body;

  const post = await Post.findById(postId);
  console.log(post);
  if (!post) return res.send("post not avalilabel");

  post.title = title;
  post.content = content;

  post.save();
  res.send(post);
};

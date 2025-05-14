import Post from "../models/postModel.js";
export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const post = await Post.create({
      title,
      content,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); // newest first (optional)
    return res.status(200).json({
      message: "All posts fetched successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes += 1;
    const updatedPost = await post.save();

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error in likePost:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editPost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { title, content } = req.body;

    // Find the post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not available" });
    }

    // Update the post
    post.title = title || post.title;
    post.content = content || post.content;

    const updatedPost = await post.save();

    return res
      .status(200)
      .json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

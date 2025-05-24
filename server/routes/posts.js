const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

// Create a post
router.post("/", async (req, res) => {
  const { text, userId } = req.body;

  try {
    const post = await Post.create({ text, userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Failed to create post" });
  }
});

// Get posts by user
router.get("/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

module.exports = router;

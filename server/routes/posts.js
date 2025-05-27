const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.create({ text, userId: req.userId });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: "Can't create post" });
  }
});

router.get("/me", auth, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Can't get posts" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Can't get posts" });
  }
});

module.exports = router;


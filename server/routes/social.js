const express = require("express");
const User = require("../models/User");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

// Follow a dev
router.post("/follow/:id", auth, async (req, res) => {
  const userId = req.userId;
  const followId = req.params.id;
  if (userId === followId) return res.status(400).json({ error: "Sorry! you can not follow yourself." });
  try {
    await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } });
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });
    res.json({ message: "Followed user" });
  } catch {
    res.status(400).json({ error: "Failed to follow developer" });
  }
});

// Unfollow a dev
router.post("/unfollow/:id", auth, async (req, res) => {
  const userId = req.userId;
  const unfollowId = req.params.id;
  if (userId === unfollowId) return res.status(400).json({ error: "Cannot unfollow yourself" });
  try {
    await User.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });
    await User.findByIdAndUpdate(unfollowId, { $pull: { followers: userId } });
    res.json({ message: "Unfollowed" });
  } catch {
    res.status(400).json({ error: "Failed to unfollow developer" });
  }
});

// Timeline posts
router.get("/timeline", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const posts = await Post.find({ userId: { $in: user.following } }).sort({ timestamp: -1 }).populate("userId", "name");
    res.json(posts);
  } catch {
    res.status(500).json({ error: "Cannot fetch timeline" });
  }
});

// Explore users 
router.get("/explore", auth, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }, "_id name bio");
    res.json(users);
  } catch {
    res.status(500).json({ error: "Cannot fetch users" });
  }
});

module.exports = router;

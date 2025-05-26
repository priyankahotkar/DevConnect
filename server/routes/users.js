const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({
      _id: user._id,
      name: user.name,
      bio: user.bio,
      followers: user.followers,
      following: user.following
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;

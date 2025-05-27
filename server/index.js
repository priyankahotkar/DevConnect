const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const socialRoutes = require("./routes/social");
const userRoutes = require("./routes/users");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/users", userRoutes);
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error(err));

app.get("/", (req, res) => res.send("API running..."));

app.listen(5000, () => console.log("Server running on port 5000"));

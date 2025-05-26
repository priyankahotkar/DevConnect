import { useEffect, useState } from "react";
import axios from "axios";
import "@mui/material/styles";
import { Container, Typography, Paper, Button, Box, TextField, Divider } from "@mui/material";

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [following, setFollowing] = useState([]);
  const [newPost, setNewPost] = useState("");
  const token = localStorage.getItem("token");
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTimeline = async () => {
      const res = await axios.get("http://localhost:5000/api/social/timeline", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
    };
    const fetchSuggested = async () => {
      const res = await axios.get("http://localhost:5000/api/social/explore", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuggested(res.data);
    };
    const fetchMe = async () => {
      const res = await axios.get(`http://localhost:5000/api/users/${myId}`);
      setFollowing(res.data.following || []);
    };
    fetchTimeline();
    fetchSuggested();
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/posts", { text: newPost, userId: myId });
    setNewPost("");
    const res = await axios.get("http://localhost:5000/api/social/timeline", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setPosts(res.data);
  };

  const handleFollow = async (id) => {
    await axios.post(`http://localhost:5000/api/social/follow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFollowing([...following, id]);
    const res = await axios.get("http://localhost:5000/api/social/explore", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSuggested(res.data);
  };
  const handleUnfollow = async (id) => {
    await axios.post(`http://localhost:5000/api/social/unfollow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFollowing(following.filter(f => f !== id));
    const res = await axios.get("http://localhost:5000/api/social/explore", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSuggested(res.data);
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Timeline</Typography>
        <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
          <TextField
            label="What's on your mind?"
            multiline
            minRows={2}
            fullWidth
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }}>Post</Button>
        </form>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Posts from people you follow</Typography>
        {posts.length === 0 && <Typography>No posts yet. Follow users to see their posts.</Typography>}
        {posts.map((post) => (
          <Paper key={post._id} sx={{ p: 2, my: 1 }}>
            <Typography variant="subtitle2">{post.userId?.name || "User"}</Typography>
            <Typography>{post.text}</Typography>
            <Typography variant="caption" color="text.secondary">{new Date(post.timestamp).toLocaleString()}</Typography>
          </Paper>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Suggested Developers to Follow</Typography>
        {suggested.map(user => (
          <Paper key={user._id} sx={{ p: 2, my: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="subtitle1">{user.name}</Typography>
              <Typography variant="body2" color="text.secondary">{user.bio}</Typography>
            </Box>
            {following.includes(user._id) ? (
              <Button variant="outlined" color="secondary" onClick={() => handleUnfollow(user._id)}>Unfollow</Button>
            ) : (
              <Button variant="contained" color="primary" onClick={() => handleFollow(user._id)}>Follow</Button>
            )}
          </Paper>
        ))}
      </Paper>
    </Container>
  );
}

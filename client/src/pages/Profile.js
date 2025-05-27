import { useEffect, useState } from "react";
import axios from "axios";
import "@mui/material/styles";
import { Container, Typography, Paper, Button, Box, TextField, Divider } from "@mui/material";

const API_URL = "https://devconnect-d46p.onrender.com";

export default function Profile() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [timeline, setTimeline] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get(`${API_URL}/api/posts/user/${userId}`);
    setPosts(res.data);
  };

  const fetchTimeline = async () => {
    const res = await axios.get(`${API_URL}/api/social/timeline`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTimeline(res.data);
  };

  const fetchSuggested = async () => {
    const res = await axios.get(`${API_URL}/api/social/explore`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setSuggested(res.data);
  };

  const fetchMe = async () => {
    const res = await axios.get(`${API_URL}/api/users/${userId}`);
    setFollowing(res.data.following || []);
  };

  useEffect(() => {
    fetchPosts();
    fetchTimeline();
    fetchSuggested();
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/posts`, { text: newPost, userId }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setNewPost("");
    fetchPosts();
    fetchTimeline();
  };

  const handleFollow = async (id) => {
    await axios.post(`${API_URL}/api/social/follow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchSuggested();
    fetchMe();
    fetchTimeline();
  };
  const handleUnfollow = async (id) => {
    await axios.post(`${API_URL}/api/social/unfollow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchSuggested();
    fetchMe();
    fetchTimeline();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </Button>
      </Box>
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Your Profile</Typography>
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
        <Typography variant="h6">Your Posts</Typography>
        {posts.map((post) => (
          <Paper key={post._id} sx={{ p: 2, my: 1 }}>
            <Typography>{post.text}</Typography>
            <Typography variant="caption" color="text.secondary">{new Date(post.timestamp).toLocaleString()}</Typography>
          </Paper>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Timeline (Posts from devs)</Typography>
        {timeline.length === 0 && <Typography>No posts yet. Follow users to see their posts.</Typography>}
        {timeline.map((post) => (
          <Paper key={post._id} sx={{ p: 2, my: 1 }}>
            <Typography variant="subtitle2">{post.userId?.name || "User"}</Typography>
            <Typography>{post.text}</Typography>
            <Typography variant="caption" color="text.secondary">{new Date(post.timestamp).toLocaleString()}</Typography>
          </Paper>
        ))}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6">Developers you may know</Typography>
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
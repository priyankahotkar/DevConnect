import { useEffect, useState } from "react";
import axios from "axios";
import "@mui/material/styles";
import { Container, Typography, Paper, Button, Box } from "@mui/material";

const API_URL = "https://devconnect-d46p.onrender.com";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);
  const token = localStorage.getItem("token");
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get(`${API_URL}/api/social/explore`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    };
    const fetchMe = async () => {
      const res = await axios.get(`${API_URL}/api/users/${myId}`);
      setFollowing(res.data.following || []);
    };
    fetchUsers();
    fetchMe();
  }, []);

  const handleFollow = async (id) => {
    await axios.post(`${API_URL}/api/social/follow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFollowing([...following, id]);
    const res = await axios.get(`${API_URL}/api/social/explore`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
    const me = await axios.get(`${API_URL}/api/users/${myId}`);
    setFollowing(me.data.following || []);
  };
  const handleUnfollow = async (id) => {
    await axios.post(`${API_URL}/api/social/unfollow/${id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setFollowing(following.filter(f => f !== id));
    const res = await axios.get(`${API_URL}/api/social/explore`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
    const me = await axios.get(`${API_URL}/api/users/${myId}`);
    setFollowing(me.data.following || []);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Explore Developers</Typography>
        {users.map(user => (
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

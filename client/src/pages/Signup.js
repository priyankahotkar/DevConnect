import { useState } from "react";
import axios from "axios";
import "@mui/material/styles";
import { Container, Typography, TextField, Button, Paper, Link as MuiLink } from "@mui/material";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", bio: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert("All fields except bio are required.");
      return;
    }
    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert("Registered successfully!");
      window.location.href = "/login";
    } catch (err) {
      alert("Error registering: " + err.response?.data?.error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="name" label="Name" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="bio" label="Bio" fullWidth margin="normal" onChange={handleChange} />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Sign Up</Button>
        </form>
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account? <MuiLink href="/login">Login here</MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
}

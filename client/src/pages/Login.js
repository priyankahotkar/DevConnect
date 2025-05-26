import { useState } from "react";
import axios from "axios";
import "@mui/material/styles";
import { Container, Typography, TextField, Button, Paper } from "@mui/material";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      alert("Login successful");
      window.location.href = "/profile";
    } catch (err) {
      alert("Login failed: " + err.response?.data?.error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField name="email" label="Email" type="email" fullWidth margin="normal" onChange={handleChange} required />
          <TextField name="password" label="Password" type="password" fullWidth margin="normal" onChange={handleChange} required />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>Login</Button>
        </form>
      </Paper>
    </Container>
  );
}

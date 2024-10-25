import { useState } from 'react';
import { Box, Button, TextField, Typography } from "@mui/material";
import { shades } from "../../theme";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:1337/api/auth/local/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/');
      } else {
        setError(data.error?.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Box
      width="80%"
      margin="80px auto"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Box width="400px">
        <form onSubmit={handleSubmit}>
          <Typography variant="h3" textAlign="center" mb="30px">
            SIGN UP
          </Typography>

          {error && (
            <Typography color="error" textAlign="center" mb="20px">
              {error}
            </Typography>
          )}

          <TextField
            fullWidth
            label="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            type="password"
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            margin="normal"
            required
          />

          <Button
            fullWidth
            type="submit"
            sx={{
              backgroundColor: shades.primary[400],
              color: "white",
              borderRadius: 0,
              padding: "15px 40px",
              margin: "20px 0",
            }}
          >
            SIGN UP
          </Button>

          <Typography textAlign="center">
            Already have an account?{" "}
            <span
              style={{ color: shades.primary[400], cursor: "pointer" }}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </span>
          </Typography>
        </form>
      </Box>
    </Box>
  );
};

export default SignUp;
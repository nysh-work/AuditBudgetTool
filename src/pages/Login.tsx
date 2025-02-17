// src/pages/Login.tsx
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Create styled components
const StyledContainer = styled(Container)`
  box-shadow: 3;
  border-radius: 2;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({  // Style the text field
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.paper, // Use the theme's background color
}));

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic authentication logic (replace with your actual authentication)
    if (username === 'admin' && password === 'password') {
      // Set a token or user info in local storage (for now)
      localStorage.setItem('token', 'dummyToken');
      // Redirect to the dashboard or home page
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <StyledContainer maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <StyledTextField             // Use StyledTextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <StyledTextField             // Use StyledTextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledButton type="submit" fullWidth variant="contained">
            Sign In
          </StyledButton>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default Login;
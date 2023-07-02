import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, Button, Box } from '@mui/material';

interface Errors {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ email: '', password: '' });

  const handleLogin = () => {
    setErrors({ email: '', password: '' });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      return;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      return;
    }

    // Retrieve user data from local storage
    let storedUser = localStorage.getItem('user');

    // If user data is not found in local storage, try session storage
    if (!storedUser) {
      storedUser = sessionStorage.getItem('user');
    }

    // If user data is not found in local storage or session storage, try cookies
    if (!storedUser) {
      storedUser = getCookie('user');
    }

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        dispatch(setCurrentUser(parsedUser));
        setEmail('');
        setPassword('');
        toast.success('Login success');
        localStorage.setItem('login', 'true');
        navigate('/user');
        return;
      }
    }

    toast.error('Invalid email or password');
    setEmail('');
    setPassword('');
  };

  // Helper function to get cookie value by name
  const getCookie = (name: string) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return '';
  };

  return (
    <Box sx={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '10px', padding: '5px', textAlign: 'center' }}>LOGIN</h2>
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        type="text"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={Boolean(errors.email)}
        helperText={errors.email}
        color="success"
      />
      <TextField
        sx={{ marginBottom: '10px', width: '97%' }}
        type="password"
        label="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={Boolean(errors.password)}
        helperText={errors.password}
        color="success"
      />
      <Button
        sx={{
          backgroundColor: '#4caf50',
          color: 'white',
          padding: '10px',
          width: '97%', 
          borderRadius: '5px',
        }}
        onClick={handleLogin}
        variant="contained"
        color="success"
      >
        Login
      </Button>
      <ToastContainer />
    </Box>
  );
};

export default Login;

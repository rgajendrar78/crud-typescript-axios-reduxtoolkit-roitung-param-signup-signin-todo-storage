import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, Button } from '@mui/material';
import { SetCookies } from './utils/cookies';

interface Errors {
  name: string;
  email: string;
  password: string;
}
const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({ name: '', email: '', password: '' });
  const [storageOption, setStorageOption] = useState<string>('local'); // Default option: local

  const handleRegister = () => {
    setErrors({ name: '', email: '', password: '' });

    let isValid = true;

    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: 'Name is required',
      }));
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Invalid email format',
      }));
      isValid = false;
    }

    if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password should be at least 6 characters long',
      }));
      isValid = false;
    }

    if (isValid) {
      const user: any = { name, email, password };
      dispatch(setCurrentUser(user));
      setName('');
      setEmail('');
      setPassword('');
      if (storageOption === 'local') {
        localStorage.setItem('user', JSON.stringify(user));
      } else if (storageOption === 'session') {
        sessionStorage.setItem('user', JSON.stringify(user));
      } else if (storageOption === 'cookies') {
        SetCookies({ name: 'user', value: JSON.stringify(user) });
      }

      navigate('/login');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '10px', padding: '5px', textAlign: 'center' }}>REGISTRATION</h2>
      <TextField
        style={{ marginBottom: '10px' }}
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        variant="outlined"
        fullWidth
        error={Boolean(errors.name)}
        helperText={errors.name}
        color='success'
      />
      <TextField
        style={{ marginBottom: '10px' }}
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        fullWidth
        error={Boolean(errors.email)}
        helperText={errors.email}
        color='success'
      />
      <TextField
        style={{ marginBottom: '10px' }}
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        fullWidth
        error={Boolean(errors.password)}
        helperText={errors.password}
        color='success'
      />

      <FormControl color="success" style={{ marginBottom: '10px' }}>
        <FormLabel  id="demo-radio-buttons-group-label">
          Storage
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={storageOption}
          name="radio-buttons-group"
          onChange={(e) => {
            setStorageOption(e.target.value);
          }}
          
        >
          <FormControlLabel value="local" control={<Radio color='success' />} label="local" />
          <FormControlLabel value="session" control={<Radio color='success'/>} label="session" />
          <FormControlLabel value="cookies" control={<Radio color='success'/>} label="cookies" />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        color="success"
        style={{ marginBottom: '10px' }}
        onClick={handleRegister}
        fullWidth
      >
        Register
      </Button>
    </div>
  );
};

export default Registration;

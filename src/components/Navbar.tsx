import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
const Navbar = () => {
  const isLoggedIn = localStorage.getItem('login') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('login','false');
    navigate('/login');
  };

  return (
    <>
      <AppBar position="static" style={{ background: '#357a38' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CRUD
          </Typography>
          
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/">
              Register
            </Button>
          )}
          {!isLoggedIn && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
           {isLoggedIn && (
            <Button color="inherit" component={Link} to="/user">
              User
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/todo">
              TODO
            </Button>
          )}
          {isLoggedIn && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;

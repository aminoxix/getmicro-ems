import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";


import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { appContext } from '../../Context/context';


import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();


export default function Signin() {
  const [open, setOpen] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [message, setMessage] = useState();

  const { state } = useContext(appContext);
  

  

  const authentication = getAuth();
  let navigate = useNavigate();

  if (state.user) {
    navigate("/dashboard");
  }

  const handleShowSnackBar = () => {
    setShowSnackBar(true);
  };

  const handleCloseSnackBar = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackBar(false);
  };

  const closeBackDrop = () => {
    setOpen(false);
  }

  const handleToggle = () => {
    setOpen(!open);
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleToggle();
    
    const data = new FormData(event.currentTarget);
    signInWithEmailAndPassword(authentication, data.get('email'), data.get('password'))
      .then((response) => {
        closeBackDrop();
        setMessage("Signed in successfully");
        handleShowSnackBar();
        navigate('/dashboard')
      }).catch((error) => {
        setMessage(`${error}`);
        closeBackDrop();
        handleShowSnackBar();
      })
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  

  useEffect(() => {
      document.title = "Signin";
  }, []);

  
    return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={showSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={message}
        action={action}
      />
       <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
  
}
import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Link from '@mui/material/Link';

const LoginModal = ({ isOpen, onClose, onLogin, onOpenSignUp, username, setUsername, password, setPassword, userType, setUserType }) => {
  const checkCredentials = async () => {
    try {
      // Fetch user data from the server
      const response = await fetch('http://localhost:5000/users');
      const usersData = await response.json();

      // Find the user in the fetched data
      const user = usersData.find(
        (u) => u.username === username && u.password === password && u.userType === userType
      );

      if (user) {
        if(user.enable === true)
          onLogin();
        else{
        console.error('User Disabled');
        window.alert('User Disabled by ADMIN');
        }
      }
      else {
        console.error('Invalid credentials');
        window.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
      window.alert('An error occurred while validating credentials.');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} BackdropComponent={Backdrop} BackdropProps={{ invisible: false }}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'background.paper', border: '2px solid #000', p: 2 }}>
        <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" align="center" gutterBottom>
          Login
        </Typography>
        <Typography variant="subtitle1">Username</Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Password</Typography>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>User Type</Typography>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <InputLabel id="user-type-label"></InputLabel>
          <Select
            labelId="user-type-label"
            id="user-type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="faculty">Faculty</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
            <MenuItem value="moderator">Moderator</MenuItem>
            <MenuItem value="administrator">Administrator</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={checkCredentials} variant="contained" sx={{ mt: 2, width: '100%' }}>
          Login
        </Button>
        <Link component="button" variant="body2" onClick={onOpenSignUp} sx={{ display: 'block', textAlign: 'center', mt: 1 }}>
          Register New User
        </Link>
      </Box>
    </Modal>
  );
};

export default LoginModal;

// SignUpModal.js
import React from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

const SignUpModal = ({ isOpen, onClose, onRegister, username, setUsername, password, setPassword, userType, setUserType, firstName, setFirstName, lastName, setLastName }) => {
  const saveUserData = async () => {
    const userData = {
      username,
      password,
      userType,
      firstName,
      lastName,
      enable: true,
    };
  
    try {
      const response = await axios.post('http://localhost:5000/register', userData);
  
      if (response && response.data && response.data.message) {
        console.log(response.data.message);
        onRegister();
      } else {
        console.error('Unexpected response format:', response);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        console.error('Error registering user:', error.response.data.error);
      } else {
        console.error('Unexpected error format:', error);
      }
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} BackdropComponent={Backdrop} BackdropProps={{ invisible: false }}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'background.paper', border: '2px solid #000', p: 2 }}>
        <IconButton style={{ position: 'absolute', top: 0, right: 0 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" align="center" gutterBottom>
          Sign Up
        </Typography>
        <Typography variant="subtitle1">First Name</Typography>
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Last Name</Typography>
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Username</Typography>
        <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>Password</Typography>
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth sx={{ mt: 1 }} />
        <Typography variant="subtitle1" sx={{ mt: 2 }}>User Type</Typography>
        <FormControl fullWidth sx={{ mt: 1 }}>
          <Select
            labelId="signup-user-type-label"
            id="signup-user-type"
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
        <Button onClick={saveUserData} variant="contained" sx={{ mt: 2, width: '100%' }}>
          Register
        </Button>
      </Box>
    </Modal>
  );
};

export default SignUpModal;

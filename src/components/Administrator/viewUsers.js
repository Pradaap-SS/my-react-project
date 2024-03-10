// ViewUsers.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';

const defaultTheme = createTheme();

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const sections = [
    // Define your sections here
    // Each section could have a title, link, etc.
  ]; 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleEnableChange = async (username) => {
    try {
      const userToUpdate = users.find((user) => user.username === username);

      // If the user is currently enabled, show a confirmation dialog to disable
      if (userToUpdate.enable) {
        const confirmed = window.confirm('Do you want to disable the user?');

        if (confirmed) {
          // Toggle the "enable" property
          userToUpdate.enable = !userToUpdate.enable;

          // Update the user
          await axios.put(`http://localhost:5000/users/${userToUpdate.username}`, userToUpdate);
          console.log(userToUpdate)
          console.log(userToUpdate.username)

          // Update the state with the modified user
          setUsers(users.map((user) => (user.username === username ? userToUpdate : user)));
        }
      } else {
        // If the user is currently disabled, show a confirmation dialog to enable
        const confirmed = window.confirm('Do you want to enable the user?');

        if (confirmed) {
          // Toggle the "enable" property
          userToUpdate.enable = !userToUpdate.enable;

          // Update the user
          await axios.put(`http://localhost:5000/users/${userToUpdate.username}`, userToUpdate);
          console.log(userToUpdate)
          console.log(userToUpdate.username)

          // Update the state with the modified user
          setUsers(users.map((user) => (user.username === username ? userToUpdate : user)));
        }
      }
    } catch (error) {
      console.error('Error updating user:', error.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    <Container maxWidth="lg">
      <Header title="User List" sections={sections} />
    <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Username</th>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Password</th>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>User Type</th>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>First Name</th>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Last Name</th>
            <th style={{ backgroundColor: '#f2f2f2', border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>Enable</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{user.username}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{user.password}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{user.userType}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{user.firstName}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>{user.lastName}</td>
              <td style={{ border: '1px solid #dddddd', textAlign: 'left', padding: '8px' }}>
                {user.enable ? (
                  <span
                    onClick={() => handleEnableChange(user.username)}
                    style={{ cursor: 'pointer', color: 'green' }}
                  >
                    ✔️
                  </span>
                ) : (
                  <span
                    onClick={() => handleEnableChange(user.username)}
                    style={{ cursor: 'pointer', color: 'red' }}
                  >
                    ❌
                  </span>
                )}
              </td>
        </tr>
        ))}
    </tbody>
    </table>
</div>
</Container>
    </ThemeProvider>
);
};

export default ViewUsers;

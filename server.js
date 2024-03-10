// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 5000;
const cors = require('cors');


app.use(cors()); 

app.use(bodyParser.json());

// Load existing users from users.json
let users = [];
try {
  const usersData = fs.readFileSync('users.json', 'utf-8');
  users = JSON.parse(usersData);
} catch (error) {
  console.error('Error reading users.json:', error);
}

// Endpoint for user registration
app.post('/register', (req, res) => {
  const userData = req.body;

  const userExists = users.some((user) => user.username === userData.username);

  if (!userExists) {
    users.push(userData);
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.get('/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    console.error('Error sending users data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update user endpoint
app.put('/users/:username', (req, res) => {
  const username = req.params.username;
  const updatedUser = req.body;

  const index = users.findIndex(user => user.username === username);

  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };

    // Write the updated users array back to the file
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

    console.log(users[index]); // Log the updated user
    res.json(users[index]);   // Send the updated user as a response
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

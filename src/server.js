// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer = require('multer');


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

let topics = [];
try {
  const topicsData = fs.readFileSync('Topics.json', 'utf-8');
  topics = JSON.parse(topicsData);
} catch (error) {
  console.error('Error reading Topics.json:', error);
}

const addBlogPost = (topicName, blogPost) => {
  // Load and parse the topics.json file
  const data = fs.readFileSync('Topics.json', 'utf-8');
  const topics = JSON.parse(data).topics;

  // Find the index of the topic
  const topicIndex = topics.findIndex((topic) => topic.name === topicName);

  if (topicIndex !== -1) {
    // Add the blog post to the found topic

    blogPost.image = blogPost.image || 'https://source.unsplash.com/random?wallpapers';
    topics[topicIndex].blogs.push(blogPost);

    // Write the updated topics array back to the file
    fs.writeFileSync('Topics.json', JSON.stringify({ topics }, null, 2), 'utf-8');
    return true;
  }

  return false;
};

app.post('/createPost', (req, res) => {
  const { title, content, category } = req.body;
  console.log(req.body);

  const blogPost = {
    id: title.toLowerCase(),
    title,
    content,
    image,
  };
  console.log(blogPost)

  if (addBlogPost(category, blogPost)) {
    res.status(200).json({ message: 'Blog post created successfully' });
  } else {
    res.status(404).json({ error: 'Category not found' });
  }
});

let topicsData = [];  // Move the declaration outside the try block

// Handle DELETE request to delete a blog post
app.delete('/delete-blog/:topicName/:blogTitle', (req, res) => {
  const { topicName, blogTitle } = req.params;
  console.log(topicName, blogTitle);
  console.log(topicsData)
  const topicIndex = topics.findIndex((topic) => topic.name === topicName);
  
  console.log(topicIndex)
  if (topicIndex !== -1) {
    const blogIndex = topics[topicIndex].blogs.findIndex((blog) => blog.title === blogTitle);
    if (blogIndex !== -1) {
      topics[topicIndex].blogs.splice(blogIndex, 1);

      console.log(topics[topicIndex].blogs.splice(blogIndex, 1))

      fs.writeFileSync('./Topics.json', JSON.stringify(topicsData, null, 2));

      res.status(200).json({ message: `Blog "${blogTitle}" deleted successfully` });
      console.log(`Blog "${blogTitle}" deleted successfully`);
    } else {
      res.status(404).json({ message: 'Blog not found in the specified topic' });
    }
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});


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

// Function to read users data from the file
function getUsers() {
  try {
    const usersData = fs.readFileSync('users.json', 'utf-8');
    return JSON.parse(usersData);
  } catch (error) {
    console.error('Error reading users.json:', error);
    return [];
  }
}

// Function to write users data to the file
function saveUsers(users) {
  try {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing users data:', error);
  }
}

// Function to subscribe a user to a topic
function subscribeUser(username, topic) {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex !== -1) {
    if (!users[userIndex].subscriptions.includes(topic)) {
      users[userIndex].subscriptions.push(topic);
      saveUsers(users);
      console.log(`User ${username} subscribed to ${topic}.`);
      return true;
    } else {
      console.error(`User ${username} is already subscribed to ${topic}.`);
    }
  } else {
    console.error(`User ${username} not found.`);
  }
  return false;
}

// Function to unsubscribe a user from a topic
function unsubscribeUser(username, topic) {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.username === username);

  if (userIndex !== -1) {
    const subscriptions = users[userIndex].subscriptions;
    const topicIndex = subscriptions.indexOf(topic);
    if (topicIndex !== -1) {
      subscriptions.splice(topicIndex, 1);
      saveUsers(users);
      console.log(`User ${username} unsubscribed from ${topic}.`);
      return true;
    } else {
      console.error(`User ${username} is not subscribed to ${topic}.`);
    }
  } else {
    console.error(`User ${username} not found.`);
  }
  return false;
}

// Function to get subscriptions of a user
function getSubscriptions(username) {
  const users = getUsers();
  const user = users.find((user) => user.username === username);
  console.log("inside getsubscription");
  if (user) {
    return user.subscriptions;
  } else {
    console.error(`User ${username} not found.`);
    return [];
  }
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

  const image = ''
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

let topicsDel = [];

try {
  const topicsData = fs.readFileSync('Topics.json', 'utf-8');
  topicsDel = JSON.parse(topicsData);
} catch (error) {
  console.error('Error reading Topics.json:', error);
}

app.delete('/delete-blog/:topicName/:blogTitle', (req, res) => {
  const { topicName, blogTitle } = req.params;

  try {
    const topicsData = fs.readFileSync('Topics.json', 'utf-8');
    console.log('topicsData:', topicsData);  // Add this line
    topicsDel = JSON.parse(topicsData);
    console.log('topicsDel after parsing:', topicsDel);  // Add this line
  } catch (error) {
    console.error('Error reading Topics.json:', error);
  }
  // Find the index of the topic
  console.log('topicsDel:', topicsDel);  // Add this line

  const topicIndex = topicsDel.topics.findIndex((topic) => topic.name === topicName);

  if (topicIndex !== -1) {
    // Check if the 'blogs' property exists before accessing it
    if (topicsDel.topics[topicIndex].blogs) {
      const blogIndex = topicsDel.topics[topicIndex].blogs.findIndex((blog) => blog.title === blogTitle);

      if (blogIndex !== -1) {
        // Remove the blog from the 'blogs' array
        topicsDel.topics[topicIndex].blogs.splice(blogIndex, 1);

        // Write the updated data back to the file
        fs.writeFileSync('Topics.json', JSON.stringify(topicsDel, null, 2));

        res.status(200).json({ message: `Blog "${blogTitle}" deleted successfully` });
        console.log(`Blog "${blogTitle}" deleted successfully`);
      } else {
        res.status(404).json({ message: 'Blog not found in the specified topic' });
      }
    } else {
      res.status(404).json({ message: 'No blogs found in the specified topic' });
    }
  } else {
    res.status(404).json({ message: 'Topic not found' });
  }
});


// Endpoint to subscribe a user to a topic
app.post('/subscribe', (req, res) => {
  const { username, topic } = req.body;
  if (subscribeUser(username, topic)) {
    res.status(200).json({ message: `User ${username} subscribed to ${topic}` });
  } else {
    res.status(404).json({ error: 'Subscription failed' });
  }
});

// Endpoint to unsubscribe a user from a topic
app.post('/unsubscribe', (req, res) => {
  const { username, topic } = req.body;
  if (unsubscribeUser(username, topic)) {
    res.status(200).json({ message: `User ${username} unsubscribed from ${topic}` });
  } else {
    res.status(404).json({ error: 'Unsubscription failed' });
  }
});

// Endpoint to get subscriptions of a user
app.get('/subscriptions/:username', (req, res) => {
  const { username } = req.params;
  const subscriptions = getSubscriptions(username);
  res.json(subscriptions);
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


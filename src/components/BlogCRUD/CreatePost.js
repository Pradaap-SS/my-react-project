// CreatePost.js
//import axios from 'axios';
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';

const defaultTheme = createTheme();

const CreatePost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file);
  };

  const sections = [
    // Define your sections here
    // Each section could have a title, link, etc.
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);

    if (image) {
      formData.append('image', image);
    }

    onSubmit(formData);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header title="Create A Blog Post" sections={sections} />
      <Container>
        <div style={{
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label htmlFor="title" style={{ display: 'block', margin: '10px 0', fontWeight: 'bold' }}>Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            /><br />

            <label htmlFor="content" style={{ display: 'block', margin: '10px 0', fontWeight: 'bold' }}>Content:</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            ></textarea><br />

            <label htmlFor="category" style={{ display: 'block', margin: '10px 0', fontWeight: 'bold' }}>Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }}
            >
              <option value="Academic Resources">Academic Resources</option>
              <option value="Career Services">Career Services</option>
              <option value="Campus">Campus</option>
              <option value="Culture">Culture</option>
              <option value="Local Community Resources">Local Community Resources</option>
              <option value="Social">Social</option>
              <option value="Sports">Sports</option>
              <option value="Health and Wellness">Health and Wellness</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Alumni">Alumni</option>
            </select><br />

            <label htmlFor="image" style={{ display: 'block', margin: '10px 0', fontWeight: 'bold' }}>Attach Picture:</label>
            <input type="file" id="image" onChange={handleFileChange} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} /><br />

            <button type="submit" style={{ background: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Publish</button>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default CreatePost;


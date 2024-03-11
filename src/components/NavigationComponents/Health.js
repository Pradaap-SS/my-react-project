import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import topicsData from '../../Topics.json';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();

const Health = () => {
  const [selectedBlogId] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [healthSection, setHealthSection] = useState(/* initial value */);
  const topicName = "Health and Wellness"


  const handleCommentChange = (blogId, event) => {
    setNewComment({
      ...newComment,
      [blogId]: event.target.value,
    });
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return now.toLocaleDateString('en-US', options);
  };

  const handleAddComment = (blogId) => {
    const commentText = newComment[blogId]?.trim();

    if (!commentText) {
      return; // Don't add empty or whitespace-only comments
    }

    const existingComments = comments[blogId] || '';
    const dateTime = getCurrentDateTime();
    const updatedComments = {
      ...comments,
      [blogId]: existingComments
        ? `${existingComments}<br>${dateTime} - ${commentText}`
        : `${dateTime} - ${commentText}`,
    };

    localStorage.setItem('blogComments', JSON.stringify(updatedComments));
    setComments(updatedComments);
    setNewComment({
      ...newComment,
      [blogId]: '', // Clear the input after adding the comment
    });
  };

  const retrieveCommentsFromLocalStorage = () => {
    const storedComments = localStorage.getItem('blogComments');
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }
  };

  useEffect(() => {
    retrieveCommentsFromLocalStorage();
  }, []);

  const handleClearLocalStorage = () => {
    localStorage.clear();
    setComments({}); // Clear the state as well
  };

  const handleDeleteBlog = (topicName, blogTitle) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the blog "${blogTitle}"?`);
  
    if (isConfirmed) {
      fetch(`http://localhost:5000/delete-blog/${topicName}/${encodeURIComponent(blogTitle)}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error deleting blog: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          const updatedTopics = [...healthSection.topics];
          const topicIndex = updatedTopics.findIndex((topic) => topic.name === topicName);
  
          if (topicIndex !== -1) {
            updatedTopics[topicIndex].blogs = updatedTopics[topicIndex].blogs.filter(
              (blog) => blog.title !== blogTitle
            );
  
            setHealthSection((prev) => ({ ...prev, topics: updatedTopics }));
          } else {
            console.error('Error updating state: Topic not found');
          }
        })
        .catch((error) => {
          console.error('Error deleting blog:', error);
        });
    }
  };
  
  const HealthSection = topicsData.topics.find((topic) => topic.name === 'Health and Wellness');

  if (!HealthSection) {
    return (
      <div>
        <p>No Academic Resources found.</p>
      </div>
    );
  }

  const { name: title, blogs } = HealthSection;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={[HealthSection]} />
        <Grid container spacing={2}>
          {blogs.map((blog) => (
            <Grid item xs={12} sm={6} key={blog.id}>
              <Card style={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={blog.image || 'https://source.unsplash.com/random?wallpapers'}
                  alt={blog.title}
                />

                <CardContent>
                  <h2>{blog.title}</h2>
                  {selectedBlogId === blog.id ? (
                    <p>{blog.content}</p>
                  ) : (
                    <p>{blog.content.substring(0, 150)}...</p>
                  )}
                </CardContent>

                <CardActions>
                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '5px' }}>
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        value={newComment[blog.id] || ''}
                        onChange={(event) => handleCommentChange(blog.id, event)}
                      />
                    </div>
                    <Button size="small" onClick={() => handleAddComment(blog.id)}>
                      Add Comment
                    </Button>
                    <Button size="small" onClick={handleClearLocalStorage}>
                      Clear All Comments
                    </Button>
                    <div
                      style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}
                      dangerouslySetInnerHTML={{ __html: `<strong>Comments:</strong><br>${comments[blog.id] || ''}` }}
                    />
                    <Button size="small" onClick={() => handleDeleteBlog(topicName, blog.title)}>
                      Delete Post
                    </Button>

                  </div>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Health;

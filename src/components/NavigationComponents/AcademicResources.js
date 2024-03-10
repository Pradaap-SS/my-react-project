// AcademicResources.js

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import topicsData from '../../Topics.json';
// Import other necessary Material-UI components and styles

const defaultTheme = createTheme();

const AcademicResources = () => {
  // Filter topics to include only the "Academic Resources" section
  const academicResourcesSection = topicsData.topics.find(topic => topic.name === 'Academic Resources');

  if (!academicResourcesSection) {
    // Handle the case where the "Academic Resources" section is not found
    return (
      <div>
        <p>No Academic Resources found.</p>
      </div>
    );
  }

  // Extract the title and blogs from the Academic Resources section
  const { name: title, blogs } = academicResourcesSection;

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title={title} sections={[academicResourcesSection]} />
        {/* Render each blog within the Academic Resources section */}
        {blogs.map(blog => (
          <div key={blog.id}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
            {/* Display image with inline styling */}
            {blog.image && (
              <img
                src={blog.image}  // Assuming the images are in the public folder or have proper paths
                alt={blog.title}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  marginTop: '10px',  // Adjust as needed
                  marginBottom: '10px',  // Adjust as needed
                }}
              />
            )}
          </div>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default AcademicResources;

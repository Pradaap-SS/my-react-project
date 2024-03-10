import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/BlogUI/Blog';
import AcademicResources from './components/NavigationComponents/AcademicResources';
import CreatePost from './components/BlogCRUD/CreatePost';
import ViewUsers from './components/Administrator/viewUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Blog />} />
        <Route path="/createPost" element={<CreatePost/>} />
        <Route path="/technology" element={<h2>Technology Section</h2>} />
        <Route path="/design" element={<h2>Design Section</h2>} />
        <Route path="/academic-resources" element={<AcademicResources/>} />
        <Route path="/career-services" element={<h2>Career Services</h2>} />
        <Route path="/campus" element={<h2>Campus Section</h2>} />
        <Route path="/culture" element={<h2>Culture Section</h2>} />
        <Route path="/local-community-resources" element={<h2>Local Community Resources Section</h2>} />
        <Route path="/social" element={<h2>Social Section</h2>} />
        <Route path="/sports" element={<h2>Sports Section</h2>} />
        <Route path="/health-and-wellness" element={<h2>Health and Wellness Section</h2>} />
        <Route path="/travel" element={<h2>Travel Section</h2>} />
        <Route path="/alumni" element={<h2>Alumni Section</h2>} />
        <Route path="/viewUsers" element={<ViewUsers />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

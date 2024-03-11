import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blog from './components/BlogUI/Blog';
import AcademicResources from './components/NavigationComponents/AcademicResources';
import CreatePost from './components/BlogCRUD/CreatePost';
import ViewUsers from './components/Administrator/viewUsers';
import Health from './components/NavigationComponents/Health';
import Sports from './components/NavigationComponents/Sports';
import Social from './components/NavigationComponents/Social';
import Alumni from './components/NavigationComponents/Alumni';
import Culture from './components/NavigationComponents/Culture';
import Campus from './components/NavigationComponents/Campus';
import Travel from './components/NavigationComponents/Travel';
import Tech from './components/NavigationComponents/Tech';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Blog />} />
        <Route path="/viewUsers" element={<ViewUsers />} />
        <Route path="/createPost" element={<CreatePost/>} />
        <Route path="/technology" element={<Tech/>} />
        <Route path="/academic-resources" element={<AcademicResources/>} />
        {/*<Route path="/career-services" element={<CareerService/>} /> */}
        <Route path="/campus" element={<Campus/>} />
        <Route path="/culture" element={<Culture/>} />
        {/*<Route path="/local-community-resources" element={<LocalCommunity/>} />*/}
        <Route path="/social" element={<Social/>} />
        <Route path="/sports" element={<Sports/>} />
        <Route path="/health-and-wellness" element={<Health/>} />
        <Route path="/travel" element={<Travel/>} />
        <Route path="/alumni" element={<Alumni/>} />
        {/* Add more routes as needed */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;

// Header.js

import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import LoginModal from '../LoginModal';
import SignUpModal from '../Register/SignUpModal';
//import { subscribeUser, unsubscribeUser } from '../Subscription/subscription'; 

function Header(props) {
  const { sections, title } = props;
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [subscriptionsDropdownOpen, setSubscriptionsDropdownOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  


  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLoggedIn(true);
      const loggedInUser = localStorage.getItem('username');
      if (loggedInUser) {
        setUsername(loggedInUser);
      }
    } else {
      setLoggedIn(false);
    }
  }, [location]);
  

  const handleLogin = () => {
    // Handle login logic (e.g., check credentials)
    console.log('Login clicked:', username, password, userType);
    // Close the login modal
    setLoginModalOpen(false);
    // Set the user as logged in
    setLoggedIn(true);
    // Store the login status in local storage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', username); 
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
    // Set the user as logged out
    setLoggedIn(false);
    // Remove the login status from local storage
    localStorage.removeItem('isLoggedIn');
    navigate('/Blog');
  };

  const handleRegister = () => {
    // Handle registration logic
    console.log('Register clicked:', firstName, lastName, username, password, userType);
    // Close the signup modal
    setSignUpModalOpen(false);
  };

  const handleCreatePostNavigate = () => {
    navigate('/createPost');
  };

  const fetchSubscriptions = async () => {
    try {
      const response = await fetch(`http://localhost:5000/subscriptions/${username}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSubscriptions(data);
      } else {
        console.error('Failed to fetch subscriptions');
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };
  
  const handleSubscriptionToggle = async (topic) => {
    try {
      await fetchSubscriptions();
  
      const endpoint = username && subscriptions.includes(topic) ? '/unsubscribe' : '/subscribe';
  
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, topic })
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log success message
      } else {
        console.error('Subscription toggle failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error toggling subscription:', error.message);
    }
  };
  
  const toggleSubscriptionsDropdown = async () => {
    console.log("user");
    console.log(username);
    try {
      console.log(username);
      await fetchSubscriptions();
      setSubscriptionsDropdownOpen(!subscriptionsDropdownOpen);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };
  
  

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small" onClick={() => navigate('/Blog')}>
          Home
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
          
          {title !== "Blog" && ( // Check if title is not "Blog"
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleSubscriptionToggle(title)}
              sx={{ marginX: 1 }}
            >
              {username && subscriptions.includes(title)
                ? 'Unsubscribe'
                : 'Subscribe'}
            </Button>
          )}
        </Typography>

        <IconButton>
          <SearchIcon />
        </IconButton>

        {isLoggedIn ? (
          <>
          {/* Subscriptions Dropdown */}
          <div>
            <Button
              variant="outlined"
              size="small"
              onClick={toggleSubscriptionsDropdown}
              sx={{ marginX: 1 }}
            >
              Subscriptions
            </Button>
            {subscriptionsDropdownOpen && (
              <div style={{ position: 'absolute', backgroundColor: 'white', zIndex: 1, borderRadius: '0.5rem' }}>
                <ul>
                  {subscriptions.map((subscription) => (
                    <li key={subscription} className="font-bold py-2 px-4 hover:bg-gray-200">
                      {subscription}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>


            <Button
              variant="outlined"
              size="small"
              component={RouterLink}
              to="/createPost"
              sx={{ marginX: 1 }}
              onClick={handleCreatePostNavigate}
            >
              Create Post
            </Button>
            <Button variant="outlined" size="small" onClick={handleLogout} sx={{ marginX: 1 }}>
              Log Out
            </Button>
          </>
        ) : (
          <Button variant="outlined" size="small" onClick={() => setLoginModalOpen(true)} sx={{ marginX: 1 }}>
            Log In
          </Button>
        )}
      </Toolbar>

      {isLoggedIn && (
        <Toolbar
          component="nav"
          variant="dense"
          sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
        >
          {sections.map((section) => (
            <div key={section.title} style={{ display: 'flex', alignItems: 'center' }}>
              <Link
                component={RouterLink}
                color="inherit"
                noWrap
                variant="body2"
                to={section.url}
                sx={{ p: 1, flexShrink: 0 }}
              >
                {section.title}
              </Link>
            </div>
          ))}
        </Toolbar>
      )}

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={handleLogin}
        onOpenSignUp={() => setSignUpModalOpen(true)}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        userType={userType}
        setUserType={setUserType}
      />

      {/* SignUp Modal */}
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onRegister={handleRegister}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        userType={userType}
        setUserType={setUserType}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
      />
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;

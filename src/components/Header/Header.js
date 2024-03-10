// Header.js
import React, { useEffect }  from 'react';
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

function Header(props) {
  const { sections, title } = props;
  const [isLoginModalOpen, setLoginModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setSignUpModalOpen] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userType, setUserType] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    // Handle login logic (e.g., check credentials)
    console.log('Login clicked:', username, password, userType);
    // Close the login modal
    setLoginModalOpen(false);
    // Set the user as logged in
    setLoggedIn(true);
    // Store the login status in local storage
    localStorage.setItem('isLoggedIn', 'true');
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

  useEffect(() => {
    // Update buttons based on the current route or other conditions
    console.log('Current route:', location.pathname);

    if (localStorage.getItem('isLoggedIn') === 'true') {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [location]);

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
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        
        {isLoggedIn ? (
          <>
            {userType === 'administrator'? (
              <Button
                variant="outlined"
                size="small"
                component={RouterLink}
                to="/viewUsers"
                sx={{ marginX: 1 }}
              >
                View Users
              </Button>
            ): null}
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
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            component={RouterLink}
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            to={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>

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
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
  onSectionClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Sheet, Typography, Box } from '@mui/joy';
import { getUser } from '../user/userSlice';

const profileButton = (user) => {
  return (
    <div>
      <div className="button profile" to="profile">{`${user.name}`} </div>
    </div>
  );
};

function Header(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const user = useSelector((state) => state.user.user);
  const pageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard';
      case '/goals':
        return 'Goal Setting';
      case '/team':
        return 'Team';
      case '/profile':
        return 'Profile';
      case '/carbontracking':
        return 'Carbon Tracking';
      case '/discussionboard':
        return 'Discussion Board';
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.level1',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'fixed',
        top: 0,
        marginLeft: `${props.navBarOffset}px`,
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        {pageTitle()}
      </Typography>
      {/* Additional header content can go here, like buttons or user info */}
    </Box>
  );
}

export default Header;

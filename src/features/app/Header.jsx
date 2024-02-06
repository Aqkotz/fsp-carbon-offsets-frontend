import React, { useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Typography, Box, Button, Skeleton,
} from '@mui/joy';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUser } from '../user/userSlice';

function Header(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser());
  }, []);

  const user = useSelector((state) => state.user.user);
  console.log('user', user);
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
      case '/helpfulresources':
        return 'Helpful Resources';
      default:
        return '';
    }
  };

  return (
    <Box
      sx={{
        width: `calc(100vw - ${props.navBarOffset}px)`,
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
      <Button color="neutral"
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', marginRight: '30px', alignItems: 'center', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' },
        }}
        to="/profile"
        startDecorator={user !== 'loading' ? <AccountCircleOutlinedIcon /> : <Skeleton variant="circular" width={32} height={32} />}
      >
        {user !== 'loading' ? user.name : <Skeleton variant="text" width={100} height={28} />}
      </Button>
    </Box>
  );
}

export default Header;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Sheet, Button, Box } from '@mui/joy';
import { logout } from '../user/userSlice';
import { removeToken } from '../../app/utils';
import logo from '../../img/Dartmouth_wordmark_Rev.png';

// Creating a reusable NavButton component
function NavButton({ navigate, path, children }) {
  return (
    <Button
      size="lg"
      variant="plain"
      sx={{
        justifyContent: 'start',
        width: '100%',
        marginBottom: '8px',
        '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' },
        color: 'white',
      }}
      onClick={() => navigate(path)}
    >
      {children}
    </Button>
  );
}

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.isAdmin);

  const navItems = [
    { path: '/', label: 'DASHBOARD' },
    { path: '/goals', label: 'MY GOALS' },
    { path: '/dailytracking', label: 'CARBON TRACKING' },
    { path: '/team', label: 'MY TEAM' },
    // { path: '/helpfulresources', label: 'HELPFUL RESOURCES' },
    ...(admin ? [{ path: '/admin', label: 'ADMIN' }] : []),
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    removeToken();
  };

  return (
    <Sheet
      color="primary"
      variant="soft"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        justifyContent: 'start',
        height: '100vh',
        padding: '16px',
        boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
        width: '240px',
        minWidth: '240px',
        position: 'fixed',
      }}
    >
      <Box
        component="img"
        src={logo}
        alt="Logo"
        sx={{
          width: '80%',
          height: 'auto',
          padding: '16px',
        }}
      />
      {navItems.map((item) => (
        <NavButton key={item.path} navigate={navigate} path={item.path}>
          {item.label}
        </NavButton>
      ))}
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
    </Sheet>
  );
}

export default Nav;

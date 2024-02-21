import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Sheet, Button, Box,
} from '@mui/joy';
import { logout } from '../user/userSlice';
import { removeToken } from '../../app/utils';
import logo from '../../img/Dartmouth_wordmark_Rev.png';

function NavButton({ children, navigateTo }) {
  const navigate = useNavigate();
  return (
    <Button
      color="neutral"
      size="lg"
      variant="plain"
      sx={{
        justifyContent: 'start',
        width: '100%',
        marginBottom: '8px',
        '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' },
      }}
      onClick={() => navigate(navigateTo)}
    >
      {children}
    </Button>
  );
}

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.isAdmin);

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
      <NavButton navigateTo="/goals">My Goals</NavButton>
      <NavButton navigateTo="/carbontracking">Carbon Tracking</NavButton>
      <NavButton navigateTo="/team">My Team</NavButton>
      <NavButton navigateTo="/helpfulresources">Helpful Resources</NavButton>
      <NavButton navigateTo="/">Dashboard</NavButton>
      {admin && <NavButton navigateTo="/admin">Admin</NavButton>}
      <Button color="neutral"
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => { dispatch(logout()); navigate('/'); removeToken(); }}
      >LOGOUT
      </Button>
    </Sheet>
  );
}

export default Nav;

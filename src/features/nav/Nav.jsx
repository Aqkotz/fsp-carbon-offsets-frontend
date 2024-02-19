/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  Sheet, Button, Typography, Box,
} from '@mui/joy';
import { logout } from '../user/userSlice';
import { removeToken } from '../../app/utils';
import logo from '../../img/Dartmouth_wordmark_Rev.png';

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
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/')}
      >DASHBOARD
      </Button>
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/goals')}
      >MY GOALS
      </Button>
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/dailytracking')}
      >CARBON TRACKING
      </Button>
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/team')}
      >MY TEAM
      </Button>
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/helpfulresources')}
      >HELPFUL RESOURCES
      </Button>
      {admin && (
      <Button
        size="lg"
        variant="plain"
        sx={{
          justifyContent: 'start', width: '100%', marginBottom: '8px', '&:hover': { backgroundColor: 'rgba(243, 248, 243, 0.19)' }, color: 'white',
        }}
        onClick={() => navigate('/admin')}
      >ADMIN
      </Button>
      )}
      <Button
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

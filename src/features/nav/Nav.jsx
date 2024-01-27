/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
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
  return (
    <Sheet
      variant="outlined"
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
      }}
    >
      <Box
        component="img"
        src={logo} // Use the imported image as the source
        alt="Logo"
        sx={{
          width: '80%', // Make the image fully occupy the container width
          height: 'auto', // Keep the image's aspect ratio
          padding: '16px', // Add some padding around the image
        }}
      />
      <Button color="neutral" size="lg" variant="plain" sx={{ justifyContent: 'start', width: '100%', marginBottom: '8px' }} onClick={() => navigate('/goals')}>My Goals</Button>
      <Button color="neutral" size="lg" variant="plain" sx={{ justifyContent: 'start', width: '100%', marginBottom: '8px' }} onClick={() => navigate('/carbontracking')}>Carbon Tracking</Button>
      <Button color="neutral" size="lg" variant="plain" sx={{ justifyContent: 'start', width: '100%', marginBottom: '8px' }} onClick={() => navigate('/team')}>My Team</Button>
      <Button color="neutral" size="lg" variant="plain" sx={{ justifyContent: 'start', width: '100%', marginBottom: '8px' }} onClick={() => navigate('/discussion')}>Discussion Board</Button>
      <Button color="neutral" size="lg" variant="plain" sx={{ justifyContent: 'start', width: '100%' }} onClick={() => { dispatch(logout()); navigate('/'); removeToken(); }}>LOGOUT</Button>
    </Sheet>
  );
}

export default Nav;

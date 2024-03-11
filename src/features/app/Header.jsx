import React, { useEffect, useState } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  Typography, Box, Button, Skeleton, Modal, ModalDialog,
} from '@mui/joy';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { getUser, deleteUser } from '../user/userSlice';

function Header(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [deleteUserModalOpen, setDeleteUserModalOpen] = useState(false);
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
      case '/dailytracking':
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
        width: `calc(100vw - ${props.navBarOffset}px)`,
        opacity: 0.99,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'secondary.50',
        padding: '8px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        position: 'fixed',
        top: 0,
        marginLeft: `${props.navBarOffset}px`,
        px: 3,
        py: 1.5,
        borderRadius: 'sm',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
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
        disabled={!user || user === 'loading'}
        onClick={() => setProfileModalOpen(true)}
        startDecorator={user !== 'loading' ? <AccountCircleOutlinedIcon /> : <Skeleton variant="circular" width={32} height={32} />}
      >
        {user !== 'loading' ? user.name : <Skeleton variant="text" width={100} height={28} />}
      </Button>
      <Modal
        open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Profile
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            Name: {user !== 'loading' ? user.name : <Skeleton variant="text" width={100} height={28} />}
          </Typography>
          <Button onClick={() => setDeleteUserModalOpen(true)} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Account</Button>
          <Button onClick={() => setProfileModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
      <Modal
        open={deleteUserModalOpen}
        onClose={() => setDeleteUserModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            This action will delete the account for {user !== 'loading' ? user.name : <Skeleton variant="text" width={100} height={28} />} and all of its data.
          </Typography>
          <Button onClick={() => dispatch(deleteUser())} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Account</Button>
          <Button onClick={() => setDeleteUserModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
    </Box>
  );
}

export default Header;

import React from 'react';
import Button from '@mui/joy/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../user/userSlice';
import { removeToken } from '../../app/utils';
import logo from '../../img/Dartmouth_wordmark_Rev.png';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div id="nav">
      <img className="logo" src={logo} alt="logo" />
      <Button color="neutral" size="lg" variant="plain" onClick={() => { navigate('/goals'); }}>My Goals</Button>
      <Button color="neutral" size="lg" variant="plain" onClick={() => { navigate('/carbontracking'); }}>Carbon Tracking</Button>
      <Button color="neutral" size="lg" variant="plain" onClick={() => { navigate('/team'); }}>My Team</Button>
      <Button color="neutral" size="lg" variant="plain" onClick={() => { navigate('/team'); }}>Discussion Board</Button>
      <Button color="neutral" size="lg" variant="plain" onClick={() => { dispatch(logout()); navigate('/'); removeToken(); }}>LOGOUT</Button>
    </div>
  );
}

export default Nav;

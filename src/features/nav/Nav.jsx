import React from 'react';
import { NavLink } from 'react-router-dom';
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
      <NavLink className="button" to="/goals">GOALS</NavLink>
      <button className="button" type="button" onClick={() => { dispatch(logout()); navigate('/'); removeToken(); }}>LOGOUT</button>
    </div>
  );
}

export default Nav;

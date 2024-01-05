import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { logout } from '../user/userSlice';

function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div id="nav">
      <NavLink className="button" to="/">Dashboard</NavLink>
      <NavLink className="button" to="/tracking">Tracking</NavLink>
      <NavLink className="button" to="/emissions">My Emissions</NavLink>
      <NavLink className="button" to="/team">My Team</NavLink>
      <NavLink className="button" to="/goals">Goals</NavLink>
      <NavLink className="button" to="/offsetting">Offsetting</NavLink>
      <NavLink className="button" to="/journal">Journal</NavLink>
      <button className="button" type="button" onClick={() => { dispatch(logout()); navigate('/'); }}>Logout</button>
    </div>
  );
}

export default Nav;

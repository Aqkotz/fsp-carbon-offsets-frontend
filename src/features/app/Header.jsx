import React, { useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../user/userSlice';
import logo from '../../img/D-Pine_RGB.png';

const profileButton = (user) => {
  return (
    <div>
      <img className="logo" src={logo} alt="logo" />
      <button className="button" type="button">Settings</button>
      <NavLink className="button profile" to="profile">{`${user.firstName} ${user.lastName}`} </NavLink>
    </div>
  );
};

function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  const user = useSelector((state) => state.user.user);
  return (
    <nav id="header">
      {user && profileButton(user)}
    </nav>
  );
}

export default Header;

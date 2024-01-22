import React, { useEffect } from 'react';
import './style.scss';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getUser } from '../user/userSlice';

const profileButton = (user) => {
  return (
    <div>
      <NavLink className="button profile" to="profile">{`${user.name}`} </NavLink>
    </div>
  );
};

function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
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
      default:
        return '';
    }
  };

  return (
    <nav id="header">
      <h2>{pageTitle()}</h2>
      <div className="spacer" />
      {user && profileButton(user)}
    </nav>
  );
}

export default Header;

/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import UserGoals from '../usergoals/UserGoals';
import User from '../user/User';
import { setToken } from '../user/userSlice';

function FallBack() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('token_mtg_challenges');
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  const token = useSelector((state) => state.user.token);

  if (!token) {
    return (
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<UserGoals />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <User />
    );
  }
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;

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
import Header from './Header';
import { getToken } from '../../app/utils';
import './background-style.scss';
import Team from '../team/Team';
import LandingPage from '../landingpage/LandingPage';
import Signin from '../user/Signin';
import Signup from '../user/Signup';
import DashBoard from '../dashboard/DashBoard';

function FallBack() {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
}

function Circles(props) {
  return (
    <div className="circles">
      <div className="circle a" />
      <div className="circle b" />
      <div className="circle c" />
      <div className="circle d" />
      <div className="circle e" />
      <div className="circle f" />
      <div className="circle g" />
      <div className="circle h" />
      <div className="circle_cover" />
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = getToken();
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  const token = useSelector((state) => state.user.token);

  if (token) {
    return (
      <div>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/goals" element={<UserGoals />} />
          <Route path="/team" element={<Team />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    );
  }
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <div>
        <Circles />
        <App />
      </div>
    </BrowserRouter>
  );
}

export default AppWrapper;

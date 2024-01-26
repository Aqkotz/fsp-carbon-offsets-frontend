/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  BrowserRouter, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../nav/Nav';
import UserGoals from '../usergoals/UserGoals';
import { setToken } from '../user/userSlice';
import Header from './Header';
import { getToken } from '../../app/utils';
import Team from '../team/Team';
import CarbonTracking from '../carbontracking/CarbonTracking';
import Signin from '../user/Signin';
import Signup from '../user/Signup';
import SignedInUser from '../user/SignedInUser';
import LandingPage from '../landingpage/LandingPage';
import DashBoard from '../dashboard/dashboard';

function FallBack() {
  return (
    <div>
      <h1>404 Not Found</h1>
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
        <Nav />
        <div>
          <div id="app">
            <Routes>
              <Route path="/" element={<DashBoard />} />
              <Route path="/goals" element={<UserGoals />} />
              <Route path="/carbontracking" element={<CarbonTracking />} />
              <Route path="/team" element={<Team />} />
              <Route path="*" element={<FallBack />} />
            </Routes>
          </div>
          <Header />
        </div>
      </div>
    );
  } else {
    return (
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signedin" element={<SignedInUser />} />
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
        <App />
      </div>
    </BrowserRouter>
  );
}

export default AppWrapper;

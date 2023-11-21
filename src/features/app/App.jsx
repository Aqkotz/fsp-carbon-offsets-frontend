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
        <div id="app">
          <Nav />
          <Routes>
            <Route path="/" element={<UserGoals />} />
            <Route path="*" element={<FallBack />} />
          </Routes>
        </div>
        <Header />
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
      <div>
        <Circles />
        <App />
      </div>
    </BrowserRouter>
  );
}

export default AppWrapper;

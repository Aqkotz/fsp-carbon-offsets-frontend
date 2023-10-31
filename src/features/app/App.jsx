/* eslint-disable no-unused-vars */
import React from 'react';
import {
  BrowserRouter, Routes, Route, NavLink, useParams,
} from 'react-router-dom';
import Nav from '../nav/Nav';
import UserGoals from '../usergoals/UserGoals';

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
  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path="/" element={<UserGoals />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/pine.png';

function LandingPage() {
  return (
    <div>
      <div className="post container">
        <div className="post-title">
          <img className="imgresize" src={logo} alt="pine" />
          <h1> Go GREEN</h1>
        </div>
        <NavLink className="button" to="/signin">Sign In</NavLink>
        <NavLink className="button" to="/signup">Sign Up</NavLink>
      </div>
    </div>

  );
}

export default LandingPage;

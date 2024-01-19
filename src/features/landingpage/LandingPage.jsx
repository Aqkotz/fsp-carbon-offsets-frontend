import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/pine.png';

function LandingPage() {
  return (
<<<<<<< Updated upstream
    <div>
      <div className="post container">
        <div className="post-title">
          <img className="imgresize" src={logo} alt="pine" />
          <h1> Go GREEN</h1>
=======
    <div className="container2 allign-v center">
      <div className="container2 allign-v center">
        <div className="container2">
          <div className="container2">
            <img className="imgresize" src={logo} alt="pine" />
          </div>
          <div className="titleclear">
            <h1> Go GREEN</h1>
            <h2> Dartmouth Carbon Initiative</h2>
          </div>
        </div>
        <div className="container2">
          <a className="button" href="https://login.dartmouth.edu/cas/login?service=http://localhost:5174/signedin">Sign in with Duo</a>
>>>>>>> Stashed changes
        </div>
        <NavLink className="button" to="/signin">Sign In</NavLink>
        <NavLink className="button" to="/signup">Sign Up</NavLink>
      </div>
    </div>

  );
}

export default LandingPage;

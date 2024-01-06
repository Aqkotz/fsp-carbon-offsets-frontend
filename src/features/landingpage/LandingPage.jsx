import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/LonePine_Rev.png';

function LandingPage() {
  return (
    <div>
      {/* <div className="centercontainer">
        <h1>
          Test
        </h1>
      </div>
 */}

      <div className="centercontainer">
        <div className="titleclear">
          <img className="imgresize" src={logo} alt="pine" />
          <h1> Go GREEN</h1>
          <h2> Dartmouth Carbon Initiative</h2>
        </div>
        {/* <div className="titleclear">
          <h2> Dartmouth Carbon Initiative</h2>
        </div> */}
        <NavLink className="button" to="/signin">Sign In</NavLink>
        <NavLink className="button" to="/signup">Sign Up</NavLink>
      </div>
    </div>

  );
}

export default LandingPage;

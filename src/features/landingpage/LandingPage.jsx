import React from 'react';
import logo from '../../img/LonePine_Rev.png';

function LandingPage() {
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

  return (
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
          <a className="button" href={`https://login.dartmouth.edu/cas/login?service=${CLIENT_URL}/signedin`}>Sign in with Duo</a>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

import React from 'react';
import logo from '../../img/LonePine_Rev.png';
import './background-style.scss';

function Circles() {
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

function LandingPage() {
  const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

  return (
    <div>
      <Circles />
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
    </div>
  );
}

export default LandingPage;

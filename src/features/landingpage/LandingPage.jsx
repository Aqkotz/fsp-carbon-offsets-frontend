import React from 'react';
import { Button } from 'antd';
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
      <div className="centercontainer">
        <div className="centercontainer">
          <div className="container2">
            <div className="container2">
              <img className="imgresize" src={logo} alt="pine" />
            </div>
            <div className="titleclear">
              <h4> Go GREEN</h4>
              <h5> Dartmouth Carbon Initiative</h5>
            </div>
          </div>
          <div className="container2">
            <Button ghost href={`https://login.dartmouth.edu/cas/login?service=${CLIENT_URL}/signedin`}>Sign in with Duo</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

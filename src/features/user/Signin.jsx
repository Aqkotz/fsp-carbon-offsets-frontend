import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signin } from './userSlice';

export default function Signin(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="post container">
      <h1 className="post-title">Sign In</h1>
      <div className="field">
        <p>Email </p>
        <input value={email} type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
      </div>
      <div className="field">
        <p>Password </p>
        <input value={password} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
      </div>
      <button
        className="button"
        type="button"
        onClick={() => {
          dispatch(signin({ email, password }, navigate));
        }}
      >
        Sign In
      </button>
    </div>
  );
}

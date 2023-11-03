import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { signup } from './userSlice';

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="post container">
      <h1 className="post-title">Sign Up</h1>
      <div className="field">
        <p>Email </p>
        <input value={email} type="text" placeholder="Email" onChange={(e) => { setEmail(e.target.value); }} />
      </div>
      <div className="field">
        <p>Password </p>
        <input value={password} type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value); }} />
      </div>
      <div className="field">
        <p>Username </p>
        <input value={username} type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value); }} />
      </div>
      <button
        className="button"
        type="button"
        onClick={() => {
          dispatch(signup({ email, password, username }));
          navigate('/');
        }}
      >
        Sign Up
      </button>
    </div>
  );
}

import React from 'react';
import Signin from './Signin';
import Signup from './Signup';

export default function User(props) {
  return (
    <div className="posts">
      <Signup />
      <Signin />
    </div>
  );
}

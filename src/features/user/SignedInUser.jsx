import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { duoSignin } from './userSlice';

function SignedInUser(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ticket = queryParams.get('ticket');
  useEffect(() => {
    if (ticket) {
      dispatch(duoSignin(ticket, navigate));
    }
  }, []);

  return (
    <div>
      <h1>SignedInUser</h1>
    </div>
  );
}

export default SignedInUser;

import React from 'react';
import { useDispatch } from 'react-redux';
import setCompleted from './userGoalsSlice';

function GoalComplete() {
  const dispatch = useDispatch();
  return (
    // <div className="container">
    <div>
      <button type="button" className="button" onClick={() => { dispatch(setCompleted()); }}>
        Yes!
      </button>
    </div>
  );
}

export default GoalComplete;

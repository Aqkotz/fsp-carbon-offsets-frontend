import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGoal } from './userGoalsSlice';

function SustyGoalInput() {
  const [goal, setGoalState] = useState('');
  const dispatch = useDispatch();
  return (
    <div className="container">
      <h3>What is your sustainability goal?</h3>
      <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} />
      <button type="button" className="button" onClick={() => { dispatch(setGoal(goal)); }}>
        Set Goal
      </button>
    </div>
  );
}

export default SustyGoalInput;

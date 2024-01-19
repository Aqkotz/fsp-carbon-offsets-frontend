import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGoal } from './userGoalsSlice';

function SustyGoalInput() {
  const dispatch = useDispatch();
  const [goal, setGoalState] = useState('');
  return (
    <div className="container">
      <h3>What is your sustainability goal?</h3>
      <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} />
      <button type="button" className="button" onClick={() => { dispatch(setGoal({ description: goal })); }}>
        Set Goal
      </button>
    </div>
  );
}

export default SustyGoalInput;

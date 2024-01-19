import React from 'react';
import { useDispatch } from 'react-redux';
import Streak from './Streak';
import setCompleted from './userGoalsSlice';

function UserGoalSelection(props) {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <h3>{props.goal.description}</h3>
      <h3>Did you complete your goal today?</h3>
      {/* <GoalComplete /> */}
      <button type="button" className="button" onClick={() => { dispatch(setCompleted()); }}>
        Yes!
      </button>
      <Streak />
    </div>
  );
}

export default UserGoalSelection;

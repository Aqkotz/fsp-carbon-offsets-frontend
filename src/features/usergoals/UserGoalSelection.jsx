import React from 'react';
import { useDispatch } from 'react-redux';
import Streak from './Streak';
import { completeGoal, deleteGoal } from './userGoalsSlice';

function UserGoalSelection(props) {
  const dispatch = useDispatch();

  return (
    <div className="container center">
      <h2>Goal {props.index + 1}</h2>
      <h3>{props.goal.description}</h3>
      <h3>Did you complete your goal today?</h3>
      <button type="button" className="button" onClick={() => { dispatch(completeGoal(props.goal.id)); }}>
        Yes!
      </button>
      <button type="button" className="button" onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
        Delete Goal
      </button>
      <Streak />
    </div>
  );
}

export default UserGoalSelection;

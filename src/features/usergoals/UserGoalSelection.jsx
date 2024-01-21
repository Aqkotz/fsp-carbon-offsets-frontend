import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Streak from './Streak';
import { completeGoal, deleteGoal, failGoal } from './userGoalsSlice';

function UserGoalSelection(props) {
  const dispatch = useDispatch();
  const [changeCompleted, setChangeCompleted] = useState(false);
  const completionSection = () => {
    if (props.goal.completedToday && !changeCompleted) {
      return (
        <div>
          <h3>Completed!</h3>
          <button type="button" className="button" onClick={() => { setChangeCompleted(true); }}>
            Change Completed
          </button>
        </div>
      );
    } else if (props.goal.failed && !changeCompleted) {
      return (
        <div>
          <h3>Failed!</h3>
          <button type="button" className="button" onClick={() => { setChangeCompleted(true); }}>
            Change Completed
          </button>
        </div>
      );
    }
    return (
      <div>
        <h3>Did you complete your goal today?</h3>
        <button type="button" className="button" onClick={() => { dispatch(completeGoal(props.goal.id)); }}>
          Yes!
        </button>
        <button type="button" className="button" onClick={() => { dispatch(failGoal(props.goal.id)); }}>
          No!
        </button>
      </div>
    );
  };

  return (
    <div className="container center background">
      <h2 className="post-title">Goal {props.index + 1}</h2>
      <h5 className="goaltext">{props.goal.description}</h5>
      {completionSection()}
      <Streak />
      <button type="button" className="button" onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
        Delete Goal
      </button>
    </div>
  );
}

export default UserGoalSelection;

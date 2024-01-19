import React from 'react';
import Streak from './Streak';
import GoalComplete from './GoalComplete';

function UserGoalSelection(props) {
  return (
    <div className="container">
      <h3>{props.goal.description}</h3>
      <h3>Did you complete your goal today?</h3>
      {/* <GoalComplete /> */}
      <GoalComplete />
      <Streak />
    </div>
  );
}

export default UserGoalSelection;

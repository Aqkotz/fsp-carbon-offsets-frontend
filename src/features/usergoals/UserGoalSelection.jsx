import React from 'react';
import { useSelector } from 'react-redux';
import UserGoal from './UserGoal';

function UserGoalSelection() {
  const goals = useSelector((state) => state.userGoals.goals);
  return (
    <div>
      <h1>Weekly Goal</h1>
      <div className="goals">
        {goals.map((goal, index) => (
          <UserGoal goal={goal} />
        ))}
      </div>
    </div>
  );
}

export default UserGoalSelection;
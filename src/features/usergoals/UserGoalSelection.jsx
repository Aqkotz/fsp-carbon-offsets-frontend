import React from 'react';
// import { useSelector } from 'react-redux';
// import UserGoal from './UserGoal';

function UserGoalSelection() {
  // const goals = useSelector((state) => state.userGoals.goals);
  return (
    <div>
      <h3>Did you complete your goal today?</h3>
      {/* <div className="goals">
        {goals.map((goal, index) => (
          <UserGoal goal={goal} />
        ))}
      </div> */}
    </div>
  );
}

export default UserGoalSelection;

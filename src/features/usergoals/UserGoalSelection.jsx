import React from 'react';
<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
    </div>
  );
}

export default UserGoalSelection;

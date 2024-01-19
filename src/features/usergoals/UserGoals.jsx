import React from 'react';
import { useSelector } from 'react-redux';
import UserGoalSelection from './UserGoalSelection';
import SustyGoalInput from './SustainabilityGoalInput';

function UserGoals() {
  const goals = useSelector((state) => state.userGoals.goals);

  return (
    <div className="page">
      <SustyGoalInput />
      <div className="container">
        <h1 className="post-title">Weekly Goal Setting</h1>
        <div className="container2">
          {
          goals.map((goal) => {
            return (
              <UserGoalSelection goal />
            );
          })
        }
        </div>
      </div>
    </div>
  );
}

export default UserGoals;

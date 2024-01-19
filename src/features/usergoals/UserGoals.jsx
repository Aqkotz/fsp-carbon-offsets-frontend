import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserGoalSelection from './UserGoalSelection';
import SustyGoalInput from './SustainabilityGoalInput';
import { getGoals } from './userGoalsSlice';

function UserGoals() {
  const goals = useSelector((state) => state.userGoals.goals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoals());
  }, []);

  return (
    <div className="page">
      <SustyGoalInput />
      <div className="container">
        <h1 className="post-title">Weekly Goal Setting</h1>
        <div className="container2">
          {goals && goals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal.description} goal={goal} index={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserGoals;

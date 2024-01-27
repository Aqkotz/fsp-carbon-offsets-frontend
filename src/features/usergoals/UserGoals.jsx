import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography } from '@mui/joy';
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
    <div>
      <SustyGoalInput />
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Weekly Goals
        </Typography>
        <div className="container_goals">
          {goals && goals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal.id} goal={goal} index={index} />
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default UserGoals;

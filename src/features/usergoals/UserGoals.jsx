import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography, Stack } from '@mui/joy';
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
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      <SustyGoalInput />
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Weekly Goals
        </Typography>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
        >
          {goals && goals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal.id} goal={goal} index={index} />
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}

export default UserGoals;

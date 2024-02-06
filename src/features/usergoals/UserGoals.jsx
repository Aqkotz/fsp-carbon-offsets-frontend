import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Box, Stack,
} from '@mui/joy';
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
      <Box m={2}>
        <SustyGoalInput />
      </Box>
      <Box m={2}>
        <Card>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Weekly Goals
          </Typography>
          <Stack direction="row">
            {goals && goals.map((goal, index) => {
              return (
                <UserGoalSelection key={goal.id} goal={goal} index={index} />
              );
            })}
          </Stack>
        </Card>
      </Box>
    </div>
  );
}

export default UserGoals;

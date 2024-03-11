import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Box, Skeleton, CardActions, ButtonGroup, Stack,
} from '@mui/joy';
import UserGoalSelection from './UserGoalSelection';
import { fetchGoals } from './userGoalsSlice';

function CurrentGoals() {
  const goals = useSelector((state) => state.userGoals.goals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoals());
  }, []);

  const goalsCardSkeleton = () => {
    return (
      <Card>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Skeleton variant="text" width={140} height={32} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="text" width="60%" height={24} />
        <Skeleton variant="text" width="60%" height={24} />
        <Box marginTop={2} marginBottom={0.5}>
          <Skeleton variant="text" width="90%" height={32} />
        </Box>
        <Box m={1}>
          <CardActions buttonFlex="1">
            <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
              <Skeleton variant="text" width="60%" height={24} />
              <Skeleton variant="text" width="60%" height={24} />
            </ButtonGroup>
          </CardActions>
        </Box>
      </Card>
    );
  };

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={3}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Stack direction="row" justifyContent="flex-start" spacing={3} sx={{ width: '100%' }}>
          {goals === 'loading' && new Array(3).fill(0).map((_, index) => {
            return (
              <div key={index}>
                {goalsCardSkeleton()}
              </div>
            );
          })}
          {(goals && goals !== 'loading') && goals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal.id} goal={goal} index={index} />
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}

export default CurrentGoals;

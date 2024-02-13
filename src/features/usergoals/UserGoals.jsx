import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Box, Skeleton, CardActions, ButtonGroup, Stack,
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
        <Skeleton variant="rectangular" width="100%" height={50} style={{ marginBottom: '16px' }} />
        <Box marginTop={2} marginBottom={0.5}>
          <Skeleton variant="text" width="90%" height={32} />
        </Box>
        <Box m={1}>
          <CardActions buttonFlex="1">
            <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
              <Skeleton variant="rectangular" width={60} height={36} />
              <Skeleton variant="rectangular" width={60} height={36} />
            </ButtonGroup>
          </CardActions>
        </Box>
      </Card>
    );
  };

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
          <div className="container_goals">
            {goals === 'loading' && new Array(3).fill(0).map((_, index) => {
              return (
                goalsCardSkeleton()
              );
            })}
            {(goals && goals !== 'loading') && goals.map((goal, index) => {
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

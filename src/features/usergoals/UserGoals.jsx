import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Box, Skeleton, CardActions, ButtonGroup, Stack,
} from '@mui/joy';
import UserGoalSelection from './UserGoalSelection';
import SustyGoalInput from './SustainabilityGoalInput';
import { fetchGoals } from './userGoalsSlice';
import { fetchCarbonFootprint } from '../carbontracking/carbonSlice';

function UserGoals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchCarbonFootprint());
  }, []);
  const goals = useSelector((state) => state.userGoals.goals);
  const footprint = useSelector((state) => state.carbon.footprint);

  const goalsCardSkeleton = () => {
    return (
      <Card sx={{ minWidth: '450px' }}>
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
              <Skeleton variant="rectangular" width="33%" height={36} />
              <Skeleton variant="rectangular" width="33%" height={36} />
            </ButtonGroup>
          </CardActions>
        </Box>
      </Card>
    );
  };

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={3}>
      <Stack direction="row" justifyContent="flex-start" spacing={3} sx={{ fontWeight: 'md', width: '100%' }}>
        <SustyGoalInput />
        <Card variant="plain" sx={{ fontWeight: 'md', width: '50%' }}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            {footprint?.user?.reduction?.total ?? 0} kg CO2e saved
          </Typography>
        </Card>
      </Stack>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Current Goals
        </Typography>
        <Stack direction="row" justifyContent="flex-start" spacing={3} sx={{ width: '100%' }}>
          {goals === 'loading' && new Array(3).fill(0).map((_, index) => {
            return (
              <div key={index}>
                { goalsCardSkeleton() }
              </div>
            );
          })}
          {(goals && goals !== 'loading') && goals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal._id} goal={goal} index={index} />
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}

export default UserGoals;

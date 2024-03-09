import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Box, Skeleton, CardActions, ButtonGroup, Stack,
} from '@mui/joy';
import UserGoalSelection from './UserGoalSelection';
import SustyGoalInput from './SustainabilityGoalInput';
import CustomGoal from './CustomGoal';
import { fetchGoals, fetchPastGoals } from './userGoalsSlice';
import { fetchCarbonFootprint } from '../carbontracking/carbonSlice';

function UserGoals() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGoals());
    dispatch(fetchCarbonFootprint());
    dispatch(fetchPastGoals());
  }, []);
  const goals = useSelector((state) => state.userGoals.goals);
  const pastGoals = useSelector((state) => state.userGoals.pastGoals);
  console.log(pastGoals);
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
      <Stack direction="row" justifyContent="flex-start" spacing={2} sx={{ fontWeight: 'md', alignItems: 'stretch' }}>
        <Card variant="filled" sx={{ width: '30%', minWidth: '350px' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontWeight: 'md', fontSize: '40px' }}>
              Add<br />Goals
            </Typography>
            <Stack direction="column" justifyContent="flex-end" alignItems="center" spacing={2}>
              <SustyGoalInput />
              <CustomGoal />
            </Stack>
          </Stack>
        </Card>
        <Card variant="plain" sx={{ fontWeight: 'md' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography sx={{ fontWeight: 'md', fontSize: '60px', marginTop: '10px' }}>
              {footprint?.user?.reduction?.total ?? 0}
            </Typography>
            <Typography sx={{ fontWeight: 'md', fontSize: '25px' }}>
              kg CO2e saved
            </Typography>
          </Stack>
        </Card>
      </Stack>
      <Card sx={{ backgroundColor: 'transparent' }}>
        {goals.length > 0 && (
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Current Goals
        </Typography>
        )}
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
        {pastGoals.length > 0 && (
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Past Goals
        </Typography>
        )}
        <Stack
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '40px',
          }}
        >
          {pastGoals === 'loading' && new Array(3).fill(0).map((_, index) => {
            return (
              <div key={index}>
                { goalsCardSkeleton() }
              </div>
            );
          })}
          {(pastGoals && pastGoals !== 'loading') && pastGoals.map((goal, index) => {
            return (
              <UserGoalSelection key={goal._id} goal={goal} index={index} past />
            );
          })}
        </Stack>
      </Card>
    </Stack>
  );
}

export default UserGoals;

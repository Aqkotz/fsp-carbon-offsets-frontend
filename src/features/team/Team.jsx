import React, { useEffect } from 'react';
import { Typography, Stack, Card } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import JoinTeam from './joinTeam';
import { fetchTeam } from './teamSlice';
import DonutChart from './doughnutChart';
import Leaderboard from './leaderBoard';

function Team() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeam());
  }, []);
  const team = useSelector((state) => state.team.team);
  if (!team) {
    return (
      <JoinTeam />
    );
  }
  return (
    <Stack>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Team: {team.name} </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Carbon Footprint: {team.carbonFootprint} </Typography>
      </Card>
      <DonutChart style={{ width: '10px', height: '10px' }} />
      <Leaderboard />
    </Stack>
  );
}

export default Team;

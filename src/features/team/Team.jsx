import React, { useEffect } from 'react';
import { Typography, Stack, Card } from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import JoinTeam from './joinTeam';
import { fetchTeam } from './teamSlice';

function Team() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeam());
  }, []);
  const team = useSelector((state) => state.team.team);
  console.log('team', team);
  if (!team) {
    return (
      <JoinTeam />
    );
  }
  return (
    <Stack>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Team: {team.name} </Typography>
      </Card>
    </Stack>
  );
}

export default Team;

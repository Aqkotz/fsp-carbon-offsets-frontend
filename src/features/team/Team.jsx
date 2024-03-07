import React, { useEffect, useState } from 'react';
import {
  Typography, Stack, Card, ToggleButtonGroup, Button,
} from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import JoinTeam from './joinTeam';
import { fetchTeam } from './teamSlice';
import Leaderboard from './leaderBoard';
import TeamRing from './TeamRing';
import TotalCarbonDonut from '../dashboard/TotalCarbonDonut';

function CarbonPieChart({ footprint }) {
  const [pieType, setPieType] = useState('weekly');
  const handleChange = (event) => {
    setPieType(event.target.value);
  };

  if (!footprint || footprint === 'loading') {
    return (
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Carbon Snapshot
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Loading...
        </Typography>
      </Card>
    );
  }

  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      <ToggleButtonGroup
        value={pieType}
        onChange={handleChange}
        aria-label="Platform"
        position="sticky"
        color="primary"
      >
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black',
        }}
          value="weekly"
        >TEAM WEEKLY
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black',
        }}
          value="allTime"
        >TEAM ALL TIME
        </Button>
      </ToggleButtonGroup>
      <div style={{ marginTop: '20px' }}>
        {pieType && <TotalCarbonDonut points={footprint[pieType]} />}
      </div>
    </div>
  );
}

export { CarbonPieChart };
function Team() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTeam());
  }, []);
  const team = useSelector((state) => state.team.team);
  const carbonFootprint = team?.carbonFootprint?.allTime?.total;
  if (!team) {
    return (
      <JoinTeam />
    );
  }
  return (
    <Stack>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Team: {team.name} </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Carbon Footprint: {carbonFootprint} </Typography>
      </Card>
      {/* <DonutChart style={{ width: '10px', height: '10px' }} /> */}
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <CarbonPieChart footprint={team.carbonFootprint} />
        <Leaderboard />
        <TeamRing />
      </Stack>
    </Stack>
  );
}

export default Team;

/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Card, Stack, ToggleButtonGroup, Button,
} from '@mui/joy';
import CurrentGoals from '../usergoals/currentGoals';
import TotalCarbonDonut from './TotalCarbonDonut';
import TeamRing from '../team/TeamRing';
import { fetchCarbonFootprint } from '../carbontracking/carbonSlice';

function CarbonPieChart({ footprint }) {
  const [pieType, setPieType] = useState({ type: 'user', time: 'weekly' });
  const handleChange = (event) => {
    const [user, frequency] = event.target.value.split(' ');
    setPieType({ type: user, time: frequency });
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
        value={`${pieType.type} ${pieType.time}`}
        onChange={handleChange}
        aria-label="Platform"
        position="sticky"
        color="primary"
      >
        <Button variant="outlined"
          sx={{
            justifyContent: 'start',
            '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
            color: 'black',
            borderColor: 'black',
          }}
          value="user weekly"
        >WEEKLY
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black',
        }}
          value="user allTime"
        >ALL TIME
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black',
        }}
          value="team weekly"
        >TEAM WEEKLY
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black',
        }}
          value="team allTime"
        >TEAM ALL TIME
        </Button>
      </ToggleButtonGroup>
      <div style={{ marginTop: '20px' }}>
        {pieType && <TotalCarbonDonut points={footprint[pieType.type][pieType.time]} />}
      </div>
    </div>
  );
}

export { CarbonPieChart };

function DashBoard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCarbonFootprint());
  }, []);
  const footprint = useSelector((state) => state.carbon.footprint);
  const team = useSelector((state) => state.team.team);

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
    <Stack>
      <Card variant="plain" sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Carbon Snapshot
        </Typography>
        <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
          {(footprint && footprint !== 'loading') && <CarbonPieChart footprint={footprint} />}
          <Card sx={{ width: '30%' }}>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              You have produced {footprint.user.allTime.total} kg CO2e
            </Typography>
          </Card>
          {team.teamGoal === 'loading' ? (
            <Card>
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                No Team Goal Set
              </Typography>
            </Card>
          ) : team.teamGoal && team.teamGoal !== 'loading' && (
          <TeamRing points={team.teamGoal} />
          )}
        </Stack>
        {/* <CarbonVis /> */}
      </Card>
      <Card variant="plain" sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Goals
        </Typography>
        <CurrentGoals />
      </Card>
    </Stack>
  );
}

export default DashBoard;

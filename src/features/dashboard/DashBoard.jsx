/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography, Card, Stack, ToggleButtonGroup, Button,
} from '@mui/joy';
import GaugeChart from 'react-gauge-chart';
import CurrentGoals from '../usergoals/currentGoals';
import TotalCarbonDonut from './TotalCarbonDonut';
// import TeamRing from '../team/TeamRing';
// import Thermometer from './Thermomemter';
import { fetchCarbonFootprint } from '../carbontracking/carbonSlice';
// import TeamRing from '../team/TeamRing';

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
      >
        <Button
          value="user weekly"
          sx={{
            justifyContent: 'start',
            '&.Mui-selected': {
              color: 'rgb(9, 145, 104)',
              '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
            },
            color: 'black',
            borderColor: 'black',
          }}
        >
          WEEKLY
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
  const user = useSelector((state) => state.user.user);

  console.log('team', team);

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
    <Stack sx={{ display: 'flex' }}>
      <Stack direction="row" width="100%" spacing={2} style={{ height: '100%' }}>
        <Stack direction="column" justifyContent="stretch" spacing={2}>
          <Card width="50%" style={{ height: '100%' }}>
            <Typography sx={{ fontWeight: 'md', fontSize: '30px' }}>
              You have produced
            </Typography>
            <Typography sx={{ fontSize: '60px' }}>
              {footprint.user.allTime.total.toFixed(2)} kg CO2e
            </Typography>
          </Card>
          <Card width="50%" style={{ height: '100%' }}>
            <Typography sx={{ fontWeight: 'md', fontSize: '30px' }}>
              Your Carbon Snapshot
            </Typography>
            {(footprint && footprint !== 'loading') && <CarbonPieChart footprint={footprint} />}
          </Card>
        </Stack>
        <Stack width="60%" direction="column" spacing={2}>
          {team.teamGoal === 'loading' ? (
            <Card sx={{
              width: '100%', display: 'flex', flexDirection: 'column', midWidth: '600px',
            }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}>
                No Team Goal Set
              </Typography>
            </Card>
          ) : team.teamGoal && team.teamGoal !== 'loading' && (
          <Stack direction="column" spacing={2} style={{ width: '100%' }}>
            <Card alignItems="center" style={{ width: '100%', midWidth: '600px' }}>
              <Typography sx={{ fontWeight: 'md', fontSize: '30px' }}>
                Team Goal Progress
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography level="h3" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}>
                  {team.teamGoal.actualCarbonReduction} of {team.teamGoal.carbonReduction} kg CO2e saved
                </Typography>
                <GaugeChart
                  id="gauge-chart3"
                  nrOfLevels={20}
                  colors={['rgba(15, 21, 145,0.4)', 'rgb(9, 145, 104)']}
                  arcWidth={0.3}
                  hideText
                  percent={team.teamGoal?.actualCarbonReduction ?? 0 / team.teamGoal.carbonReduction}
                />
              </Stack>
            </Card>
            <Card alignItems="center" style={{ width: '100%', midWidth: '600px' }}>
              <Typography sx={{ fontWeight: 'md', fontSize: '30px' }}>
                Individual Goal Progress
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography level="h3" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}>
                  {team.teamGoal.actualCarbonReduction} of {team.teamGoal.carbonReduction} kg CO2e saved
                </Typography>
                <GaugeChart
                  id="gauge-chart3"
                  nrOfLevels={20}
                  colors={['rgba(15, 21, 145,0.4)', 'rgb(9, 145, 104)']}
                  arcWidth={0.3}
                  hideText
                  percent={user.carbonFootprint?.weeklyReduction?.total ?? 0 / (team.teamGoal.carbonReduction / team.teamSize)}
                />
              </Stack>
            </Card>
          </Stack>
          )}
        </Stack>
      </Stack>
      <Card variant="plain" sx={{ backgroundColor: 'transparent', flex: 1 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Goals
        </Typography>
        <CurrentGoals />
      </Card>
    </Stack>
  );
}
export default DashBoard;

/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Typography, Card, Stack, ToggleButtonGroup, Button,
} from '@mui/joy';
import CurrentGoals from '../usergoals/currentGoals';
import TotalCarbonDonut from './totalCarbonDonut';

function CarbonPieChart() {
  const [pieType, setPieType] = useState('weekly');
  const handleChange = (event) => {
    setPieType(event.target.value);
  };
  const footprint = useSelector((state) => state.carbon.footprint);
  // const loading = footprint === 'loading' || footprint === 'undefined';

  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      <ToggleButtonGroup
        value={pieType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        position="sticky"
        zIndex="999"
        color="primary"
      >
        <Button variant="outlined"
          sx={{
            justifyContent: 'start',
            '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
            color: 'black',
            borderColor: 'black', // Change outline color to black
          }}
          value="weekly"
        >WEEKLY
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black', // Change outline color to black
        }}
          value="allTime"
        >ALL TIME
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black', // Change outline color to black
        }}
          value="team"
        >TEAM
        </Button>
      </ToggleButtonGroup>
      <div style={{ marginTop: '20px' }}> {/* Add marginTop */}
        {pieType && <TotalCarbonDonut points={footprint[pieType]} />}
      </div>
    </div>
  );
}

export { CarbonPieChart };

function DashBoard() {
  return (
    <Stack>
      <Card variant="plain" sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Carbon Snapshot
        </Typography>
        {/* <CarbonPieChart /> */}
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

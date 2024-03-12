/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Typography, Stack, Card, ToggleButtonGroup, Button, Modal, ModalDialog, Skeleton,
} from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import JoinTeam from './joinTeam';
import { leaveTeam } from './teamSlice';
import Leaderboard from './leaderBoard';
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
    <Card variant="plain" style={{ position: 'relative', marginTop: '20px', width: '35%' }}>
      <Typography level="h3" component="h1" sx={{ fontSize: '35px' }}>
        Team Carbon Footprint
      </Typography>
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
    </Card>
  );
}

export { CarbonPieChart };

function Team() {
  const dispatch = useDispatch();

  const [leaveTeamModalOpen, setLeaveTeamModalOpen] = useState(false);
  const team = useSelector((state) => state.team.team);
  const carbonFootprint = team?.carbonFootprint?.allTime?.total;
  // const carbonWeeklyReduction = team?.carbonFootprint?.weekly?.reduction;
  // const carbonGoal = team?.carbonGoal?;

  if (team === 'loading') {
    return (
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          <Skeleton variant="text" />
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md', width: '50%' }}>
          <Skeleton variant="text" />
        </Typography>
      </Card>
    );
  }

  if (!team) {
    return (
      <JoinTeam />
    );
  }

  return (
    <Stack direction="column">
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Team: {team.name} </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Carbon Footprint: {carbonFootprint.toFixed(2)} kg CO2e</Typography>
        <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
          <Button onClick={() => setLeaveTeamModalOpen(true)} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Leave Team</Button>
        </Stack>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={leaveTeamModalOpen}
        onClose={() => setLeaveTeamModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            This action will remove you from the team. You can rejoin with the join code.
          </Typography>
          <Button onClick={() => dispatch(leaveTeam())} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Leave Team</Button>
          <Button onClick={() => setLeaveTeamModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
      <Leaderboard />
      {/* <DonutChart style={{ width: '10px', height: '10px' }} /> */}
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <CarbonPieChart footprint={team.carbonFootprint} />
        {team.teamGoal === 'loading' ? (
          <Card>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              No Team Goal Set
            </Typography>
          </Card>
        ) : team.teamGoal && team.teamGoal !== 'loading' && (
          <Card variant="plaint" alignItems="center" style={{ marginTop: '20px', width: '65%' }}>
            <Typography level="h3" component="h1" sx={{ fontSize: '35px' }}>
              Team Goal Progress
            </Typography>
            <Typography level="h3" component="h1" sx={{ fontSize: '25px' }}>
              This week&apos;s goal is to save {team.teamGoal.carbonReduction} kg CO2e
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2} style={{ marginTop: '120px' }}>
              <Typography level="h3" component="h1" sx={{ fontSize: '30px', textAlign: 'center' }}>
                {team.teamGoal.actualCarbonReduction} of {team.teamGoal.carbonReduction} kg CO2e saved
              </Typography>
              <GaugeChart id="gauge-chart3"
                nrOfLevels={20}
                colors={['rgba(15, 21, 145,0.4)', 'rgb(9, 145, 104)']}
                arcWidth={0.3}
                textColor="black"
                percent={team.teamGoal.actualCarbonReduction / team.teamGoal.carbonReduction}
              />
              {/* <TeamRing points={team.teamGoal} /> */}
            </Stack>
          </Card>
        )}
      </Stack>
    </Stack>
  );
}

export default Team;

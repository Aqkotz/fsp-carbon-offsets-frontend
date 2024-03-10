/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  Typography, Stack, Card, ToggleButtonGroup, Button, Modal, ModalDialog, Skeleton,
} from '@mui/joy';
import { useSelector, useDispatch } from 'react-redux';
import JoinTeam from './joinTeam';
import { fetchTeam, leaveTeam, testRequest } from './teamSlice';
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
    dispatch(testRequest());
    // dispatch(fetchTeam());
  }, []);

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
    <Stack>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Team: {team.name} </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Carbon Footprint: {carbonFootprint} </Typography>
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
      {/* <DonutChart style={{ width: '10px', height: '10px' }} /> */}
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <CarbonPieChart footprint={team.carbonFootprint} />
        <Leaderboard />
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
    </Stack>
  );
}

export default Team;

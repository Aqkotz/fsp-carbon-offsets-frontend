/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Input, Button, Stack, Typography, Card, Modal, ModalDialog,
} from '@mui/joy';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { joinTeam, createTeam } from './teamSlice';

function JoinTeam() {
  const dispatch = useDispatch();
  const [groupCode, setGroupCode] = useState('');
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = React.useState(dayjs());

  const canSubmit = () => groupCode.length === 5;

  const canCreateTeam = () => name !== '' && name.length <= 20 && name.length >= 3;

  const submitTeam = () => {
    if (!canCreateTeam()) {
      return;
    }
    dispatch(createTeam({
      name,
      startDate: startDate.toDate(),
    }));
    setCreateTeamModalOpen(false);
  };

  const handleInputChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleJoinGroup = () => {
    if (!canSubmit()) {
      return;
    }
    dispatch(joinTeam(groupCode));
    setGroupCode('');
  };

  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card sx={{ width: '50%' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Join a Team! </Typography>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Input placeholder="Team Code" type="text" value={groupCode} onChange={handleInputChange} />
          <Button type="button" onClick={handleJoinGroup} disabled={!canSubmit()}>Join Team</Button>
        </Stack>
      </Card>
      <Card sx={{ width: '50%' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Create a Team! </Typography>
        <Button type="button" onClick={() => { setCreateTeamModalOpen(true); }}>Create Team</Button>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        open={createTeamModalOpen}
        onClose={() => setCreateTeamModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Create a New Team
          </Typography>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Team Name" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Team Start Date"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>
          <Button disabled={!canCreateTeam()} onClick={submitTeam}>Create Team</Button>
          <Button onClick={() => setCreateTeamModalOpen(false)} variant="outlined">Close</Button>
        </ModalDialog>
      </Modal>
    </Stack>
  );
}

export default JoinTeam;

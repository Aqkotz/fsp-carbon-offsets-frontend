import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Input, Button, Stack, Typography,
} from '@mui/joy';
import { joinTeam } from './teamSlice';

function JoinTeam() {
  const dispatch = useDispatch();
  const [groupCode, setGroupCode] = useState('');

  const canSubmit = () => groupCode.length === 5;

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
    <div>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Join a Team! </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Input placeholder="Team Code" type="text" value={groupCode} onChange={handleInputChange} />
        <Button type="button" onClick={handleJoinGroup} disabled={!canSubmit()}>Join Group</Button>
      </Stack>
    </div>
  );
}

export default JoinTeam;

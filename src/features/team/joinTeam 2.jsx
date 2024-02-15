import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Input, Button, Stack, Typography,
} from '@mui/joy';

import { addTeam } from './teamSlice';

function JoinTeam() {
  const dispatch = useDispatch();
  const [groupCode, setGroupCode] = useState('');

  const handleInputChange = (event) => {
    setGroupCode(event.target.value);
  };

  const handleJoinGroup = () => {
    dispatch(addTeam(groupCode));
    setGroupCode({
      groupCode: '',
    });
  };

  return (
    <div>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> Join a Team! </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Input placeholder="Team Code" type="text" value={groupCode} onChange={handleInputChange} />
        <Button type="button" onClick={handleJoinGroup}>Join Group</Button>
      </Stack>
    </div>
  );
}

export default JoinTeam;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack,
} from '@mui/joy';
import { fetchJoinCode } from './adminSlice';

function Admin() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchJoinCode());
  }, []);
  const joinCode = useSelector((state) => state.admin.joinCode);
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Admin
        </Typography>
      </Card>
      {joinCode !== 'loading' && (
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Join Code:
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          {joinCode}
        </Typography>
      </Card>
      )}
    </Stack>
  );
}

export default Admin;

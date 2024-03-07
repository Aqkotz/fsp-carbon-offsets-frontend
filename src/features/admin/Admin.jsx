import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Skeleton,
} from '@mui/joy';
import { fetchJoinCode } from './adminSlice';

function JoinCodeCard({ joinCode }) {
  if (joinCode === 'loading') {
    return (
      <Card>
        <Skeleton width="100px" />
        <Skeleton width="120px" />
      </Card>
    );
  }
  return (
    <Card>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        Join Code:
      </Typography>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        {joinCode}
      </Typography>
    </Card>
  );
}

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
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <JoinCodeCard joinCode={joinCode} sx={{ width: '30%' }} />
      </Stack>
    </Stack>
  );
}

export default Admin;

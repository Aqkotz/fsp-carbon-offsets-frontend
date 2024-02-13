import React from 'react';
import { useSelector } from 'react-redux';
import {
  Card, Typography, Stack,
} from '@mui/joy';

function Admin() {
  const joinCode = useSelector((state) => state.user.joinCode);
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
          Join Code
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

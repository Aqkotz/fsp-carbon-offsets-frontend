import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Skeleton, Sheet, Table,
} from '@mui/joy';
import { fetchJoinCode } from './adminSlice';

function JoinCodeCard({ joinCode }) {
  const teamStatus = useSelector((state) => state.team.team.members);
  if (joinCode === 'loading') {
    return (
      <Card>
        <Skeleton width="100px" />
        <Skeleton width="120px" />
      </Card>
    );
  }
  if (!teamStatus || teamStatus === 'loading') {
    return (
      <Card variant="plain" style={{ position: 'relative', marginTop: '20px', width: '50%' }}>
        <Sheet sx={{ width: '100%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>Team Member</th>
                <th style={{ width: '10%' }}>Carbon Footprint Reductions (kg CO2)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Loading...</td>
                <td>Loading...</td>
                <td>Loading...</td>
              </tr>
            </tbody>
          </Table>
        </Sheet>
      </Card>
    );
  }
  return (
    <Stack>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Join Code:
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          {joinCode}
        </Typography>
      </Card>
      <Card variant="plain" style={{ position: 'relative', marginTop: '20px', width: '50%' }}>
        <Sheet sx={{ width: '100%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Team Member</th>
                <th style={{ width: '50%' }}>Carbon Footprint Reductions (kg CO2)</th>
              </tr>
            </thead>
            <tbody>
              {teamStatus.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '25%' }}> {item.name}</td>
                  <td style={{ width: '50%' }}>{item.carbonReduction}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Card>
    </Stack>
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

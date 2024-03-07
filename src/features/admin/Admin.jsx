import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Skeleton, Button, Modal, ModalDialog, Input,
} from '@mui/joy';
import { useNavigate } from 'react-router';
import { fetchJoinCode, deleteTeam, fetchTeam } from './adminSlice';

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchJoinCode());
    dispatch(fetchTeam());
  }, []);
  const team = useSelector((state) => state.admin.team);
  const joinCode = useSelector((state) => state.admin.joinCode);
  const [deleteTeamModalOpen, setDeleteTeamModalOpen] = useState(false);
  const [deleteTeamInput, setDeleteTeamInput] = useState('');

  const canDeleteTeam = () => {
    return team.name !== '' && deleteTeamInput === team.name;
  };

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card>
        <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Admin For: {team === 'loading' ? <Skeleton variant="text" /> : team.name}
          </Typography>
          <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
            <Button onClick={() => setDeleteTeamModalOpen(true)} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Team</Button>
          </Stack>
        </Stack>
      </Card>
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <Card sx={{ width: '33%' }}>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              {joinCode === 'loading' ? <Skeleton variant="text" /> : 'Join Code:'}
            </Typography>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              {joinCode === 'loading' ? <Skeleton variant="text" /> : joinCode}
            </Typography>
          </Stack>
        </Card>
      </Stack>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={deleteTeamModalOpen}
        onClose={() => setDeleteTeamModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Are you sure? This action will delete the team and all of its data.
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            Type the team name &apos;{team.name}&apos; to confirm deletion.
          </Typography>
          <Input value={deleteTeamInput} onChange={(e) => setDeleteTeamInput(e.target.value)} />
          <Button disabled={!canDeleteTeam()} onClick={() => dispatch(deleteTeam(navigate))} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Team {team.name}</Button>
          <Button onClick={() => setDeleteTeamModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
    </Stack>
  );
}

export default Admin;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Skeleton, Sheet, Table, Modal, ModalDialog, Input, Button, Select, Option,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import {
  fetchJoinCode, deleteTeam, transferOwnership, addAdmin, removeAdmin,
} from './adminSlice';
import { fetchTeam } from '../team/teamSlice';

function MembersCard() {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.team);
  const { members } = team;

  const handleRoleChange = (role, user) => {
    if (role === 'owner') {
      dispatch(transferOwnership(user._id));
    } else if (role === 'admin') {
      dispatch(addAdmin(user._id));
    } else if (role === 'member') {
      dispatch(removeAdmin(user._id));
    }
  };

  const roleForUser = (user) => {
    if (team.owner === user.id) {
      return 'owner';
    }
    if (user.adminOf) {
      return 'admin';
    }
    return 'member';
  };

  if (!members || members === 'loading') {
    return (
      <Card variant="plain" style={{ position: 'relative' }}>
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
      <Card variant="plain" style={{ position: 'relative' }}>
        <Sheet sx={{ width: '100%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Team Member</th>
                <th style={{ width: '50%' }}>Carbon Footprint Reductions (kg CO2)</th>
                <th style={{ width: '25%' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '25%' }}> {item.name}</td>
                  <td style={{ width: '50%' }}> {item.carbonReduction}</td>
                  <td style={{ width: '25%' }}>
                    <Select placeholder="Mode of Travel" onChange={(e, n) => { handleRoleChange(n, item); }} value={roleForUser(item)}>
                      <Option value="member">Member</Option>
                      <Option value="admin">Admin</Option>
                      <Option value="owner">Owner</Option>
                    </Select>
                  </td>
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
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchJoinCode());
    dispatch(fetchTeam());
  }, []);
  const team = useSelector((state) => state.team.team);
  const owner = useSelector((state) => state.admin.isOwner);
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
          {owner ? (
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              Owner Of: {team === 'loading' ? <Skeleton variant="text" /> : team.name}
            </Typography>
          ) : (
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              Admin Of: {team === 'loading' ? <Skeleton variant="text" /> : team.name}
            </Typography>
          )}
          {owner && (
          <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
            <Button onClick={() => setDeleteTeamModalOpen(true)} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Team</Button>
          </Stack>
          )}
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
        <MembersCard sx={{ width: '67%' }} />
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

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Skeleton, Sheet, Table, Modal, ModalDialog, Input, Button, Select, Option,
} from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import {
  fetchJoinCode, deleteTeam, transferOwnership, addAdmin, removeAdmin, addTeamGoal, regenerateJoinCode,
} from './adminSlice';

function MembersCard({ owner }) {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.team);
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [transferInput, setTransferInput] = useState('');
  const [transferName, setTransferName] = useState('');
  const { members } = team;

  const handleRoleChange = (role, user) => {
    if (role === 'owner') {
      setTransferInput(user._id);
      setTransferName(user.name);
      setTransferModalOpen(true);
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

  const sortedMembers = [...members].sort((a, b) => {
    const priority = { owner: 1, admin: 2, member: 3 };
    const roleA = roleForUser(a);
    const roleB = roleForUser(b);
    return priority[roleA] - priority[roleB];
  });

  return (
    <Stack sx={{ width: '50%' }}>
      <Card variant="plain" style={{ position: 'relative' }}>
        <Sheet sx={{ width: '100%' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: '35%' }}>Team Member</th>
                <th style={{ width: '40%' }}>Carbon Footprint Reductions (kg CO2)</th>
                <th style={{ width: '25%' }}>Role</th>
              </tr>
            </thead>
            <tbody>
              {sortedMembers.map((item, index) => (
                <tr key={index}>
                  <td style={{ width: '35%' }}> {item.name}</td>
                  <td style={{ width: '40%' }}> {(item?.carbonFootprint?.reduction?.total ?? 0).toFixed(2)}</td>
                  <td style={{ width: '25%' }}>
                    {roleForUser(item) === 'owner' ? <Typography>Owner</Typography>
                      : (
                        <Select placeholder="Mode of Travel" onChange={(e, n) => { handleRoleChange(n, item); }} value={roleForUser(item)}>
                          <Option value="member">Member</Option>
                          <Option value="admin">Admin</Option>
                          {owner && <Option value="owner">Owner</Option>}
                        </Select>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={transferModalOpen}
        onClose={() => setTransferModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            This action will make {transferName} the owner of the team.
          </Typography>
          <Button onClick={() => dispatch(transferOwnership(transferInput))} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Transfer Ownership</Button>
          <Button onClick={() => setTransferModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
    </Stack>
  );
}

function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchJoinCode());
  }, []);
  const team = useSelector((state) => state.team.team);
  console.log(team);
  const owner = useSelector((state) => state.admin.isOwner);
  const joinCode = useSelector((state) => state.admin.joinCode);
  const [deleteTeamModalOpen, setDeleteTeamModalOpen] = useState(false);
  const [deleteTeamInput, setDeleteTeamInput] = useState('');
  const [addGoalModalOpen, setAddGoalModalOpen] = useState(false);
  const [goalInput, setGoalInput] = useState('');

  const canDeleteTeam = () => {
    return team.name !== '' && deleteTeamInput === team.name;
  };

  const submitGoal = () => {
    dispatch(addTeamGoal({
      carbonReduction: goalInput,
    }));
    setAddGoalModalOpen(false);
    setGoalInput(0);
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
        <Card sx={{ width: '25%' }}>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              {joinCode === 'loading' ? <Skeleton variant="text" /> : 'Join Code:'}
            </Typography>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              {joinCode === 'loading' ? <Skeleton variant="text" /> : joinCode}
            </Typography>
            <Button onClick={() => dispatch(regenerateJoinCode())}>Regenerate Code</Button>
          </Stack>
        </Card>
        <Card sx={{ width: '25%' }}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Add Team Goal
          </Typography>
          <Button onClick={() => setAddGoalModalOpen(true)}>Add Goal</Button>
        </Card>
        <MembersCard sx={{ width: '50%' }} owner={owner} />
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
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={addGoalModalOpen}
        onClose={() => setAddGoalModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Add Team Weekly Goal
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            What is the carbon reduction goal for this week? (kg CO2e)
          </Typography>
          <Input value={goalInput} type="number" onChange={(e) => setGoalInput(e.target.value)} placeholder="carbon reduction for this week" />
          <Button onClick={() => submitGoal()} sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}>Add Goal</Button>
          <Button onClick={() => setAddGoalModalOpen(false)}>Close</Button>
        </ModalDialog>
      </Modal>
    </Stack>
  );
}

export default Admin;

import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import {
  Modal, ModalDialog, Typography, Button, Stack, IconButton, Card, Select, Option,
} from '@mui/joy';
import {
  setGoal,
} from './userGoalsSlice';

function CustomGoal() {
  const dispatch = useDispatch();
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [theme, setTheme] = useState('');
  const [description, setDescription] = useState('');
  const [carbonReduction, setCarbonReduction] = useState(0);

  const submitGoal = () => {
    dispatch(setGoal({
      description,
      carbonReduction,
      theme,
    }));
  };

  const canSubmit = () => {
    return description && carbonReduction && theme;
  };

  return (
    <Stack>
      <Card sx={{ width: '50%' }}>
        <Stack direction="column" justifyContent="space-between" alignItems="center">
          <Typography level="h3" component="h3" sx={{ fontWeight: 'md' }}>
            Add Custom Goal
          </Typography>
          <IconButton aria-label="delete" size="small" onClick={() => setLeaveModalOpen(true)}>
            <AddIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      </Card>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
      >
        <ModalDialog>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
              Creating a custom goal
            </Typography>
            <IconButton aria-label="delete" size="small" onClick={() => setLeaveModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Select placeholder="Theme" onChange={(e, n) => setTheme(n)}>
            <Option value="food">Food</Option>
            <Option value="travel">Travel</Option>
            <Option value="house">House</Option>
          </Select>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            What is your new goal?
          </Typography>
          <input
            placeholder="Goal Description"
            label="description"
            value={description}
            type="text"
            onChange={(e) => { setDescription(e.target.value); }}
          />
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Estimated carbon savings each time the goal is completed
          </Typography>
          <input
            placeholder="kg CO2e"
            label="description"
            value={carbonReduction}
            type="text"
            onChange={(e) => { setCarbonReduction(e.target.value); }}
          />
          <Typography id="modal-description" sx={{ mb: 2 }}>
            Set New Goal
          </Typography>
          <Button disabled={!canSubmit()} onClick={() => dispatch(submitGoal())} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Set Goal</Button>
        </ModalDialog>
      </Modal>
      {/* <DonutChart style={{ width: '10px', height: '10px' }} /> */}
    </Stack>
  );
}

export default CustomGoal;

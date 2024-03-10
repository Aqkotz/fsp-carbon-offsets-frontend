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

function CustomGoal(props) {
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
    <Card variant="filled" padding="0px">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button type="button" disabled={props.disabled} onClick={() => setLeaveModalOpen(true)}>Add Custom Goal <AddIcon style={{ fontSize: 40 }} /></Button>
      </Stack>
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
          <Button
            disabled={!canSubmit()}
            onClick={() => {
              submitGoal();
              setLeaveModalOpen(false);
              setTheme('');
              setDescription('');
              setCarbonReduction(0);
            }}
            sx={{
              backgroundColor: 'green',
              '&:hover': {
                backgroundColor: 'green',
              },
            }}
          >
            Set Goal
          </Button>
        </ModalDialog>
      </Modal>
    </Card>
  );
}

export default CustomGoal;

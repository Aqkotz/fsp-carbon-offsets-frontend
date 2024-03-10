/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  Typography, Card, Box, Button, ButtonGroup, Option, MenuItem, Select, Stack, selectClasses, IconButton, Modal, ModalDialog,
} from '@mui/joy';
import {
  setGoal, getThemes, getGoalsByTheme,
} from './userGoalsSlice';

function DependentDropdown(props) {
  const { setLeaveModalOpen } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThemes());
  }, []);
  const themes = useSelector((state) => state.userGoals.themes);
  const goalOptions = useSelector((state) => state.userGoals.goalOptions);
  const [theme, setTheme] = useState('');
  const [tempGoal, setTempGoal] = useState('');
  useEffect(() => {
    if (theme) {
      dispatch(getGoalsByTheme(theme));
    }
  }, [theme]);

  const handleThemeChange = (e, n) => {
    setTheme(n);
  };

  const canSubmit = () => {
    return tempGoal !== '' && theme !== '';
  };

  const handleSubmit = () => {
    if (!canSubmit()) {
      return;
    }
    const selectedGoal = goalOptions.find((goal) => goal.description === tempGoal);
    if (selectedGoal) {
      dispatch(setGoal(selectedGoal));
    }
  };

  if (!themes || themes === 'loading') {
    return (
      <div />
    );
  }

  return (
    <Card variant="outlined">
      <Stack direction="column" spacing={2}>
        <Select
          value={theme}
          onChange={handleThemeChange}
          label="Category"
        >
          {themes.map((t) => (
            <Option key={t} value={t}>
              {t}
            </Option>
          ))}
        </Select>
        {(goalOptions && goalOptions !== 'loading') && (
        <Select
          value={tempGoal}
          label="Goal"
          onChange={(e, n) => { setTempGoal(n); }}
        >
          {goalOptions.map((g) => (
            <Option key={g.description} value={g.description}>
              {g.description}
            </Option>
          ))}
        </Select>
        )}
        <Button
          onClick={() => {
            handleSubmit();
            setLeaveModalOpen(false);
          }}
          disabled={!canSubmit()}
        >
          Add Goal
        </Button>
      </Stack>
    </Card>
  );
}

export { DependentDropdown };

function SustyGoalInput(props) {
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  return (
    <Card variant="filled">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button type="button" disabled={props.disabled} onClick={() => setLeaveModalOpen(true)}> Predefined Goals <AddIcon style={{ fontSize: 40 }} /></Button>
      </Stack>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
      >
        <ModalDialog sx={{ width: '40%', maxHeight: '80%' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: '20px' }}>
              What is your sustainability goal?
            </Typography>
            <IconButton aria-label="delete" size="small" onClick={() => setLeaveModalOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <DependentDropdown setLeaveModalOpen={setLeaveModalOpen} />
        </ModalDialog>
      </Modal>
    </Card>
  );
}

export default SustyGoalInput;

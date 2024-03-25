/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Button, ButtonGroup, CardOverflow, CardActions, Stack, IconButton, Box, Modal, ModalDialog,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import Streak from './streak2';
import { deleteGoal, setGoalStatusForDay, addPastGoal } from './userGoalsSlice';

function UserGoalSelection(props) {
  const dispatch = useDispatch();
  const { theme } = props.goal;
  const { past } = props;
  const [changeCompleted, setChangeCompleted] = useState(false);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  const getColorByTheme = () => {
    switch (theme) {
      case 'food':
        return 'rgba(9, 145, 104, 0.7)';
      case 'travel':
        return 'rgba(15, 21, 145, 0.4)';
      case 'house':
        return 'rgba(114, 194, 193, 0.7)';
      default:
        return '#FFFFFF';
    }
  };
  const color = getColorByTheme(theme);

  return (
    <Card variant="outlined" sx={{ position: 'relative', minWidth: '450px', width: '33%' }}>
      {!past && (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center" // Align items to center vertically
        spacing={2}
      >
        {/* Center the theme card and stretch across 80% */}
        <Card variant="filled" sx={{ width: 10, height: 10 }} />
        <Card variant="soft" alignItems="center" sx={{ bgcolor: color, width: '90%', mx: 'auto' }}> {/* Making the card thinner and centering the text */}
          <Typography level="h5" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}> {/* Centering the text */}
            {theme.toUpperCase()}
          </Typography>
        </Card>
        <IconButton aria-label="delete" sx={{ width: 10, height: 10 }} onClick={() => setLeaveModalOpen(true)}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      )}
      {past && (
        <Card variant="soft" alignItems="center" sx={{ bgcolor: color, width: '90%', mx: 'auto' }}> {/* Making the card thinner and centering the text */}
          <Typography level="h5" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}> {/* Centering the text */}
            {theme.toUpperCase()}
          </Typography>
        </Card>
      )}
      {!past && (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
      >
        <ModalDialog>
          <Typography id="modal-title" level="h4" component="h2" sx={{ mb: 2 }}>
            Are you sure?
          </Typography>
          <Button onClick={() => { dispatch(deleteGoal(props.goal._id)); }} sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}>Delete Goal</Button>
          <Button onClick={() => {
            setLeaveModalOpen(false);
            dispatch(addPastGoal(props.goal._id));
          }}
          >Log as past goal
          </Button>
        </ModalDialog>
      </Modal>
      )}
      <Typography level="h5" component="h2" sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '1.5rem' }}>
        {props.goal.description.toUpperCase()}
      </Typography>
      {!past && (
      <Card variant="plain">
        <Typography level="h1" component="h2" sx={{ fontWeight: 'md', textAlign: 'center' }}>
          <span style={{ fontSize: '4rem' }}>{props.goal.streakLength}</span>
          <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>  DAY STREAK</span>
        </Typography>
      </Card>
      )}
      {past && (
        <Card variant="plain">
          <Typography level="h1" component="h2" sx={{ fontWeight: 'md', textAlign: 'center' }}>
            <span style={{ fontSize: '4rem' }}>{props.goal.carbonReduction}</span>
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>  KG CO2 SAVED</span>
          </Typography>
        </Card>
      )}
      {!past && (
      <Card variant="plain" alignItems="center">
        <Streak goal={props.goal} />
      </Card>
      )}
      {!past && (
      <CardOverflow sx={{ bgcolor: 'background.level1', bottom: 0 }}>
        <Box marginTop={2} marginBottom={0.5} display="flex" justifyContent="center">
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Did you complete your goal today?
          </Typography>
        </Box>
        <Box m={1}>
          <CardActions buttonFlex="1">
            <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
              <Button onClick={() => { dispatch(setGoalStatusForDay(props.goal._id, 'completed')); }}>
                Yes!
              </Button>
              <Button onClick={() => { dispatch(setGoalStatusForDay(props.goal._id, 'failed')); }}>
                No!
              </Button>
              <Button onClick={() => { dispatch(setGoalStatusForDay(props.goal._id, 'na')); }}> {/* this is if the goal is not applicable for the day */}
                N/A
              </Button>
            </ButtonGroup>
          </CardActions>
        </Box>
      </CardOverflow>
      )}
    </Card>
  );
}

export default UserGoalSelection;

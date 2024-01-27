/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import { setGoal, getGoals } from './userGoalsSlice';

function SustyGoalInput() {
  const [goal, setGoalState] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoals());
  }, []);
  return (
    <Box variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What is your sustainability goal?
      </Typography>
      <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} />
      <button type="button" className="button" onClick={() => { dispatch(setGoal({ description: goal })); setGoalState(''); }}>
        Add Goal
      </button>
    </Box>
  );
}

export default SustyGoalInput;

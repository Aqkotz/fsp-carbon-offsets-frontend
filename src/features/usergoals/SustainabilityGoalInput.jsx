/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Box, Button, ButtonGroup, Option,
} from '@mui/joy';
import Select, { selectClasses } from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { setGoal, getGoals } from './userGoalsSlice';

function SustyGoalInput() {
  const [goal, setGoalState] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoals());
  }, []);
  return (
    <Card variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What is your sustainability goal?
      </Typography>
      {/* <Select placeholder="Theme">
        <Option value="transport">Transport</Option>
        <Option value="dietary">Dietary</Option>
        <Option value="waste">Waste</Option>
      </Select> */}
      <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} />
      <Button onClick={() => { dispatch(setGoal({ description: goal })); setGoalState(''); }}>
        Add Goal
      </Button>
    </Card>
  );
}

export default SustyGoalInput;

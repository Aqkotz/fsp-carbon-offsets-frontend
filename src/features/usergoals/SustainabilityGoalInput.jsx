/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, Card, Box, Button, ButtonGroup, Option, MenuItem, Select, Stack, selectClasses,
} from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import {
  setGoal, getGoals, getThemes, getGoalsByTheme,
} from './userGoalsSlice';

function DependentDropdown() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThemes);
  }, []);
  const themes = useSelector((state) => state.userGoals.themes);
  const goalOptions = useSelector((state) => state.userGoals.goals);
  const [theme, setTheme] = useState('');

  const handleThemeChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory === theme) {
      dispatch(getGoalsByTheme(selectedCategory));
    }
    setTheme(selectedCategory);
  };

  return (
    <Card variant="outlined">
      <Stack direction="column" spacing={2}>
        <Select
          value={theme}
          onChange={handleThemeChange}
          label="Category"
        >
          {themes.map((t) => (
            <MenuItem key={t} value={t}>
              {t}
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </Card>
  );
}

export { DependentDropdown };

function SustyGoalInput() {
  const [goal, theme, setGoalState] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoals());
  }, []);
  return (
    <Card variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1', width: '100%',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What is your sustainability goal?
      </Typography>
      <input value={goal} type="text" onChange={(e) => { setGoalState(e.target.value); }} />
      <Button onClick={() => { dispatch(setGoal({ description: goal })); setGoalState(''); }}>
        Add Goal
      </Button>
    </Card>
  );
}

export default SustyGoalInput;

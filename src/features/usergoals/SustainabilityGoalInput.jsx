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

  const handleSubmit = () => {
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
          onChange={(e, n) => { console.log(n); setTempGoal(n); }}
        >
          {goalOptions.map((g) => (
            <Option key={g.description} value={g.description}>
              {g.description}
            </Option>
          ))}
        </Select>
        )}
        <Button onClick={() => { dispatch(handleSubmit()); }}>
          Add Goal
        </Button>
      </Stack>
    </Card>
  );
}

export { DependentDropdown };

function SustyGoalInput() {
  return (
    <Card variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1', width: '100%',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What is your sustainability goal?
      </Typography>
      <DependentDropdown />
    </Card>
  );
}

export default SustyGoalInput;

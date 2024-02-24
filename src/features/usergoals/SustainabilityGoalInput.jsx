/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Box, Button, ButtonGroup, Option, MenuItem, Select, Stack, selectClasses,
} from '@mui/joy';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { setGoal, getGoals } from './userGoalsSlice';

function DependentDropdown() {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  const initialOptions = {
    travel: ['Flight', 'Train', 'Bus'],
    food: ['Fast Food', 'Restaurant', 'Café'],
    home: ['Cleaning', 'Repair', 'Maintenance'],
  };

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setSubCategory('');
    if (initialOptions[selectedCategory]) {
      setSubCategoryOptions(initialOptions[selectedCategory]);
    } else {
      setSubCategoryOptions([]);
    }
  };

  const handleSubCategoryChange = (event) => {
    setSubCategory(event.target.value);
  };

  return (
    <Card variant="outlined">
      <Stack direction="column" spacing={2}>
        <Select
          value={category}
          onChange={handleCategoryChange}
          label="Category"
        >
          <MenuItem value="travel">Travel</MenuItem>
          <MenuItem value="food">Food</MenuItem>
          <MenuItem value="home">Home</MenuItem>
        </Select>
        <Select
          value={subCategory}
          onChange={handleSubCategoryChange}
          label="Sub-Category"
          disabled={!category || subCategoryOptions.length === 0}
        >
          {subCategoryOptions.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
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

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import {
  Card, Typography, Stack, Button, Grid,
} from '@mui/joy';
import { addFood } from './carbonSlice';

const marks = [
  { value: 0, label: '0' },
  { value: 7, label: '7' },
  { value: 14, label: '14' },
  { value: 21, label: '21' },
];

function valuetext(value) {
  return `${value}°C`;
}

// Reusable Slider Component
function FoodSlider({ label, value, onChange }) {
  return (
    <Box sx={{ width: '70%' }}>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        {label}
      </Typography>
      <Slider
        aria-label={label}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={21}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
}

const defaultFoods = {
  dairy: 0,
  whiteMeat: 0,
  redMeat: 0,
  fish: 0,
  legumes: 0,
  vegetables: 0,
  fruit: 0,
  bread: 0,
  alcohol: 0,
  soft: 0,
  rice: 0,
};

export default function FoodTracking() {
  const dispatch = useDispatch();
  const [foodEmission, setFood] = useState(defaultFoods);

  const handleChange = (attribute, value) => {
    setFood((prevState) => ({
      ...prevState,
      [attribute]: Number(value),
    }));
  };

  const handleSubmit = () => {
    dispatch(addFood(foodEmission));
    setFood(defaultFoods);
  };

  return (
    <Stack spacing={3}>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Food Calculator
        </Typography>
        <Typography level="h5" component="h2" sx={{ fontWeight: 'md' }}>
          How many times have you consumed the following products this week?
        </Typography>
      </Card>
      <Grid container spacing={3}>
        {Object.keys(foodEmission).map((key) => (
          <Grid item xs={6} key={key}>
            <FoodSlider
              label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} // Converts camelCase to Title Case
              value={foodEmission[key]}
              onChange={(e) => handleChange(key, e.target.value)}
            />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button onClick={handleSubmit}>Add Food Analysis</Button>
      </Stack>
    </Stack>
  );
}

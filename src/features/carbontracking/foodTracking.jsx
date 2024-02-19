import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import {
  Card, Typography, Stack, Button,
} from '@mui/joy';
import { addFood } from './carbonSlice';

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 7,
    label: '7',
  },
  {
    value: 14,
    label: '14',
  },
  {
    value: 21,
    label: '21',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

export default function foodTracking() {
  const dispatch = useDispatch();
  const [foodEmission, setFood] = useState({
    dairy: '',
    whiteMeat: '',
    redMeat: '',
    fish: '',
    legumes: '',
    vegetables: '',
    fruit: '',
    bread: '',
    alcohol: '',
    soft: '',
    rice: '',
  });

  const handleChange = (attribute, value) => {
    setFood((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addFood(foodEmission));
    setFood({
      dairy: '',
      whiteMeat: '',
      redMeat: '',
      fish: '',
      legumes: '',
      vegetables: '',
      fruit: '',
      bread: '',
      alcohol: '',
      soft: '',
      rice: '',
    });
  };
  return (
    <Stack spacing={3}>
      <Card>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Food Calculator
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          How many times have you consumed the following products this week?
        </Typography>
      </Card>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Dairy
        </Typography>
        <Slider
          aria-label="Custom marks"
          align="center"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.dairy}
          onChange={(e) => { handleChange('dairy', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          White Meat
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.whiteMeat}
          onChange={(e) => { handleChange('whiteMeat', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Red Meat
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.redMeat}
          onChange={(e) => { handleChange('redMeat', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Fish
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.fish}
          onChange={(e) => { handleChange('fish', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Legumes
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.legumes}
          onChange={(e) => { handleChange('legumes', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Vegetables
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.vegetables}
          onChange={(e) => { handleChange('vegetables', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Fruits
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.fruits}
          onChange={(e) => { handleChange('fruits', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Bread
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.bread}
          onChange={(e) => { handleChange('bread', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Alcohol
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.alcohol}
          onChange={(e) => { handleChange('alcohol', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Soft Drinks
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.soft}
          onChange={(e) => { handleChange('soft', e.target.value); }}
        />
      </Box>
      <Box sx={{ width: 300 }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Rice
        </Typography>
        <Slider
          aria-label="Custom marks"
          defaultValue={1}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="auto"
          marks={marks}
          min={0}
          max={21}
          value={foodEmission.rice}
          onChange={(e) => { handleChange('rice', e.target.value); }}
        />
      </Box>
      <Button onClick={handleSubmit}>Add Food Analysis</Button>
    </Stack>
  );
}

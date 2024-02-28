import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Button, Grid, Box, List, ListItem, ListDivider, Radio, RadioGroup,
} from '@mui/joy';
import { addFood } from './carbonSlice';

const consumptionLevels = {
  everyMeal: 21,
  mostMeals: 14,
  someMeals: 7,
  fewMeals: 3,
  never: 0,
};

const consumptionNames = {
  everyMeal: 'Every Meal',
  mostMeals: 'Most Meals',
  someMeals: 'Some Meals',
  fewMeals: 'Few Meals',
  never: 'Never',
};

// Reusable Slider Component
function ConsumptionLevel({ label, value, onChange }) {
  // Use the `value` prop directly to control the RadioGroup.
  return (
    <Box sx={{ minWidth: 240 }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'rgba(195, 191, 191, 0.9)',
        }}
      >
        <Typography
          id="consumption-level-label"
          level="title-md"
          textColor="text.secondary"
          fontWeight="xl"
        >{label}
        </Typography>
      </Box>
      <RadioGroup
        aria-labelledby="consumption-level-label"
        overlay
        name="consumption-level"
        value={value} // Controlled component: use `value` prop to set the current value.
        onChange={onChange} // Update state based on user interaction.
      >
        <List
          component="div"
          variant="soft"
          orientation="vertical"
          sx={{
            borderRadius: 'sm',
            boxShadow: 'sm',
            backgroundColor: 'rgba(195, 191, 191, 0.9)',
          }}
        >
          {Object.keys(consumptionNames).map((key, index) => (
            <div key={key}>
              {index !== 0 && <ListDivider />}
              <ListItem>
                <Radio id={key} value={key} label={consumptionNames[key]} />
              </ListItem>
            </div>
          ))}
        </List>
      </RadioGroup>
    </Box>
  );
}

const defaultFoods = {
  dairy: 'everyMeal',
  whiteMeat: 'everyMeal',
  redMeat: 'everyMeal',
  fish: 'everyMeal',
  legumes: 'everyMeal',
  vegetables: 'everyMeal',
  fruit: 'everyMeal',
  bread: 'everyMeal',
  alcohol: 'everyMeal',
  soft: 'everyMeal',
  rice: 'everyMeal',
};

export default function FoodTracking() {
  const dispatch = useDispatch();
  const [food, setFood] = useState(defaultFoods);

  const handleChange = (attribute, value) => {
    setFood((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    const f = Object.keys(food).reduce((acc, key) => {
      acc[key] = consumptionLevels[food[key]];
      return acc;
    }, {});
    dispatch(addFood(f));
    setFood(defaultFoods);
  };

  return (
    <Stack spacing={3}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Food Calculator
        </Typography>
      </Card>
      <Card sx={{ backgroundColor: 'white' }}>
        <Typography level="title-md"
          textColor="text.secondary"
          fontWeight="xl"
        >
          How many times have you consumed the following products this week?
        </Typography>
        <Grid container spacing={3}>
          {Object.keys(food).map((key) => (
            <Grid item xs={6} key={key}>
              <ConsumptionLevel
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} // Converts camelCase to Title Case
                value={food[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
      </Card>
      <Stack direction="row" justifyContent="center" spacing={2}>
        <Button onClick={handleSubmit}>Add Food Analysis</Button>
      </Stack>
    </Stack>
  );
}

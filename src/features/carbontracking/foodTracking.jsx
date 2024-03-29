import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  everyMeal: 'Every Meal (21+)',
  mostMeals: 'Most Meals (14-20)',
  someMeals: 'Some Meals (7-13)',
  fewMeals: 'Few Meals (3-6)',
  never: 'Never (0-3)',
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
  dairy: 'never',
  whiteMeat: 'never',
  redMeat: 'never',
  fish: 'never',
  legumes: 'never',
  vegetables: 'never',
  fruit: 'never',
  bread: 'never',
  alcohol: 'never',
  softDrinks: 'never',
  rice: 'never',
};

export default function FoodTracking() {
  const footprint = useSelector((state) => state.carbon.footprint);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [food, setFood] = useState(defaultFoods);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() - today.getDay());
  const startOfWeek = new Date(endOfWeek);
  startOfWeek.setDate(startOfWeek.getDate() - 7);

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

  if (!footprint || footprint === 'loading') {
    return <div />;
  }

  return (
    <Stack spacing={3}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Food Calculator
        </Typography>
      </Card>
      <Card variant="soft" style={{ width: '50%', backgroundColor: 'white', marginBottom: '10px' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Your Weekly Food Carbon Footprint
        </Typography>
        <Typography level="h1" component="h1" sx={{ fontWeight: 'md' }}>
          {Math.floor(footprint.user.weekly.food)} kg CO2e
        </Typography>
      </Card>
      {user.footprintData?.loggedLastWeekFood ? (
        <Card variant="soft" style={{ width: '50%', backgroundColor: 'white', marginBottom: '10px' }}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            You have logged your food consumption for the week of {startOfWeek.toLocaleDateString()} - {endOfWeek.toLocaleDateString()}
          </Typography>
        </Card>
      ) : (
        <Stack direction="column" spacing={2}>
          <Card sx={{ backgroundColor: 'white' }}>
            <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
              Log your food consumption for the week of {startOfWeek.toLocaleDateString()} - {endOfWeek.toLocaleDateString()}
            </Typography>
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
      )}
    </Stack>
  );
}

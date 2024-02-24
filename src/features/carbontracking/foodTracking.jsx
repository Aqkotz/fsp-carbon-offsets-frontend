import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Stack, Button, Grid, Box, List, ListItem, ListDivider, Radio, RadioGroup,
} from '@mui/joy';
import { addFood } from './carbonSlice';

// Reusable Slider Component
function ConsumptionLevel({ label, value, onChange }) {
  const [orientation] = React.useState('vertical');
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
        defaultValue="Every Meal"
      >
        <List
          component="div"
          variant="soft"
          orientation={orientation}
          sx={{
            borderRadius: 'sm',
            boxShadow: 'sm',
            backgroundColor: 'rgba(195, 191, 191, 0.9)',
          }}
        >
          {['Every Meal', 'Most Meals', 'Some Meals', 'Few Meals', 'Never'].map((name, index) => (
            <React.Fragment key={name}>
              {index !== 0 && <ListDivider />}
              <ListItem>
                <Radio id={name} value={name} label={name} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </RadioGroup>
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
          {Object.keys(foodEmission).map((key) => (
            <Grid item xs={6} key={key}>
              <ConsumptionLevel
                label={key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())} // Converts camelCase to Title Case
                value={foodEmission[key]}
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

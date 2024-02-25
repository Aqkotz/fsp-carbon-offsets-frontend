/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import TravelTracking from './travelTracking';
import FoodTracking from './foodTracking';
import HomeTracking from './homeTracking';

function DailyTracking() {
  const [calculatorType, setCalculatorType] = useState('travel');

  const handleChange = (event) => {
    setCalculatorType(event.target.value);
  };

  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      <ToggleButtonGroup
        value={calculatorType}
        // exclusive
        onChange={handleChange}
        aria-label="Platform"
        position="sticky"
        color="primary"
      >
        <Button variant="outlined"
          sx={{
            justifyContent: 'start',
            '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
            color: 'black',
            borderColor: 'black', // Change outline color to black
          }}
          value="travel"
        >TRAVEL
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black', // Change outline color to black
        }}
          value="food"
        >FOOD
        </Button>
        <Button sx={{
          justifyContent: 'start',
          '&:hover': { backgroundColor: 'rgba(195, 191, 191, 0.7)' },
          color: 'black',
          borderColor: 'black', // Change outline color to black
        }}
          value="house"
        >HOME
        </Button>
      </ToggleButtonGroup>
      <div style={{ marginTop: '20px' }}> {/* Add marginTop */}
        {calculatorType && calculatorType === 'travel'
          ? <TravelTracking />
          : calculatorType === 'food'
            ? <FoodTracking />
            : <HomeTracking />}
      </div>
    </div>
  );
}

export default DailyTracking;

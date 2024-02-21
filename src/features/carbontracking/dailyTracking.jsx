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
    <div style={{ position: 'relative' }}>
      <ToggleButtonGroup
        color="neutral"
        value={calculatorType}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
        position="sticky"
        zIndex="999"
      >
        <Button value="travel">TRAVEL</Button>
        <Button value="food">FOOD</Button>
        <Button value="house">HOME</Button>
      </ToggleButtonGroup>
      {calculatorType && calculatorType === 'travel'
        ? <TravelTracking />
        : calculatorType === 'food'
          ? <FoodTracking />
          : <HomeTracking />}
    </div>
  );
}

export default DailyTracking;
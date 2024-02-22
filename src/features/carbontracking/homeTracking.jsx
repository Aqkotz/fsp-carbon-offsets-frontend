import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Button, Option, ToggleButtonGroup,
} from '@mui/joy';
import Select from '@mui/joy/Select';
import { setHouse } from './carbonSlice';

function HomeTracking() {
  const dispatch = useDispatch();
  const [energy, setEnergy] = useState({
    heater: '',
    type: '',
    surface: 0,
    built: '',
    residents: 0,
  });

  const handleChange = (attribute, value) => {
    setEnergy((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(setHouse(energy));
    setEnergy({
      heater: '',
      type: '',
      surface: 0,
      built: '',
      residents: 0,
    });
  };
  return (
    <Card variant="outlined"
      sx={{
        px: 3, py: 1.5, borderRadius: 'sm', backgroundColor: 'background.level1',
      }}
    >
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What type of residence do you live in?
      </Typography>
      <Select placeholder="Residence Type" onChange={(e, n) => { handleChange('type', n); }}>
        <Option value="house">House</Option>
        <Option value="apartment">Apartment</Option>
      </Select>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        What is the square metreage of your residence?
      </Typography>
      <input label="surface" value={energy.surface} type="number" onChange={(e) => { handleChange('surface', e.target.value); }} />
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        How is your house heated?
      </Typography>
      <Select placeholder="Heater Type" onChange={(e, n) => { handleChange('heater', n); }}>
        <Option value="urban">Urban District Heating</Option>
        <Option value="electric">Electric</Option>
        <Option value="fuelOil">Domestic Fuel Oil</Option>
        <Option value="gas">Domestic Gas</Option>
        <Option value="coal">Coal</Option>
        <Option value="heatPump">Heat Pump</Option>
        <Option value="thermalSolar">Thermal Solar</Option>
        <Option value="propane">Propane</Option>
        <Option value="wood">Firewood</Option>
      </Select>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        How many people live in your house?
      </Typography>
      <input label="residents" value={energy.residents} type="text" onChange={(e) => { handleChange('residents', e.target.value); }} />
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        When was your house built?
      </Typography>
      <ToggleButtonGroup
        value={energy.built}
        onChange={(e) => { handleChange('built', e.target.value); }}
        aria-label="Platform"
        position="sticky"
      >
        <Button value="old">Before 1975</Button>
        <Button value="recent">After 1975</Button>
      </ToggleButtonGroup>
      <Button onClick={handleSubmit}>Add Energy Analysis</Button>
    </Card>
  );
}

export default HomeTracking;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Button, Option, Grid, Radio, RadioGroup, radioClasses,
} from '@mui/joy';
import Select from '@mui/joy/Select';
import { addEnergy } from './carbonSlice';

function HomeTracking() {
  const dispatch = useDispatch();
  const [energy, setEnergy] = useState({
    heatingtype: '',
    housingtype: '',
    surfacearea: '',
    age: '',
    residents: '',
    time: '',
  });

  const handleChange = (attribute, value) => {
    setEnergy((prevState) => ({
      ...prevState,
      [attribute]: value,
    }));
  };

  const handleSubmit = () => {
    dispatch(addEnergy(energy));
    setEnergy({
      heater: '',
      type: '',
      surface: '',
      built: '',
      residents: '',
      time: '',
    });
  };

  return (
    <div>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Home Energy Analysis
        </Typography>
      </Card>
      <Card variant="outlined" style={{ minHeight: '300px' }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="outlined"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                What type of residence do you live in?
              </Typography>
              <Select placeholder="Residence Type" onChange={(e, n) => { handleChange('type', n); }}>
                <Option value="house">House</Option>
                <Option value="apartment">Apartment</Option>
              </Select>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="soft"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                What is the square metreage of your residence?
              </Typography>
              <input
                placeholder="Household square metreage"
                label="surfaceArea"
                value={energy.area}
                type="text"
                onChange={(e) => { handleChange('area', e.target.value); }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="soft"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                How is your house heated?
              </Typography>
              <Select placeholder="Heater Type"
                onChange={(e, n) => { handleChange('heater', n); }}
              >
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
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="soft"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                How many people live in your house?
              </Typography>
              <input
                label="residents"
                value={energy.residents}
                type="text"
                onChange={(e) => { handleChange('residents', e.target.value); }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="soft"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                Was your house built before 1975?
              </Typography>
              <RadioGroup name="radio-buttons-group-focus">
                <Radio value="recent" label="Yes" />
                <Radio
                  value="old"
                  label="No"
                  sx={{ [`& .${radioClasses.radio}`]: { position: 'relative' } }}
                  onChange={(e) => { handleChange('age', e.target.value); }}
                />
              </RadioGroup>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card variant="soft"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                backgroundColor: 'rgb(12, 77, 1, 0.1)',
                minHeight: '80%',
              }}
            >
              <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                How long do you plan to live in your residence?
              </Typography>
              <input
                label="time"
                value={energy.time}
                type="text"
                onChange={(e) => { handleChange('time', e.target.value); }}
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={handleSubmit} fullWidth sx={{ backgroundColor: 'rgb(12, 77, 1, 0.3)', color: 'black' }}>Add Energy Analysis</Button>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default HomeTracking;

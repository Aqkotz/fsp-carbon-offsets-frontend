import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, Card, Button, Option, Grid, Radio, RadioGroup, radioClasses, Skeleton, Stack, Sheet, Table,
} from '@mui/joy';
import Select from '@mui/joy/Select';
import { setHouse } from './carbonSlice';

function HomeTracking() {
  const footprint = useSelector((state) => state.carbon.footprint);
  const footprintData = useSelector((state) => state.user.user.footprintData);
  const house = footprintData?.house;
  console.log(house);
  const dispatch = useDispatch();
  const [energy, setEnergy] = useState({
    heater: '',
    type: '',
    time: '',
    surface: 0,
    built: '',
    residents: 0,
  });
  console.log(energy);

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
      time: '',
      surface: 0,
      built: '',
      residents: 0,
    });
  };

  if (!footprint || footprint === 'loading') {
    return (
      <Card>
        <Skeleton variant="text" width={210} height={32} />
        <Skeleton variant="text" width={100} height={28} />
      </Card>
    );
  }

  return (
    <Stack direction="column" spacing={2}>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Home Energy Analysis
        </Typography>
      </Card>
      {house && (
      <Stack direction="row" width="100%" spacing={2}>
        <Card variant="plain" sx={{ fontWeight: 'md', width: '30%' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography sx={{ fontWeight: 'md', fontSize: '60px', marginTop: '10px' }}>
              {(footprint.user.weekly.house ?? 0).toFixed(1)} kg CO2e
            </Typography>
            <Typography sx={{ fontWeight: 'md', fontSize: '25px' }}>
              Weekly House Footprint
            </Typography>
          </Stack>
        </Card>
        <Card variant="plain" sx={{ fontWeight: 'md', width: '70%' }}>
          <Stack direction="column" justifyContent="center" alignItems="center" spacing={2}>
            <Typography sx={{ fontWeight: 'md', fontSize: '25px', marginTop: '10px' }}>
              Your Housing Information
            </Typography>
            <Sheet sx={{ width: '100%' }}>
              <Table>
                {/* <thead>
                  <tr>
                    <th style={{ width: '10%' }}>Team Member</th>
                    <th style={{ width: '10%' }}>Carbon Footprint Reductions (kg CO2)</th>
                  </tr>
                </thead> */}
                <tbody>
                  <tr>
                    <td style={{ width: '25%' }}>Type</td>
                    <td style={{ width: '25%' }}>{house.type}</td>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }}>Heating</td>
                    <td style={{ width: '25%' }}>{house.heater}</td>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }}>Floor Area</td>
                    <td style={{ width: '25%' }}>{house.surface} m2</td>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }}>Residents</td>
                    <td style={{ width: '25%' }}>{house.residents}</td>
                  </tr>
                  <tr>
                    <td style={{ width: '25%' }}>Built</td>
                    <td style={{ width: '25%' }}>{house.built === 'old' ? 'Before 1975' : 'After 1975'}</td>
                  </tr>
                </tbody>
              </Table>
            </Sheet>
          </Stack>
        </Card>
      </Stack>
      )}
      <Card variant="outlined" style={{ minHeight: '300px' }}>
        <Card variant="outlined" sx={{ backgroundColor: '#D9D9D9' }}>
          <Grid container spacing={4} justifyContent="center">
            <Grid xs={12} sm={6} md={4} spacing={4}>
              <Card variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
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
            <Grid xs={12} sm={6} md={4}>
              <Card variant="soft"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
                  minHeight: '80%',
                }}
              >
                <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                  What is the square metreage of your residence?
                </Typography>
                <input
                  placeholder="Household square metreage (m^2)"
                  label="surfaceArea"
                  value={energy.area}
                  type="text"
                  onChange={(e) => { handleChange('surface', e.target.value); }}
                />
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card variant="soft"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
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
            <Grid xs={12} sm={6} md={4}>
              <Card variant="soft"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
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
                  color="rgba(174, 173, 173, 1)"
                  onChange={(e) => { handleChange('residents', e.target.value); }}
                />
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card variant="soft"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
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
                    onChange={(e) => { handleChange('built', e.target.value); }}
                  />
                </RadioGroup>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={4}>
              <Card variant="soft"
                sx={{
                  borderRadius: 'sm',
                  boxShadow: 'sm',
                  backgroundColor: 'rgba(195, 191, 191, 1)',
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
                  color="rgba(174, 173, 173, 1)"
                  onChange={(e) => { handleChange('time', e.target.value); }}
                />
              </Card>
            </Grid>
            <Grid xs={12}>
              <Button onClick={handleSubmit} fullWidth sx={{ backgroundColor: 'rgb(12, 77, 1, 0.3)', color: 'black' }}>Add Energy Analysis</Button>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </Stack>
  );
}

export default HomeTracking;

/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, Card, Stack, Input, IconButton, Button, List, ListItem, ListItemDecorator, Skeleton, Select, Option,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import BarChart from './barChart';
import { addTrip, estimateTrip } from './carbonSlice';

function FlightInput() {
  const dispatch = useDispatch();
  const [stops, setStops] = useState(['', '']);
  const [mode, setMode] = useState('');
  const estimate = useSelector((state) => state.carbon.estimate);
  const loading = estimate === 'loading' || estimate === 'undefined';
  const debouncedApiCallRef = useRef();

  if (!stops) {
    return (
      <div />
    );
  }

  useEffect(() => {
    debouncedApiCallRef.current = debounce((modeOfTravel, legs) => {
      dispatch(estimateTrip({ modeOfTravel, legs }));
    }, 1000);
  }, []);

  const canSubmit = () => {
    if (stops.length < 2) {
      return false;
    }
    const uniqueStops = [...new Set(stops.map((stop) => stop.toLowerCase()))];
    return stops.every((stop) => stop.length >= 2) && uniqueStops.length === stops.length;
  };

  useEffect(() => {
    if (canSubmit() && stops) {
      debouncedApiCallRef.current(mode, stops);
    }
  }, [mode, stops]);

  const handleStopsChange = (s) => {
    setStops(s);
  };

  const handleModeChange = (m) => {
    setMode(m);
  };

  const submit = () => {
    if (canSubmit()) {
      dispatch(addTrip({ modeOfTravel: mode, legs: stops }));
    }
  };

  const estimatedCarbon = () => {
    if (estimate === 'loading') {
      return (
        <div>
          <Skeleton variant="text" width={100} height={36} />
          <Skeleton variant="text" width={100} height={36} />
          <Skeleton variant="text" width={100} height={36} />
        </div>
      );
    } else if (estimate === 'undefined') {
      return (
        <div />
      );
    }
    return (
      <Card variant="plain" alignItems="center" style={{ width: '90%', height: '400px' }}>
        {/* <div style={{ width: '100%', height: '400px' }}> */}
        {/* <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Air: {estimate.air} kg CO2e
          </Typography>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Train: {estimate.rail} kg CO2e
          </Typography>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Car: {estimate.car} kg CO2e
          </Typography> */}
        <BarChart points={estimate} options={{ maintainAspectRatio: false }} style={{ width: '100%', height: '100%' }} />
        {/* </div> */}
      </Card>
    );
  };

  if (stops === 'loading') {
    return (
      <Card>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Skeleton variant="text" width={210} height={32} />
          <Skeleton variant="circular" width={40} height={40} />
        </Stack>
        <List>
          {[...new Array(2)].map((_, index) => ( // Assuming 3 skeleton list items
            <ListItem key={`skeleton-${index}`} sx={{ spacing: 2, justifyContent: 'space-between' }}>
              <ListItemDecorator>
                <Skeleton variant="text" width={100} height={28} />
              </ListItemDecorator>
              <Skeleton variant="rectangular" width={200} height={40} />
            </ListItem>
          ))}
        </List>
        <Skeleton variant="rectangular" width={100} height={36} />
      </Card>
    );
  }

  return (
    <div>
      <Card sx={{ backgroundColor: 'transparent' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Travel Calculator
        </Typography>
      </Card>
      <Card>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Trip Planning
          </Typography>
          <IconButton aria-label="add" onClick={() => { handleStopsChange([...stops, '']); }}>
            <AddIcon />
          </IconButton>
        </Stack>
        <List>
          {stops && stops.map((stop, index) => {
            let label = `Stop ${index}`;
            if (index === 0) {
              label = 'Origin';
            } else if (index === stops.length - 1) {
              label = 'Destination';
            }

            return (
              <ListItem key={`key-${index}`} sx={{ display: 'flex', alignItems: 'right' }}>
                <ListItemDecorator sx={{ marginBottom: '8px', marginRight: '10px' }}>
                  <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                    {label}
                  </Typography>
                </ListItemDecorator>
                <Stack direction="row" alignItems="center" spacing={1} flexGrow={0}>
                  <Input value={stop} onChange={(e) => { const newStops = [...stops]; newStops[index] = e.target.value; handleStopsChange(newStops); }} sx={{ marginBottom: '8px' }} />
                  <ListItemDecorator>
                    <IconButton aria-label="delete" size="small" onClick={() => { handleStopsChange(stops.filter((s, i) => { return i !== index; })); }}>
                      <CloseIcon />
                    </IconButton>
                  </ListItemDecorator>
                </Stack>
              </ListItem>
            );
          })}
        </List>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}> How will you be traveling? </Typography>
        <Select placeholder="Mode of Travel" onChange={(e, n) => { handleModeChange(n); }}>
          <Option value="air">{loading ? 'Air' : `Air: ${estimate.air} kg CO2e`}</Option>
          <Option value="rail">{loading ? 'Rail' : `Rail: ${estimate.rail} kg CO2e`}</Option>
          <Option value="car">{loading ? 'Car' : `Car: ${estimate.car} kg CO2e`}</Option>
        </Select>
        {estimatedCarbon()}
        <Button onClick={() => { submit(); }} sx={{ width: 100 }} disabled={!canSubmit()}>Add Trip</Button>
      </Card>
    </div>
  );
}

export default FlightInput;

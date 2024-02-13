/* eslint-disable react/no-array-index-key */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography, Card, Stack, Input, IconButton, Button, List, ListItem, ListItemDecorator, Skeleton, Select, Option,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { debounce } from 'lodash';
import { addTrip, estimateTrip } from './carbonSlice';

function FlightInput() {
  const dispatch = useDispatch();
  const [stops, setStops] = useState(['', '']);
  const [mode, setMode] = useState('');
  const estimate = useSelector((state) => state.carbon.estimate);
  const debouncedApiCallRef = useRef();

  if (!stops) {
    return (
      <div />
    );
  }

  useEffect(() => {
    // Initialize the debounced function inside useEffect so it's created only once.
    // This time, the function takes parameters for mode and stops to ensure it uses the latest values.
    debouncedApiCallRef.current = debounce((modeOfTravel, legs) => {
      dispatch(estimateTrip({ modeOfTravel, legs }));
    }, 1000);
  }, []); // Empty dependency array ensures this effect runs only once.

  const canSubmit = () => {
    if (mode === '' || stops.length < 2) {
      return false;
    }
    const uniqueStops = [...new Set(stops.map((stop) => stop.toLowerCase()))];
    return stops.every((stop) => stop.length >= 2) && uniqueStops.length === stops.length;
  };

  useEffect(() => {
    if (canSubmit()) {
      // Call the debounced function using .current and pass the latest state as arguments.
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
    } else {
      console.log('Invalid stops');
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
      <div>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Air: {estimate.air} kg CO2e
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Train: {estimate.rail} kg CO2e
        </Typography>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Car: {estimate.car} kg CO2e
        </Typography>
      </div>
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
    <Card>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          New Trip
        </Typography>
        <IconButton aria-label="add" onClick={() => { handleStopsChange(stops.push('')); }}>
          <AddIcon />
        </IconButton>
      </Stack>
      <Select placeholder="Mode of Travel" onChange={(e, n) => { handleModeChange(n); }}>
        <Option value="air">Plane</Option>
        <Option value="rail">Train</Option>
        <Option value="car">Car</Option>
      </Select>
      <List>
        {stops && stops.map((stop, index) => {
          let label = `Stop ${index}`;
          if (index === 0) {
            label = 'Origin';
          } else if (index === stops.length - 1) {
            label = 'Destination';
          }

          return (
            <ListItem key={`key-${index}`} sx={{ spacing: 2, justifyContent: 'space-between' }}>
              <ListItemDecorator sx={{ marginBottom: '8px' }}>
                <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                  {label}
                </Typography>
              </ListItemDecorator>
              <Stack direction="row" alignItems="center" spacing={2} flexGrow={0}>
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
      {estimatedCarbon()}
      <Button onClick={() => { submit(); }} sx={{ width: 100 }} disabled={!canSubmit()}>Add Trip</Button>
    </Card>
  );
}

export default FlightInput;

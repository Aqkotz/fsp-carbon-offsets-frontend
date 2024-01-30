/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Typography, Card, Stack, Input, IconButton, Button, List, ListItem, ListItemDecorator, Skeleton,
} from '@mui/joy';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  setStop, addStop, submitStops, removeStop,
} from './carbonSlice';

function FlightInput(props) {
  const dispatch = useDispatch();
  const { stops } = props;

  if (!stops) {
    return (
      <div />
    );
  }

  const canSubmit = () => {
    console.log(stops);
    const uniqueStops = [...new Set(stops.map((stop) => stop.toLowerCase()))];
    return stops.every((stop) => stop.length === 3) && uniqueStops.length === stops.length;
  };

  const submit = () => {
    if (canSubmit()) {
      dispatch(submitStops(stops));
    } else {
      console.log('Invalid stops');
    }
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
          Your Flights
        </Typography>
        <IconButton aria-label="add" onClick={() => { dispatch(addStop('')); }}>
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
            <ListItem key={`key-${index}`} sx={{ spacing: 2, justifyContent: 'space-between' }}>
              <ListItemDecorator sx={{ marginBottom: '8px' }}>
                <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
                  {label}
                </Typography>
              </ListItemDecorator>
              <Stack direction="row" alignItems="center" spacing={2} flexGrow={0}>
                <Input value={stop} onChange={(e) => { dispatch(setStop({ index, stop: e.target.value })); }} sx={{ marginBottom: '8px' }} />
                <ListItemDecorator>
                  <IconButton aria-label="delete" size="small" onClick={() => { dispatch(removeStop(index)); }}>
                    <CloseIcon />
                  </IconButton>
                </ListItemDecorator>
              </Stack>
            </ListItem>
          );
        })}
      </List>
      <Button onClick={() => { submit(); }} sx={{ width: 100 }} disabled={!canSubmit()}>Save</Button>
    </Card>
  );
}

export default FlightInput;

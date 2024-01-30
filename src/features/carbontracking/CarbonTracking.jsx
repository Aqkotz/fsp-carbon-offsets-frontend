/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/joy';
import { fetchStops } from './carbonTrackingSlice';
import FlightInput from './FlightInput';

function CarbonTracking(props) {
  const dispatch = useDispatch();
  const stops = useSelector((state) => state.carbon.stops);
  useEffect(() => {
    if (stops === 'loading') {
      dispatch(fetchStops());
    }
  }, []);

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <FlightInput stops={stops} />
    </Stack>
  );
}

export default CarbonTracking;

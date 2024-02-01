import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack } from '@mui/joy';
import { fetchStops } from './carbonSlice';
import FlightInput from './FlightInput';
import CarbonFootprint from './CarbonFootprint';

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
      <CarbonFootprint />
    </Stack>
  );
}

export default CarbonTracking;

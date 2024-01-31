/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stack, Card, Typography, Box,
} from '@mui/joy';
import { fetchStops } from './carbonSlice';
import FlightInput from './FlightInput';
import CarbonFootprint from './CarbonFootprint';
import logo from '../../img/climatiqWhite.png';

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
      <Card variant="plain"
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
        }}
      >
        <Stack direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography level="h4" component="h1" sx={{ fontWeight: 'md' }}>
            Travel Calculator Powered By
          </Typography>
          <Box component="img" src={logo} alt="Logo" sx={{ width: '8%', height: 'auto', padding: '16px' }} />
        </Stack>
      </Card>
    </Stack>
  );
}

export default CarbonTracking;

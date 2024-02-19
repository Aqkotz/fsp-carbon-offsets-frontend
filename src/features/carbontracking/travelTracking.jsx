import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stack, Card, Typography, Box,
} from '@mui/joy';
import { fetchTrips } from './carbonSlice';
import CarbonFootprint from './CarbonFootprint';
import FlightInput from './FlightInput';
import logo from '../../img/climatiqWhite.png';

function CarbonTracking(props) {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.carbon.trips);
  useEffect(() => {
    if (trips === 'loading') {
      dispatch(fetchTrips());
    }
  }, []);

  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      {/* <Card variant="soft" style={{ width: '100%', postition: 'relative' }}> */}
      <FlightInput />
      {/* </Card> */}
      <CarbonFootprint />
      <Card sx={{ backgroundColor: '#D9D9D9' }} variant="outlined">
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

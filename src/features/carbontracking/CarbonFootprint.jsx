import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Card, Typography, Skeleton, Stack,
} from '@mui/joy';
import { fetchCarbonFootprint } from './carbonSlice';
import TravelDetails from './TravelDetails';

function CarbonFootprint(props) {
  const dispatch = useDispatch();
  const footprint = useSelector((state) => state.carbon.footprint);
  console.log(footprint);
  useEffect(() => {
    dispatch(fetchCarbonFootprint());
  }, []);

  if (!footprint || footprint === 'loading') {
    return (
      <Card>
        <Skeleton variant="text" width={210} height={32} />
        <Skeleton variant="text" width={100} height={28} />
      </Card>
    );
  }
  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
      <TravelDetails />
      <Card variant="soft" style={{ width: '50%', backgroundColor: 'white' }}>
        <Typography level="h3" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
          Your Travel Carbon Footprint
        </Typography>
        <Typography level="h1" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
          {Math.floor(footprint.user.weekly.travel)} kg CO2e
        </Typography>
      </Card>
    </Stack>
  );
}

export default CarbonFootprint;

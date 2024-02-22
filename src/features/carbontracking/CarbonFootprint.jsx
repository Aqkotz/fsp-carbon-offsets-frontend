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
    if (footprint === 'loading') {
      dispatch(fetchCarbonFootprint());
    }
  }, []);

  if (footprint === 'loading') {
    return (
      <Card>
        <Skeleton variant="text" width={210} height={32} />
        <Skeleton variant="text" width={100} height={28} />
      </Card>
    );
  }
  return (
    <Stack direction="column" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card variant="soft" style={{ width: '100%' }}>
        <TravelDetails />
      </Card>
      <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2} style={{ width: '100%' }}>
        <Card variant="soft" style={{ width: '50%' }}>
          <Typography level="h3" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            Your Total Carbon Footprint
          </Typography>
          <Typography level="h1" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            {Math.floor(footprint.total)} kg CO2e
          </Typography>
        </Card>
        <Card variant="soft" style={{ width: '50%' }}>
          <Typography level="h3" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            Your Housing Carbon Footprint
          </Typography>
          <Typography level="h1" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            {Math.floor(footprint.house)} kg CO2e
          </Typography>
        </Card>
        <Card variant="soft" style={{ width: '50%' }}>
          <Typography level="h3" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            Your Food Carbon Footprint
          </Typography>
          <Typography level="h1" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            {Math.floor(footprint.food)} kg CO2e
          </Typography>
        </Card>
        <Card variant="soft" style={{ width: '50%' }}>
          <Typography level="h3" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            Your Travel Carbon Footprint
          </Typography>
          <Typography level="h1" alignContent="center" component="h1" sx={{ fontWeight: 'md' }}>
            {Math.floor(footprint.travel)} kg CO2e
          </Typography>
        </Card>
      </Stack>
    </Stack>
  );
}

export default CarbonFootprint;

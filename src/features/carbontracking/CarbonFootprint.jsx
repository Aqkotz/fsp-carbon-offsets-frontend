import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Typography, Skeleton } from '@mui/joy';
import { fetchCarbonFootprint } from './carbonSlice';
import PieActiveArc from './dataVis';

function CarbonFootprint(props) {
  const dispatch = useDispatch();
  const kg = useSelector((state) => state.carbon.kg);
  useEffect(() => {
    if (kg === 'loading') {
      dispatch(fetchCarbonFootprint());
    }
  }, []);

  if (kg === 'loading') {
    return (
      <Card>
        <Skeleton variant="text" width={210} height={32} />
        <Skeleton variant="text" width={100} height={28} />
      </Card>
    );
  }
  return (
    <Card>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        Carbon Footprint
      </Typography>
      <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
        {kg} kg CO2e
      </Typography>
      <PieActiveArc points={kg} />
    </Card>
  );
}

export default CarbonFootprint;

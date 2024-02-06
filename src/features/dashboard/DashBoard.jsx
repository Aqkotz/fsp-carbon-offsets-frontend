import React from 'react';
import { Card, Typography, Stack } from '@mui/joy';
import { useSelector } from 'react-redux/es/hooks/useSelector';

function DashBoard() {
  const kg = useSelector((state) => state.carbon.kg);
  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card variant="outlined">
        <Typography>
          Your Total Travel Carbon Footprint is: {kg} kg CO2e
        </Typography>
      </Card>
      <Card variant="outlined">
        <Typography>
          Your Total Food Carbon Footprint is: {kg} kg CO2e
        </Typography>
      </Card>
    </Stack>
  );
}

export default DashBoard;

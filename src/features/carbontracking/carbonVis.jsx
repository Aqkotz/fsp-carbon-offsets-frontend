import React from 'react';
import { Card } from '@mui/joy';
import totalDonutChart from './totalCarbonDonut';

function carbonVis() {
  return (
    <Card>
      <totalDonutChart style={{ width: '10px', height: '10px' }} />
    </Card>
  );
}

export default carbonVis;

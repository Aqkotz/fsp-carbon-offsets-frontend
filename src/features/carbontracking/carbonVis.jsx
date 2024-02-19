import React from 'react';
import { Card } from '@mui/joy';
import DonutChart from '.../team/doughnutChart';

function carbonVis() {
  return (
    <Card>
      <DonutChart style={{ width: '10px', height: '10px' }} />
    </Card>
  );
}

export default carbonVis;

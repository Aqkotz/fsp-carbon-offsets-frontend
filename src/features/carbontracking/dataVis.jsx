import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function SimpleBarChart(props) {
  const { air, rail, car } = props.points;
  const xLabel = ['Travel'];

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: [air], label: 'Flight CO2e', id: 'airId' },
        { data: [rail], label: 'Train CO2e', id: 'railId' },
        { data: [car], label: 'Car CO2e', id: 'carId' },
      ]}
      xAxis={[{ data: xLabel, scaleType: 'band' }]}
    />
  );
}

import React from 'react';
import { PieChart, BarChart } from '@mui/x-charts';

export default function PieActiveArc(props) {
  // const { points } = props;
  const data = [
    { id: 0, value: 10, label: 'Flight 1' },
    { id: 1, value: 3000, label: 'Flight 2' },
  ];
    // { id: 0, value: points, label: 'Flight 1' },
    // { id: 1, value: 3000 - points, label: 'Flight 2' },
  // ];

  return (
    <PieChart skipAnimation
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}

export function SimpleBarChart(props) {
  const { points } = props;
  const data = [
    { data: points.air, label: 'Air', id: 'airId' },
    { data: points.rail, label: 'Rail', id: 'railId' },
    { data: points.car, label: 'Car', id: 'carId' },
  ];
  const xLabels = ['Air', 'Rail', 'Car'];
  return (
    <BarChart skipAnimation
      width={500}
      height={300}
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { color: 'gray' },
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}

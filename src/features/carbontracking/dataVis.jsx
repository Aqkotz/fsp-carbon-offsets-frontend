import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieActiveArc(props) {
  const { points } = props;
  console.log(points);
  const data = [
    { id: 0, value: points, label: 'Flight 1' },
    { id: 1, value: 100 - points, label: 'Flight 2' },
  ];

  return (
    <PieChart
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

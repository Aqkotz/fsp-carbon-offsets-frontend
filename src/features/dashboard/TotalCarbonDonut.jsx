import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function TotalCarbonDonut(props) {
  const { points } = props;
  if (!points) {
    return (
      <div />
    );
  }
  const totalSum = points.total;
  const data = {
    labels: ['Travel', 'Food', 'Home Emissions'],
    datasets: [
      {
        label: 'Total Carbon Emissions CO2e (kg)',
        data: [points.travel, points.food, points.house],
        backgroundColor: [
          'rgba(9, 145, 104, 0.7)',
          'rgba(15, 21, 145, 0.4)',
          'rgba(114, 194, 193, 0.7)',
        ],
        borderColor: [
          'rgba(9, 145, 104, 0.7)',
          'rgba(15, 21, 145, 0.4)',
          'rgba(114, 194, 193, 0.7)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Carbon Footprint',
      },
      afterDraw: (chart) => {
        const { ctx } = chart;
        const { width } = chart;
        const { height } = chart;
        ctx.restore();
        const fontSize = (height / 114).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const text = `${totalSum} kg CO2e`;
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  };

  return <Doughnut data={data} options={options} sx={{ width: '100px', height: 'auto' }} />;
}

export default TotalCarbonDonut;

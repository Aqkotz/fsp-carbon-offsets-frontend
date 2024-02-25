import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function BarChart(props) {
  const { points } = props;
  const data = {
    labels: ['Home Emissions Berlin', 'Average Dartmouth Student Emissions'],
    datasets: [
      {
        label: [],
        data: [points.you, points.average],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Home Emissions Berlin vs. Average Dartmouth Student Emissions',
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;

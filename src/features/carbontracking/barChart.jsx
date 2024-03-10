import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function BarChart(props) {
  const { points } = props;
  const data = {
    labels: ['Air kg CO2e', 'Rail kg CO2e', 'Car kg CO2e'],
    datasets: [
      {
        label: [],
        data: [points.air, points.rail, points.car],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(199, 199, 199, 0.2)',
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(199, 199, 199, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        axisLabel: {
          display: true,
          labelString: 'kg CO2e',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Kg CO2e produced by Air, Rail, and Car',
      },
    },
  };

  return <Bar data={data} options={options} />;
}

export default BarChart;

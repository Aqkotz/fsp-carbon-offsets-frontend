import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function FoodDonutChart(props) {
  const { points } = props;
  const data = {
    labels: ['Alcohol', 'Bread', 'Dairy', 'Fish', 'Fruits', 'Legumes', 'Vetegables', 'Red Meat', 'White Meat', 'Rice', 'Soft Drinks'],
    datasets: [
      {
        label: 'Weekly Food Emissions CO2e (kg)',
        data: [points.alcohol, points.bread, points.dairy, points.fish, points.fruits, points.legumes, points.vegetables, points.redMeat, points.whiteMeat, points.rice, points.soft],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(205, 92, 92, 0.2)',
          'rgba(144, 238, 144, 0.2)',
          'rgba(255, 140, 0, 0.2)',
          'rgba(65, 105, 225, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(205, 92, 92, 1)',
          'rgba(144, 238, 144, 1)',
          'rgba(255, 140, 0, 1)',
          'rgba(65, 105, 225, 1)',
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
        text: 'Our Team Carbon Footprint',
      },
    },
  };

  return <Doughnut data={data} options={options} />;
}

export default FoodDonutChart;

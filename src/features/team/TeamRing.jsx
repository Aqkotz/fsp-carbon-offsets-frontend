import React from 'react';
import GoalRing from './GoalRing';

function TeamRing(props) {
  const { points } = props;
  const data = [
    {
      label: `${points.actualCarbonReduction}\nkg CO2e Saved`, color: 'rgba(54, 162, 235, 0.2)', value: points.actualCarbonReduction, maxValue: points.carbonReduction,
    },
  ];

  return (
    <GoalRing data={data} />
  );
}

export default TeamRing;

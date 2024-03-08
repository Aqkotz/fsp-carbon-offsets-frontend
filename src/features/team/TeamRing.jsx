import React from 'react';
import GoalRing from './GoalRing';

function TeamRing(props) {
  const { points } = props;
  const data = [
    {
      label: 'Carbon Meter', color: 'rgba(54, 162, 235, 0.2)', value: points.currentSavings, maxValue: points.goalSavings,
    },
  ];

  return (
    <div className="App">
      <GoalRing data={data} />
    </div>
  );
}

export default TeamRing;

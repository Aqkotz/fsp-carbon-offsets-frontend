import React from 'react';
import GoalRing from './GoalRing';

function TeamRing() {
  const data = [
    {
      label: 'Carbon Meter', color: 'rgba(54, 162, 235, 0.2)', value: 100, maxValue: 300,
    },
  ];

  return (
    <div className="App">
      <GoalRing data={data} />
    </div>
  );
}

export default TeamRing;

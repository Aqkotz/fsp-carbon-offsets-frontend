import React from 'react';
import { increment } from './userGoalsSlice';

function UserGoals() {
  return (
    <div>
      <h1
        onClick={() => {
          increment();
        }}
      >UserGoals
      </h1>
    </div>
  );
}

export default UserGoals;

import React, { useState } from 'react';
import UserGoalSelection from './UserGoalSelection';
import SustyGoalInput from './SustainabilityGoalInput';
import GoalComplete from './GoalComplete';
import Streak from './Streak';

function UserGoals() {
  const [selectionShown, setSelectionShown] = useState(true);

  return (
    <div className="page">
      <SustyGoalInput />
      <div className="container">
        <h1
          className="post-title"
          onClick={() => { setSelectionShown(!selectionShown); }}
        >Weekly Goal Setting
        </h1>
        {selectionShown && <UserGoalSelection />}
        <GoalComplete />
      </div>
      <Streak />
    </div>
  );
}

export default UserGoals;

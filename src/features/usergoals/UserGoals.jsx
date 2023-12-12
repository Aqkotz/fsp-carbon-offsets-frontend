import React, { useState } from 'react';
import UserGoalSelection from './UserGoalSelection';

function UserGoals() {
  const [selectionShown, setSelectionShown] = useState(true);

  return (
    <div className="page">
      <div className="container">
        <h1
          className="post-title"
          onClick={() => { setSelectionShown(!selectionShown); }}
        >Weekly Goal Setting
        </h1>
        {selectionShown && <UserGoalSelection />}
      </div>
    </div>
  );
}

export default UserGoals;

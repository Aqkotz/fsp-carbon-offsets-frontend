import React, { useState } from 'react';
import UserGoalSelection from './UserGoalSelection';

function UserGoals() {
  const [selectionShown, setSelectionShown] = useState(false);

  return (
    <div className="page">
      <div className="container">
        <h1
          className="post-title"
          onClick={() => { setSelectionShown(!selectionShown); }}
        >UserGoals
        </h1>
        {selectionShown && <UserGoalSelection />}
      </div>
    </div>
  );
}

export default UserGoals;

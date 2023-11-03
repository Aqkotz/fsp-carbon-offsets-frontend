import React, { useState } from 'react';
import UserGoalSelection from './UserGoalSelection';

function UserGoals() {
  const [selectionShown, setSelectionShown] = useState(false);

  return (
    <div>
      <h1
        onClick={() => { setSelectionShown(!selectionShown); }}
      >UserGoals
      </h1>
      {selectionShown && <UserGoalSelection />}
    </div>
  );
}

export default UserGoals;

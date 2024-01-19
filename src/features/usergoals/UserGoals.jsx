import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserGoalSelection from './UserGoalSelection';
<<<<<<< Updated upstream
=======
import SustyGoalInput from './SustainabilityGoalInput';
// import Streak from './Streak';
>>>>>>> Stashed changes

function UserGoals() {
  const [selectionShown, setSelectionShown] = useState(true);
  const goals = useSelector((state) => state.userGoals.goals);

  return (
    <div className="page">
      <div className="container">
        <h1
          className="post-title"
          onClick={() => { setSelectionShown(!selectionShown); }}
        >Weekly Goal Setting
        </h1>
<<<<<<< Updated upstream
        {selectionShown && <UserGoalSelection />}
=======
        <div className="container2">
          {
          goals.map((goal) => {
            return (
              <UserGoalSelection goal />
            );
          })
        }
        </div>
>>>>>>> Stashed changes
      </div>
    </div>
  );
}

export default UserGoals;

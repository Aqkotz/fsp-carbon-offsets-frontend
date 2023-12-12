import React from 'react';

function UserGoal(props) {
  return (
    <div className="button">
      <h2>
        {props.goal.name}
      </h2>

      <p>
        {props.goal.description}
      </p>
    </div>

  );
}

export default UserGoal;

import React from 'react';
import { useSelector } from 'react-redux';

function Streak() {
  const streak = useSelector((state) => state.userGoals.streak);
  const content = [];
  for (let i = 0; i < streak; i += 1) {
    content.push(
      <div key={i}>
        <span role="img" style={{ fontSize: '5rem' }} aria-label="fire-emoji">🔥</span>
      </div>,
    );
  }
  return <div className="clearcontainer2">{content}</div>;
}

export default Streak;

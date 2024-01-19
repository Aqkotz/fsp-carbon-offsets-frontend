import React from 'react';
import { useSelector } from 'react-redux';

function Streak() {
  const streak = useSelector((state) => state.userGoals.streak);
  const content = [];
  for (let i = 0; i < streak; i += 1) {
    content.push(
      <div className="container2 allign-h" key={i}>
        <span role="img" style={{ fontSize: '1rem' }} aria-label="check-mark">✅</span>
      </div>,
    );
  }
  return <div>{content}</div>;
}

export default Streak;

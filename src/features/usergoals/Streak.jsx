/* eslint-disable react/no-array-index-key */
import React from 'react';

function Streak(props) {
  const { streak } = props.goal;
  const content = streak.map((day, i) => {
    if (day) {
      return (
        <div className="container2 allign-h" key={i}>
          <span role="img" style={{ fontSize: '1rem' }} aria-label="check-mark">✅</span>
        </div>
      );
    }
    return (
      <div className="container2 allign-h" key={i}>
        <span role="img" style={{ fontSize: '1rem' }} aria-label="x-mark">❌</span>
      </div>
    );
  });
  return <div className="container2">{content}</div>;
}

export default Streak;

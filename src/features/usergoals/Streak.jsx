/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Card, Stack } from '@mui/joy';

function Streak(props) {
  const { streak } = props.goal;
  const content = streak.map((day, i) => {
    if (day) {
      return (
        <Card variant="plain" key={i}>
          <span role="img" style={{ fontSize: '1rem' }} aria-label="check-mark">✅</span>
        </Card>
      );
    }
    return (
      <Card variant="plain" key={i} sx={{ pading: '2px' }}>
        <span role="img" style={{ fontSize: '1rem' }} aria-label="x-mark">❌</span>
      </Card>
    );
  });
  return (
    <Stack direction="row" variant="plain" ustifyContent="flex-start" alignItems="center">{content}</Stack>
  );
}

export default Streak;

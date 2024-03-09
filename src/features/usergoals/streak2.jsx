import React from 'react';
import {
  Card, Stack, Typography,
} from '@mui/joy';
import greyCheck from '../../img/GreyCheck.png';
import greenCheck from '../../img/GreenCheck.png';
import redX from '../../img/RedX.png';

function Streak(props) {
  const { currentWeek } = props.goal;
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const dayCard = (day) => {
    if (day === 'completed') {
      return (
        <Card variant="plain">
          <img src={greenCheck}
            alt="Check Mark"
            style={{ width: '2rem', height: '2rem' }}
          />
        </Card>
      );
    } else if (day === 'failed') {
      return (
        <Card variant="plain">
          <img src={redX}
            alt="X Mark"
            style={{ width: '2rem', height: '2rem' }}
          />
        </Card>
      );
    } else if (day === 'future' || day === 'past') {
      return (
        <Card variant="plain">
          <img src={greyCheck}
            alt="Check Mark"
            style={{ width: '2rem', height: '2rem' }}
          />
        </Card>
      );
    }
    return (
      <Card variant="plain">
        <img src={greyCheck}
          alt="Check Mark"
          style={{ width: '2rem', height: '2rem' }}
        />
      </Card>
    );
  };

  const content = currentWeek.map((day, i) => (
    <Card key={day.date} variant="plain" sx={{ p: 0 }}>
      <Stack direction="column" alignItems="center">
        <Typography level="h5" component="h1" sx={{ fontWeight: 'md' }}>
          {daysOfWeek[i]}
        </Typography>
        {dayCard(day.completed)}
      </Stack>
    </Card>
  ));

  return (
    <Stack direction="row">
      {content}
    </Stack>
  );
}

export default Streak;

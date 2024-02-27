import React from 'react';
import {
  Card, Stack, Typography,
} from '@mui/joy';
import greyCheck from '../../img/GreyCheck.png';
import greenCheck from '../../img/GreenCheck.png';
import redX from '../../img/RedX.png';

function Streak(props) {
  const { currentWeek } = props.goal;
  console.log(currentWeek);
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const dayCard = (day) => {
    if (day === 'completed') {
      return (
        <Card variant="plain">
          <img src={greenCheck}
            alt="Check Mark"
            style={{ width: '1rem', height: '1rem' }}
          />
        </Card>
      );
    } else if (day === 'failed') {
      return (
        <Card variant="plain">
          <img src={redX}
            alt="X Mark"
            style={{ width: '1rem', height: '1rem' }}
          />
        </Card>
      );
    } else if (day === 'future' || day === 'past') {
      return (
        <Card variant="plain">
          <img src={greyCheck}
            alt="Check Mark"
            style={{ width: '1rem', height: '1rem' }}
          />
        </Card>
      );
    }
    return (
      <Card variant="plain">
        <img src={greyCheck}
          alt="Check Mark"
          style={{ width: '1rem', height: '1rem' }}
        />
      </Card>
    );
  };

  const content = currentWeek.map((day, i) => (
    <Card key={day.date}>
      <Stack direction="column" alignItems="center">
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          {daysOfWeek[i]}
        </Typography>
        {dayCard(day.status)}
      </Stack>
    </Card>
  ));

  return (
    <Stack direction="row" spacing={2}>
      {content}
    </Stack>
  );
}

export default Streak;

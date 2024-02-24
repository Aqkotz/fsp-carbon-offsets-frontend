import React from 'react';
import {
  Card, Stack, Box, Typography,
} from '@mui/joy';
import greyCheck from '../../img/GreyCheck.png';
// import yellowCheck from '../../img/YellowCheck.png';
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

  const content = currentWeek.map((day, i) => {
    return (
      <Box key={day.date} sx={{ width: '1rem', height: '1rem' }}>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          {daysOfWeek[i]}
        </Typography>
        {dayCard(day.status)}
      </Box>
    );
  });

  return (
    <Stack direction="row" justifyContent="flex-start" alignItems="stretch" spacing={2}>
      <Card>
        {content}
      </Card>
    </Stack>
  );
}

export default Streak;

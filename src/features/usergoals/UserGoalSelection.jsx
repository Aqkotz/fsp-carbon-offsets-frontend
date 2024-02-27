/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Button, ButtonGroup, CardOverflow, CardActions, Stack, IconButton, Box,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import Streak from './streak2';
import { deleteGoal, setGoalStatusForDay } from './userGoalsSlice';

const currentWeek = [
  {
    completed: 'past',
    date: '2022-09-11',
  },
  {
    completed: 'failed',
    date: '2022-09-12',
  },
  {
    completed: 'completed',
    date: '2022-09-13',
  },
  {
    completed: 'completed',
    date: '2022-09-14',
  },
  {
    completed: 'completed',
    date: '2022-09-15',
  },
  {
    completed: 'future',
    date: '2022-09-16',
  },
  {
    completed: 'future',
    date: '2022-09-17',
  },
];

function UserGoalSelection(props) {
  const dispatch = useDispatch();
  const { theme } = props.goal;
  const [changeCompleted, setChangeCompleted] = useState(false);

  const getColorByTheme = () => {
    switch (theme) {
      case 'food':
        return 'rgba(227, 108, 108, 0.7)';
      case 'travel':
        return 'rgba(189, 108, 227, 0.7)';
      case 'house':
        return 'rgba(100, 209, 216, 0.7)';
      default:
        return '#FFFFFF';
    }
  };
  const color = getColorByTheme(theme);
  const completionSection = () => {
    if (props.goal.completedToday && !changeCompleted) {
      return (
        <div>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Good job!
          </Typography>
          <Button onClick={() => { setChangeCompleted(true); }}>
            Change Completed
          </Button>
        </div>
      );
    } else if (props.goal.failed && !changeCompleted) {
      return (
        <div>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Try again tomorrow!
          </Typography>
          <Button variant="outlined" sx={{ bgcolor: 'background.surface' }} onClick={() => { setChangeCompleted(true); }}>
            Change Completed
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Box m={1}>
          <CardActions buttonFlex="1">
            <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
              <Button onClick={() => { dispatch(); }}>
                Yes!
              </Button>
              <Button onClick={() => { dispatch(); }}>
                No!
              </Button>
            </ButtonGroup>
          </CardActions>
        </Box>
      </div>

    );
  };

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center" // Align items to center vertically
        spacing={2}
      >
        {/* Center the theme card and stretch across 80% */}
        <Stack sx={{ width: '80%' }} justifyContent="center" alignItems="center">
          <Card variant="soft" sx={{ bgcolor: color, width: '90%', mx: 'auto' }}> {/* Making the card thinner and centering the text */}
            <Typography level="h5" component="h1" sx={{ fontWeight: 'md', textAlign: 'center' }}> {/* Centering the text */}
              {theme.toUpperCase()}
            </Typography>
          </Card>
        </Stack>
        <IconButton aria-label="delete" size="small" onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Typography level="h5" component="h2" sx={{ fontWeight: 'md', textAlign: 'center' }}>
        {props.goal.description}
      </Typography>
      <Typography level="h1" component="h2" sx={{ fontWeight: 'md', textAlign: 'center' }}>
        <span style={{ fontSize: '4rem' }}>{props.goal.streakLength}</span>
        <span style={{ fontSize: '1.5rem' }}>  DAYS</span>
      </Typography>
      <Streak goal={{ currentWeek }} />
      <CardOverflow sx={{ bgcolor: 'background.level1' }}>
        <Box marginTop={2} marginBottom={0.5}>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Did you complete your goal today?
          </Typography>
        </Box>
        {completionSection()}
      </CardOverflow>
    </Card>
  );
}

export default UserGoalSelection;

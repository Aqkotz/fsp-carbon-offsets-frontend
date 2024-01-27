import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Button, ButtonGroup, Stack, IconButton,
} from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';
import Streak from './Streak';
import { completeGoal, deleteGoal, failGoal } from './userGoalsSlice';

function UserGoalSelection(props) {
  const dispatch = useDispatch();
  const [changeCompleted, setChangeCompleted] = useState(false);
  console.log(props.goal.streak);
  const completionSection = () => {
    if (props.goal.completedToday && !changeCompleted) {
      return (
        <div>
          <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
            Completed!
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
            Failed!
          </Typography>
          <Button onClick={() => { setChangeCompleted(true); }}>
            Change Completed
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Typography level="h3" component="h1" sx={{ fontWeight: 'md' }}>
          Did you complete your goal today?
        </Typography>
        <ButtonGroup variant="outlined" sx={{ bgcolor: 'background.surface' }}>
          <Button onClick={() => { dispatch(completeGoal(props.goal.id)); }}>
            Yes!
          </Button>
          <Button onClick={() => { dispatch(failGoal(props.goal.id)); }}>
            No!
          </Button>
        </ButtonGroup>
      </div>
    );
  };

  return (
    <Card>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}
      >
        <Typography level="h2" component="h2" sx={{ fontWeight: 'md' }}>
          Goal {props.index + 1}
        </Typography>
        <IconButton aria-label="delete" size="small" onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
          <CloseIcon fontSize="inherit" />
        </IconButton>
      </Stack>
      <Typography level="h5" component="h5" sx={{ fontWeight: 'md' }}>
        {props.goal.description}
      </Typography>
      {completionSection()}
      <Streak goal={props.goal} />
    </Card>
  );
}

export default UserGoalSelection;

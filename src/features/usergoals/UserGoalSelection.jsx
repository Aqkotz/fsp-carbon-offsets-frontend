import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Button, ButtonGroup,
} from '@mui/joy';
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
      <Typography level="h2" component="h2" sx={{ fontWeight: 'md' }}>
        Goal {props.index + 1}
      </Typography>
      <Typography level="h5" component="h5" sx={{ fontWeight: 'md' }}>
        {props.goal.description}
      </Typography>
      {completionSection()}
      <Streak goal={props.goal} />
      <Button onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
        Delete Goal
      </Button>
    </Card>
  );
}

export default UserGoalSelection;

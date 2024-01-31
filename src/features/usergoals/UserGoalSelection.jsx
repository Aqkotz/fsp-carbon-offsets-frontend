import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card, Typography, Button, ButtonGroup, CardOverflow, CardActions, Stack, IconButton, Box,
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
              <Button onClick={() => { dispatch(completeGoal(props.goal.id)); }}>
                Yes!
              </Button>
              <Button onClick={() => { dispatch(failGoal(props.goal.id)); }}>
                No!
              </Button>
            </ButtonGroup>
          </CardActions>
        </Box>
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
      <Streak goal={props.goal} />
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

// return (
//   <Card>
//     <Typography level="h2" component="h2" sx={{ fontWeight: 'md' }}>
//       Goal {props.index + 1}
//     </Typography>
//     <Typography level="h5" component="h5" sx={{ fontWeight: 'md' }}>
//       {props.goal.description}
//     </Typography>
//     {completionSection()}
//     <Streak goal={props.goal} />
//     <Button onClick={() => { dispatch(deleteGoal(props.goal.id)); }}>
//       Delete Goal
//     </Button>
//   </Card>
// );
// }

export default UserGoalSelection;

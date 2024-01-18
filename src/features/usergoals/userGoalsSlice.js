/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { completeGoalRequest, setGoalRequest, deleteGoalRequest } from './userGoalsRequests';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: [
      {
        description: 'test',
        completed: false,
        streak: 3,
      },
      {
        description: 'test1',
        completed: false,
        streak: 3,
      },
      {
        description: 'test2',
        completed: false,
        streak: 3,
      },
    ],
  },
  reducers: {
    setGoalReducer: (state, goals) => {
      state.goals = goals;
    },
    setGoalCompleted: (state, goal) => {
      state.goals.map((g) => {
        if (g.description === goal.description) {
          g.completed = true;
        }
        return g;
      });
    },
  },
});

export const { setGoalReducer, setGoalCompleted } = userGoalsSlice.actions;

export const setGoal = (goal) => async (dispatch) => {
  dispatch(setGoal(goal));
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export const completeGoal = (goal) => async (dispatch) => {
  dispatch(setGoalCompleted(goal));
  await dispatch(completeGoalRequest(goal, userGoalsSlice.actions));
};

export const deleteGoal = (goal) => async (dispatch) => {
  await dispatch(deleteGoalRequest(goal, userGoalsSlice.actions));
};

export default userGoalsSlice.reducer;

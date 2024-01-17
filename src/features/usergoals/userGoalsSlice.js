/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setGoalRequest } from './userGoalsRequests';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goal: {
      description: '',
      completed: false,
    },
    streak: 3,
  },
  reducers: {
    setGoalReducer: (state, goal) => {
      state.goal = goal;
    },

    setCompleted: (state) => {
      state.goal.completed = true;
    },

  },
});

export const { setGoalReducer } = userGoalsSlice.actions;

export const setGoal = (goal) => async (dispatch) => {
  dispatch(setGoal(goal));
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export default userGoalsSlice.reducer;

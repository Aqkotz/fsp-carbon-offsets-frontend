/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { setGoalRequest } from './userGoalsRequests';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goal: '',
    // goals: [
    //   {
    //     name: 'Yes!',
    //   },
    //   {
    //     name: 'No :(',
    //   },
    //   // {
    //   //   name: 'heavy shower',
    //   //   description: 'reduce by 1min',
    //   // },
    //   // {
    //   //   name: 'No shower',
    //   //   description: 'reduce by full time',
    //   // },
    // ],
  },
  reducers: {
    setGoalReducer: (state, goal) => {
      state.goal = goal;
    },
    // selectGoal: (state, goal) => {
    //   console.log('selecting goal');
    // },
  },
});

export const { setGoalReducer } = userGoalsSlice.actions;

export const setGoal = (goal) => async (dispatch) => {
  dispatch(setGoal(goal));
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export default userGoalsSlice.reducer;

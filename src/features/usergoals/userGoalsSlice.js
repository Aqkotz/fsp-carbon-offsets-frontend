/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: [
      {
        name: 'Yes!',
      },
      {
        name: 'No :(',
      },
      // {
      //   name: 'heavy shower',
      //   description: 'reduce by 1min',
      // },
      // {
      //   name: 'No shower',
      //   description: 'reduce by full time',
      // },
    ],
  },
  reducers: {
    selectGoal: (state, goal) => {
      console.log('selecting goal');
    },
  },
});

export const { selectGoal } = userGoalsSlice.actions;

export default userGoalsSlice.reducer;

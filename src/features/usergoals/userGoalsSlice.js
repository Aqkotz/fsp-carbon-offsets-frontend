/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: [],
    selectedGoal: null,
    
  },
  reducers: {
    
  },
});

export const { increment, decrement, incrementByAmount } = userGoalsSlice.actions;

export default userGoalsSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = surveySlice.actions;

export default surveySlice.reducer;

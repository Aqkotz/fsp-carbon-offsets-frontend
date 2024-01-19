/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  completeGoalRequest, setGoalRequest, deleteGoalRequest, fetchGoals,
} from './userGoalsRequests';

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: [
    ],
  },
  reducers: {
    setGoalReducer: (state, action) => {
      state.goals = action.payload;
    },
    setGoalCompleted: (state, action) => {
      state.goals.map((g) => {
        if (g.description === action.payload.description) {
          g.completed = true;
        }
        return g;
      });
    },
  },
});

export const { setGoalReducer, setGoalCompleted } = userGoalsSlice.actions;

export const getGoals = () => async (dispatch) => {
  await dispatch(fetchGoals(userGoalsSlice.actions));
};

export const setGoal = (goal) => async (dispatch) => {
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export const completeGoal = (id) => async (dispatch) => {
  await dispatch(completeGoalRequest(id, userGoalsSlice.actions));
};

export const deleteGoal = (id) => async (dispatch) => {
  await dispatch(deleteGoalRequest(id, userGoalsSlice.actions));
};

export default userGoalsSlice.reducer;

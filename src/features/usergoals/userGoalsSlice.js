/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  completeGoalRequest, setGoalRequest, deleteGoalRequest, fetchGoals, failGoalRequest,
} from './userGoalsRequests';

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
    setGoalFailed: (state, action) => {
      state.goals.map((g) => {
        if (g.description === action.payload.description) {
          g.failed = true;
        }
        return g;
      });
    },
  },
});

export const { setGoalReducer, setGoalCompleted, setGoalFailed } = userGoalsSlice.actions;

export const getGoals = () => async (dispatch) => {
  await dispatch(fetchGoals(userGoalsSlice.actions));
};

export const setGoal = (goal) => async (dispatch) => {
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export const completeGoal = (goal) => async (dispatch) => {
  dispatch(setGoalCompleted(goal));
  await dispatch(completeGoalRequest(goal, userGoalsSlice.actions));
};

export const failGoal = (goal) => async (dispatch) => {
  dispatch(setGoalFailed(goal));
  await dispatch(failGoalRequest(goal, userGoalsSlice.actions));
};

export const deleteGoal = (goal) => async (dispatch) => {
  await dispatch(deleteGoalRequest(goal, userGoalsSlice.actions));
};

export default userGoalsSlice.reducer;

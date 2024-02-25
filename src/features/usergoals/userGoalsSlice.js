/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../../app/utils';
import {
  completeGoalRequest, setGoalRequest, deleteGoalRequest, fetchGoals, failGoalRequest,
} from './userGoalsRequests';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: 'loading',
    themes: 'loading',
    goalOptions: 'loading',
  },
  reducers: {
    setGoalReducer: (state, action) => {
      state.goals = action.payload;
    },
    setGoalCompleted: (state, action) => {
      state.goals = state.goals.map((g) => {
        if (g.description === action.payload.description) {
          g.completed = true;
        }
        return g;
      });
    },
    setGoalFailed: (state, action) => {
      state.goals = state.goals.map((g) => {
        if (g.description === action.payload.description) {
          g.failed = true;
        }
        return g;
      });
    },
    setThemes: (state, action) => {
      state.themes = action.payload;
    },
    setGoalOptions: (state, action) => {
      state.goalOptions = action.payload;
    },
  },
});

export const { setGoalReducer, setGoalCompleted, setGoalFailed } = userGoalsSlice.actions;

export const getGoals = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  await dispatch(fetchGoals(userGoalsSlice.actions));
};

export const setGoal = (goal) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export const completeGoal = (id) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  await dispatch(completeGoalRequest(id, userGoalsSlice.actions));
};

export const failGoal = (id) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  dispatch(setGoalFailed(id));
  await dispatch(failGoalRequest(id, userGoalsSlice.actions));
};

export const deleteGoal = (id) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  await dispatch(deleteGoalRequest(id, userGoalsSlice.actions));
};

export const getThemes = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setThemes('loading'));
  const response = await axios.delete(`${ROOT_URL}/themes`, getAuthHeader());
  dispatch(userGoalsSlice.actions.setThemes(response.data));
};

export const getGoalsByTheme = (theme) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalOptions('loading'));
  const response = await axios.delete(`${ROOT_URL}/goals/${theme}`, getAuthHeader());
  dispatch(userGoalsSlice.actions.setGoalOptions(response.data));
};

export default userGoalsSlice.reducer;

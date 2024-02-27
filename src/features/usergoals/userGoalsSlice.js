/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setGoalRequest, deleteGoalRequest, fetchGoals } from './userGoalsRequests';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

export const userGoalsSlice = createSlice({
  name: 'userGoals',
  initialState: {
    goals: 'loading',
    themes: 'loading',
    goalOptions: 'loading',
  },
  reducers: {
    setGoalsReducer: (state, action) => {
      state.goals = action.payload;
    },
    setThemes: (state, action) => {
      state.themes = action.payload;
    },
    setGoalOptions: (state, action) => {
      state.goalOptions = action.payload;
    },
  },
});

export const { setGoalsReducer, setGoalCompleted, setGoalFailed } = userGoalsSlice.actions;

export const getGoals = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  await dispatch(fetchGoals(userGoalsSlice.actions));
};

export const setGoal = (goal) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  await dispatch(setGoalRequest(goal, userGoalsSlice.actions));
};

export const setGoalStatusForDay = (id, status) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  await axios.post(`${ROOT_URL}/goals/status/${id}`, { status }, getAuthHeader());
};

export const deleteGoal = (id) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalReducer('loading'));
  await dispatch(deleteGoalRequest(id, userGoalsSlice.actions));
};

export const getThemes = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setThemes('loading'));
  const response = await axios.get(`${ROOT_URL}/themes`);
  dispatch(userGoalsSlice.actions.setThemes(response.data));
};

export const getGoalsByTheme = (theme) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalOptions('loading'));
  const response = await axios.get(`${ROOT_URL}/goals/${theme}`);
  dispatch(userGoalsSlice.actions.setGoalOptions(response.data));
};

export default userGoalsSlice.reducer;

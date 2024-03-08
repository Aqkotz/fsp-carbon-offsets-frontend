/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getAuthHeader } from '../../app/utils';
import { fetchCarbonFootprint } from '../carbontracking/carbonSlice';

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

export const fetchGoals = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  const response = await axios.get(`${ROOT_URL}/goals`, getAuthHeader());
  dispatch(userGoalsSlice.actions.setGoalsReducer(response.data));
};

export const setGoal = (goal) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  await axios.post(`${ROOT_URL}/goals`, goal, getAuthHeader());
  dispatch(fetchGoals());
};

export const setGoalStatusForDay = (id, status) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/goals/status/${id}`, { status }, getAuthHeader());
  if (response.data !== 'goal already set for today') {
    dispatch(fetchGoals());
    dispatch(fetchCarbonFootprint());
  }
};

export const deleteGoal = (id) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalsReducer('loading'));
  await axios.delete(`${ROOT_URL}/goals/${id}`, getAuthHeader());
  dispatch(fetchGoals());
  dispatch(fetchCarbonFootprint());
};

export const getThemes = () => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setThemes('loading'));
  const response = await axios.get(`${ROOT_URL}/goals/themes`);
  dispatch(userGoalsSlice.actions.setThemes(response.data));
};

export const getGoalsByTheme = (theme) => async (dispatch) => {
  dispatch(userGoalsSlice.actions.setGoalOptions('loading'));
  const response = await axios.get(`${ROOT_URL}/goals/${theme}`);
  dispatch(userGoalsSlice.actions.setGoalOptions(response.data));
};

export default userGoalsSlice.reducer;

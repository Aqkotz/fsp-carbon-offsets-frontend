import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    team: 'loading',
    isAdmin: false,
    joinCode: 'loading',
    setTeamGoal: 'loading',
  },
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setJoinCode: (state, action) => {
      state.joinCode = action.payload;
    },
    setTeamGoal: (state, action) => {
      state.teamGoal = action.payload;
    },
    addTeamGoal: (state, action) => {
      state.teamGoal = action.payload;
    },
  },
});

export const {
  setIsAdmin, setTeam, setJoinCode, setTeamGoal, addTeamGoal,
} = adminSlice.actions;

export const fetchTeam = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
  dispatch(setTeam(response.data));
};

export const fetchJoinCode = () => async (dispatch) => {
  dispatch(setJoinCode('loading'));
  const response = await axios.get(`${ROOT_URL}/teams/joincode`, getAuthHeader());
  dispatch(setJoinCode(response.data));
};

export const deleteTeam = (navigate) => async (dispatch) => {
  await axios.delete(`${ROOT_URL}/teams`, getAuthHeader());
  dispatch(setTeam('loading'));
  dispatch(setJoinCode('loading'));
  dispatch(adminSlice.actions.setIsAdmin(false));
  dispatch(fetchTeam());
  navigate('/');
};

export const configureAdmin = (admin) => async (dispatch) => {
  dispatch(setIsAdmin(admin));
  if (admin) {
    dispatch(fetchTeam());
    dispatch(fetchJoinCode());
  }
};

export const fetchTeamGoals = () => async (dispatch) => {
  dispatch(setTeamGoal('loading'));
  const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
  dispatch(setTeamGoal(response.data));
};

export const addTeamGoals = (goal) => async (dispatch) => {
  dispatch(addTeamGoal('loading'));
  await axios.post(`${ROOT_URL}/teams`, goal, getAuthHeader());
  dispatch(addTeamGoal());
};

export default adminSlice.reducer;

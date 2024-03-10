import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';
import { fetchTeam } from '../team/teamSlice';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

export const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isAdmin: false,
    isOwner: false,
    joinCode: 'loading',
  },
  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsOwner: (state, action) => {
      state.isOwner = action.payload;
    },
    setJoinCode: (state, action) => {
      state.joinCode = action.payload;
    },
    setTeamGoal: (state, action) => {
      state.teamGoal = action.payload;
    },
  },
});

export const {
  setIsAdmin, setTeam, setJoinCode, setTeamGoal, setIsOwner,
} = adminSlice.actions;

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
  dispatch(adminSlice.actions.setIsOwner(false));
  dispatch(fetchTeam());
  navigate('/');
};

export const configureAdmin = (admin, owner) => async (dispatch) => {
  dispatch(setIsAdmin(admin));
  dispatch(setIsOwner(owner));
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

export const addTeamGoal = (goal) => async (dispatch) => {
  await axios.post(`${ROOT_URL}/teams/goal`, { goal }, getAuthHeader());
  dispatch(fetchTeam());
};

export const transferOwnership = (newOwner) => async (dispatch) => {
  await axios.post(`${ROOT_URL}/teams/transfer`, { newOwner }, getAuthHeader());
  dispatch(fetchTeam());
  dispatch(adminSlice.actions.setIsOwner(false));
};

export const addAdmin = (newAdmin) => async (dispatch) => {
  await axios.post(`${ROOT_URL}/teams/admin`, { newAdmin }, getAuthHeader());
  dispatch(fetchTeam());
};

export const removeAdmin = (oldAdmin) => async (dispatch) => {
  await axios.delete(`${ROOT_URL}/teams/admin/${oldAdmin}`, getAuthHeader());
  dispatch(fetchTeam());
};

export default adminSlice.reducer;

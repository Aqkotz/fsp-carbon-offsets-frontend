import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    groupCode: 'loading',
    team: 'loading',
  },
  reducers: {
    setCode: (state, action) => {
      state.suggestions = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;

export function fetchTeam() {
  return async (dispatch) => {
    console.log('fetching team');
    const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
    dispatch(teamSlice.actions.setTeam(response.data));
    console.log(response.data);
  };
}

export function joinTeam(joinCode) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/teams/join`, { joinCode }, getAuthHeader());
    dispatch(teamSlice.actions.setTeam(response.data));
  };
}

export function leaveTeam() {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/teams/leave`, {}, getAuthHeader());
    dispatch(teamSlice.actions.setTeam(null));
  };
}

export function createTeam(team) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/teams`, team, getAuthHeader());
    dispatch(fetchTeam());
  };
}

export default teamSlice.reducer;

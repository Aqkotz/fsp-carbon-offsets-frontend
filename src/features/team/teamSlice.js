import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    groupCode: 'loading',
    team: 'loading',
    leaderboard: 'loading',
  },
  reducers: {
    setCode: (state, action) => {
      state.suggestions = action.payload;
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setLeaderboard: (state, action) => {
      state.leaderboard = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;

export function fetchTeam() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
    dispatch(teamSlice.actions.setTeam(response.data));
  };
}

export function joinTeam(joinCode) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/teams/join`, { joinCode }, getAuthHeader());
    dispatch(teamSlice.actions.setTeam(response.data));
  };
}

export function fetchLeaderBoard() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
    dispatch(teamSlice.actions.setLeaderboard(response.data));
  };
}

export default teamSlice.reducer;

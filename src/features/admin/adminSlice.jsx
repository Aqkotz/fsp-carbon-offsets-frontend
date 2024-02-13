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
  },
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setIsAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setJoinCode: (state, action) => {
      state.joinCode = action.payload;
    },
  },
});

export const { setIsAdmin, setTeam, setJoinCode } = adminSlice.actions;

export const fetchTeam = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/teams`, getAuthHeader());
  dispatch(setTeam(response.data));
};

export const fetchJoinCode = () => async (dispatch) => {
  const response = await axios.get(`${ROOT_URL}/teams/joincode`, getAuthHeader());
  dispatch(setJoinCode(response.data));
};

export const configureAdmin = (admin) => async (dispatch) => {
  dispatch(setIsAdmin(admin));
  if (admin) {
    dispatch(fetchTeam());
    dispatch(fetchJoinCode());
  }
};

export default adminSlice.reducer;
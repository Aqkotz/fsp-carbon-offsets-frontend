/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader, storeToken } from '../../app/utils';
import { configureAdmin } from '../admin/adminSlice';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;
const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;

const initialState = {
  token: null,
  user: 'loading',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.setUser('loading'));
  const response = await axios.get(`${ROOT_URL}/user`, getAuthHeader());
  dispatch(userSlice.actions.setUser(response.data));
  dispatch(configureAdmin(response.data.adminOf));
};

export const duoSignin = (ticket, navigate) => async (dispatch) => {
  const response = await axios.post(`${ROOT_URL}/validate`, { ticket, service: CLIENT_URL });
  storeToken(response.data.token);
  dispatch(userSlice.actions.setToken(response.data.token));
  dispatch(userSlice.actions.setUser({ name: response.data.name, netid: response.data.netid }));
  navigate('/');
};

export const {
  setToken, setUser, logout,
} = userSlice.actions;

export default userSlice.reducer;

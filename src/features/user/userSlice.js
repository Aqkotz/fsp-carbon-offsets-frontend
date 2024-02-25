/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import {
  signinRequest, signupRequest, duoSigninRequest,
} from './userRequests';
import { getAuthHeader } from '../../app/utils';
import { configureAdmin } from '../admin/adminSlice';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

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

export const signin = ({ email, password }, navigate) => async (dispatch) => {
  dispatch(signinRequest({ email, password }, navigate, userSlice.actions));
};

export const signup = (data, navigate) => async (dispatch) => {
  dispatch(signupRequest(data, navigate, userSlice.actions));
};

export const getUser = () => async (dispatch) => {
  dispatch(userSlice.actions.setUser('loading'));
  console.log(getAuthHeader());
  const response = await axios.get(`${ROOT_URL}/user`, getAuthHeader());
  dispatch(userSlice.actions.setUser(response.data));
  dispatch(configureAdmin(response.data.adminOf));
};

export const duoSignin = (ticket, navigate) => async (dispatch) => {
  dispatch(duoSigninRequest(ticket, navigate, userSlice.actions));
};

export const {
  setToken, setUser, logout,
} = userSlice.actions;

export default userSlice.reducer;

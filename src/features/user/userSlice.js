/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  signinRequest, signupRequest, fetchUser, duoSigninRequest,
} from './userRequests';

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
  dispatch(fetchUser(userSlice.actions));
};

export const duoSignin = (ticket, navigate) => async (dispatch) => {
  dispatch(duoSigninRequest(ticket, navigate, userSlice.actions));
};

export const {
  setToken, setUser, logout,
} = userSlice.actions;

export default userSlice.reducer;

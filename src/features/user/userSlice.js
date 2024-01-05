/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { signinRequest, signupRequest, fetchUser } from './userRequests';

const initialState = {
  token: null,
  user: {
    username: null,
    role: null,
    rerolls: null,
    userId: null,
    firstName: '',
    lastName: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      console.log('user', action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.rerolls = null;
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

export const {
  setToken, setUser, logout,
} = userSlice.actions;

export default userSlice.reducer;

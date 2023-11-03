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
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token_mtg_challenges', action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.rerolls = null;
    },
  },
});

export const signin = ({ email, password }) => async (dispatch) => {
  dispatch(signinRequest({ email, password }, userSlice.actions));
};

export const signup = ({ email, password, username }) => async (dispatch) => {
  dispatch(signupRequest({ email, password, username }, userSlice.actions));
};

export const getUser = () => async (dispatch) => {
  dispatch(fetchUser(userSlice.actions));
};

export const {
  setToken, setUser, logout,
} = userSlice.actions;

export default userSlice.reducer;

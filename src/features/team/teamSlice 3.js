import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    groupCode: 'loading',
  },
  reducers: {
    setCode: (state, action) => {
      state.suggestions = action.payload;
    },
  },
});

export const { setCode } = teamSlice.actions;

// the fetch is using the reducer...this is setting the state (like name to something instead of loading)
export function fetchTeam() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/team`, getAuthHeader());
    dispatch(teamSlice.actions.setCode(response.data));
  };
}

// when you add, you're just adding the newly set suggestion
export function addTeam(groupCode) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/team`, groupCode, getAuthHeader());
    dispatch(fetchTeam());
  };
}

export default teamSlice.reducer;

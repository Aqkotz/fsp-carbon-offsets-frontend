import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const helpfulResourcesSlice = createSlice({
  name: 'helpfulResources',
  initialState: {
    suggestion: [
      {
        name: 'loading',
        description: 'loading',
        theme: 'loading',
        link: 'loading',
      }],
  },
  reducers: {
    setSuggestions: (state, action) => {
      state.suggestion = action.payload;
    },
  },
});

export const { setSuggestions } = helpfulResourcesSlice.actions;

// the fetch is using the reducer...this is setting the state (like name to something instead of loading)
export function fetchSuggestions() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/suggestions`, getAuthHeader());
    dispatch(helpfulResourcesSlice.setSuggestions(response.data));
  };
}

// when you add, you're just adding the newly set suggestion
export function addSuggestion(suggestion) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/suggestions`, suggestion, getAuthHeader());
    dispatch(fetchSuggestions());
  };
}

export function deleteSuggestion(suggestion) {
  return async (dispatch) => {
    await axios.delete(`${ROOT_URL}/suggestions/${suggestion.id}`, getAuthHeader());
    dispatch(fetchSuggestions());
  };
}

export default helpfulResourcesSlice.reducer;

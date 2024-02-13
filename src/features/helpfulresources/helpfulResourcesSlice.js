import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const helpfulResourcesSlice = createSlice({
  name: 'helpfulResources',
  initialState: {
    suggestions: 'loading',
    filterTheme: 'all',
  },
  reducers: {
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setFilterTheme: (state, action) => {
      state.filterTheme = action.payload;
    },
  },

});

export const { setSuggestions, setFilterTheme } = helpfulResourcesSlice.actions;

// the fetch is using the reducer...this is setting the state (like name to something instead of loading)
export function fetchSuggestions() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/posts`, getAuthHeader());
    dispatch(helpfulResourcesSlice.actions.setSuggestions(response.data));
  };
}

// when you add, you're just adding the newly set suggestion
export function addSuggestion(suggestion) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/posts`, suggestion, getAuthHeader());
    dispatch(fetchSuggestions());
  };
}

export function deleteSuggestion(suggestion) {
  return async (dispatch) => {
    await axios.delete(`${ROOT_URL}/posts/${suggestion.id}`, getAuthHeader());
    dispatch(fetchSuggestions());
  };
}

export function fetchSuggestionsByTheme(filterTheme) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/posts/${filterTheme}`, getAuthHeader());
    dispatch(helpfulResourcesSlice.actions.setSuggestions(response.data));
  };
}

export function updateFilterTheme(filterTheme, dispatch) {
  dispatch(helpfulResourcesSlice.actions.setFilterTheme(filterTheme));
  if (filterTheme === 'all') {
    dispatch(fetchSuggestions());
  } else {
    dispatch(fetchSuggestionsByTheme(filterTheme));
  }
}

export default helpfulResourcesSlice.reducer;

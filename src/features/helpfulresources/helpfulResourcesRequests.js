import axios from 'axios';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

export function setRequest(suggestion, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/suggestions`, suggestion, getAuthHeader());
    console.log(response.data);
    dispatch(actions.setSuggestionReducer(response.data));
  };
}

export function fetchSuggestions(actions) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/suggestions`, getAuthHeader());
    dispatch(actions.setSuggestionReducer(response.data));
  };
}

export function deleteSuggestionRequest(id, actions) {
  return async (dispatch) => {
    const response = await axios.delete(`${ROOT_URL}/suggestions/${id}`, getAuthHeader());
    dispatch(actions.setSuggestionReducer(response.data));
  };
}

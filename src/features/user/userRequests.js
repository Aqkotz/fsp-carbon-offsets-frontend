import axios from 'axios';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = 'https://fsp-carbon-offsets-backend-lakm.onrender.com/api';

export function signinRequest({ email, password }, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
    dispatch(actions.setToken(response.data.token));
    dispatch(actions.setUser(response.data));
  };
}

export function signupRequest({ email, password, username }, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signup`, { email, password, username });
    dispatch(actions.setToken(response.data.token));
    dispatch(actions.setUser(response.data));
  };
}

export function fetchUser(actions) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/users`, getAuthHeader());
    dispatch(actions.setUser(response.data));
  };
}

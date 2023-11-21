import axios from 'axios';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = 'https://fsp-carbon-offsets-backend-lakm.onrender.com/api';

export function signinRequest({ email, password }, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
    dispatch(actions.setToken(response.data.token));
  };
}

export function signupRequest(data, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signup`, data);
    dispatch(actions.setToken(response.data.token));
  };
}

export function fetchUser(actions) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/user`, getAuthHeader());
    dispatch(actions.setUser(response.data));
  };
}

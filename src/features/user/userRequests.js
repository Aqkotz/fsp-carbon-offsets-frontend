import axios from 'axios';
import { getAuthHeader, setToken } from '../../app/utils';

const ROOT_URL = 'https://fsp-carbon-offsets-backend-lakm.onrender.com/api';

export function signinRequest({ email, password }, navigate, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signin`, { email, password });
    dispatch(actions.setToken(response.data.token));
    setToken(response.data.token);
    navigate('/');
  };
}

export function signupRequest(data, navigate, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/signup`, data);
    setToken(response.data.token);
    dispatch(actions.setToken(response.data.token));
    navigate('/');
  };
}

export function fetchUser(actions) {
  return async (dispatch) => {
    console.log(getAuthHeader());
    const response = await axios.get(`${ROOT_URL}/user`, getAuthHeader());
    dispatch(actions.setUser(response.data));
  };
}

export function duoSigninRequest(ticket, navigate, actions) {
  return async (dispatch) => {
    const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
    const response = await axios.post(`${ROOT_URL}/validate`, { ticket, service: CLIENT_URL });
    console.log(response);
    setToken(response.data.token);
    dispatch(actions.setToken(response.data.token));
    dispatch(actions.setUser({ name: response.data.name, netid: response.data.netid }));
    navigate('/');
  };
}

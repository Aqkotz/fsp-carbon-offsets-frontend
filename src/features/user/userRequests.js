import axios from 'axios';

const ROOT_URL = 'https://mtg-challenges-backedn.onrender.com/api';

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
    const response = await axios.get(`${ROOT_URL}/users`, {
      headers: { authorization: `${localStorage.getItem('token_mtg_challenges')}` },
    });
    dispatch(actions.setUser(response.data));
  };
}

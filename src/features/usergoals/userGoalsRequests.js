import axios from 'axios';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = 'https://fsp-carbon-offsets-backend-lakm.onrender.com/api';

// eslint-disable-next-line import/prefer-default-export
export function setGoalRequest(goal, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/goals`, goal, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function fetchGoals(actions) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/goals`, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function completeGoalRequest(id, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/goals/complete`, id, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function deleteGoalRequest(id, actions) {
  return async (dispatch) => {
    const response = await axios.delete(`${ROOT_URL}/goals`, id, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

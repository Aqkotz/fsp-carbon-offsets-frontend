import axios from 'axios';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = 'https://fsp-carbon-offsets-backend-lakm.onrender.com/api';

// eslint-disable-next-line import/prefer-default-export
export function setGoalRequest(goal, actions) {
  return async (dispatch) => {
    console.log(goal);
    const response = await axios.post(`${ROOT_URL}/goals`, goal, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function fetchGoals(actions) {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/goals`, getAuthHeader());
    console.log(response.data);
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function completeGoalRequest(goal, actions) {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/goals/complete`, goal, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

export function deleteGoalRequest(goal, actions) {
  return async (dispatch) => {
    const response = await axios.delete(`${ROOT_URL}/goals`, goal, getAuthHeader());
    dispatch(actions.setGoalReducer(response.data));
  };
}

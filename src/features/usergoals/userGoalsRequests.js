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

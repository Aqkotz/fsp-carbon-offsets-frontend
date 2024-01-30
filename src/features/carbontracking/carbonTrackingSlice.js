import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const carbonSlice = createSlice({
  name: 'carbon',
  initialState: {
    stops: 'loading',
  },
  reducers: {
    addStop: (state, action) => {
      if (!state.stops) {
        state.stops = [];
      }
      if (state.stops.length < 2) {
        state.stops.push(action.payload);
      } else {
        state.stops.splice(state.stops.length - 1, 0, action.payload);
      }
    },
    removeStop: (state, action) => {
      state.stops.splice(action.payload, 1);
    },
    setStop: (state, action) => {
      state.stops[action.payload.index] = action.payload.stop;
    },
    setStops: (state, action) => {
      state.stops = action.payload;
    },
  },
});

export const { addStop, removeStop, setStop } = carbonSlice.actions;

export const createStop = (stop) => {
  return async (dispatch) => {
    const response = await axios.post(`${ROOT_URL}/stops`, stop);
    dispatch(carbonSlice.actions.addStop(response.data));
  };
};

export function submitStops(stops) {
  return async (dispatch) => {
    console.log(`${ROOT_URL}/stops`);
    const response = await axios.post(`${ROOT_URL}/stops`, { stops }, getAuthHeader());
    dispatch(carbonSlice.actions.setStops(response.data));
  };
}

export function fetchStops() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/stops`, getAuthHeader());
    console.log(response.data);
    dispatch(carbonSlice.actions.setStops(response.data));
  };
}

export default carbonSlice.reducer;

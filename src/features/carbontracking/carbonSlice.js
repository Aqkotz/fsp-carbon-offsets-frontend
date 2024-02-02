import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const carbonSlice = createSlice({
  name: 'carbon',
  initialState: {
    stops: 'loading',
    kg: 'loading',
    trips: 'loading',
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
    setCarbonFootprint: (state, action) => {
      state.kg = action.payload;
    },
    setTrips: (state, action) => {
      state.trips = action.payload;
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

export function fetchCarbonFootprint() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/carbonfootprint`, getAuthHeader());
    dispatch(carbonSlice.actions.setCarbonFootprint(response.data));
  };
}

export function submitStops(stops) {
  return async (dispatch) => {
    console.log(`${ROOT_URL}/stops`);
    const response = await axios.post(`${ROOT_URL}/stops`, { stops }, getAuthHeader());
    dispatch(carbonSlice.actions.setStops(response.data));
    dispatch(carbonSlice.actions.setCarbonFootprint('loading'));
    dispatch(fetchCarbonFootprint());
  };
}

export function fetchStops() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/stops`, getAuthHeader());
    dispatch(carbonSlice.actions.setStops(response.data));
  };
}

export function fetchTrips() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/trips`, getAuthHeader());
    const trips = response.data.map((trip) => {
      return {
        ...trip,
        origin: trip.legs[0],
        destination: trip.legs[trip.legs.length - 1],
      };
    });
    dispatch(carbonSlice.actions.setTrips(trips));
  };
}

export function addTrip(trip) {
  return async (dispatch) => {
    console.log(trip);
    await axios.post(`${ROOT_URL}/trips`, trip, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export function removeTrip(trip) {
  return async (dispatch) => {
    await axios.delete(`${ROOT_URL}/trips/${trip.id}`, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export function updateTrip(trip) {
  return async (dispatch) => {
    await axios.put(`${ROOT_URL}/trips/${trip.id}`, trip, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export default carbonSlice.reducer;

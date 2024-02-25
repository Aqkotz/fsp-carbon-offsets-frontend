import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { getAuthHeader } from '../../app/utils';

const ROOT_URL = import.meta.env.VITE_BACKEND_URL;

const carbonSlice = createSlice({
  name: 'carbon',
  initialState: {
    kg: 'loading',
    trips: 'loading',
    estimate: 'undefined',
    weeks: 'loading',
    house: 'loading',
    footprint: 'loading',
  },
  reducers: {
    setCarbonFootprint: (state, action) => {
      state.footprint = action.payload;
    },
    setTrips: (state, action) => {
      state.trips = action.payload;
    },
    setEstimate: (state, action) => {
      state.estimate = action.payload;
    },
    setFood: (state, action) => {
      state.weeks = action.payload;
    },
    setHouse: (state, action) => {
      state.house = action.payload;
    },
  },
});

export const { setCarbonFootprint, setTrips, setEstimate } = carbonSlice.actions;

export function fetchCarbonFootprint() {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setCarbonFootprint('loading'));
    const response = await axios.get(`${ROOT_URL}/carbonfootprint`, getAuthHeader());
    dispatch(carbonSlice.actions.setCarbonFootprint(response.data));
  };
}

export function fetchTrips() {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setTrips('loading'));
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
    dispatch(carbonSlice.actions.setTrips('loading'));
    await axios.post(`${ROOT_URL}/trips`, trip, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export function removeTrip(trip) {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setTrips('loading'));
    await axios.delete(`${ROOT_URL}/trips/${trip.id}`, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export function updateTrip(trip) {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setTrips('loading'));
    await axios.put(`${ROOT_URL}/trips/${trip.id}`, trip, getAuthHeader());
    dispatch(fetchTrips());
  };
}

export function estimateTrip(trip) {
  return async (dispatch) => {
    console.log(trip);
    dispatch(carbonSlice.actions.setEstimate('loading'));
    const response = await axios.post(`${ROOT_URL}/trips/estimate`, trip, getAuthHeader());
    dispatch(carbonSlice.actions.setEstimate(response.data));
  };
}

export function deleteTrip(trip) {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setTrips('loading'));
    await axios.delete(`${ROOT_URL}/trips/${trip._id}`, getAuthHeader());
    dispatch(fetchTrips());
    dispatch(fetchCarbonFootprint());
  };
}
export function fetchEnergy() {
  return async (dispatch) => {
    const response = await axios.get(`${ROOT_URL}/posts`, getAuthHeader());
    dispatch(carbonSlice.actions.setSuggestions(response.data));
  };
}

export function addEnergy(energy) {
  return async (dispatch) => {
    await axios.post(`${ROOT_URL}/posts`, energy, getAuthHeader());
    dispatch(fetchEnergy());
  };
}

export function fetchFood() {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setFood('loading'));
    const response = await axios.get(`${ROOT_URL}/food`, getAuthHeader());
    dispatch(carbonSlice.actions.setFood(response.data));
  };
}

export function addFood(consumption) {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setFood('loading'));
    await axios.post(`${ROOT_URL}/food`, { consumption }, getAuthHeader());
    dispatch(fetchFood());
  };
}

export function fetchHouse() {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setHouse('loading'));
    const response = await axios.get(`${ROOT_URL}/house`, getAuthHeader());
    dispatch(carbonSlice.actions.setHouse(response.data));
  };
}

export function setHouse(house) {
  return async (dispatch) => {
    dispatch(carbonSlice.actions.setHouse('loading'));
    await axios.post(`${ROOT_URL}/house`, { house }, getAuthHeader());
    dispatch(fetchHouse());
  };
}

export default carbonSlice.reducer;

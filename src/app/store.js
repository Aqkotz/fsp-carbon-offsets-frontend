import { configureStore } from '@reduxjs/toolkit';
import userGoalsReducer from '../features/usergoals/userGoalsSlice';
import userReducer from '../features/user/userSlice';
import carbonReducer from '../features/carbontracking/carbonSlice';

const store = configureStore({
  reducer: {
    userGoals: userGoalsReducer,
    user: userReducer,
    carbon: carbonReducer,
  },
});

export default store;

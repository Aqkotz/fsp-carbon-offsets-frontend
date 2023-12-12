import { configureStore } from '@reduxjs/toolkit';
import userGoalsReducer from '../features/usergoals/userGoalsSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    userGoals: userGoalsReducer,
    user: userReducer,
  },
});

export default store;

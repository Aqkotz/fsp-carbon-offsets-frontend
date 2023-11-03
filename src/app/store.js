import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from '../features/survey/surveySlice';
import userGoalsReducer from '../features/usergoals/userGoalsSlice';
import userReducer from '../features/user/userSlice';

const store = configureStore({
  reducer: {
    survey: surveyReducer,
    userGoals: userGoalsReducer,
    user: userReducer,
  },
});

export default store;

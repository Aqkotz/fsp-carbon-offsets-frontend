import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from '../features/survey/surveySlice';
import userGoalsReducer from '../features/usergoals/userGoalsSlice';

const store = configureStore({
  reducer: {
    survey: surveyReducer,
    userGoals: userGoalsReducer,
  },
});

export default store;

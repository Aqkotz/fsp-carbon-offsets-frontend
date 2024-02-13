import { configureStore } from '@reduxjs/toolkit';
import userGoalsReducer from '../features/usergoals/userGoalsSlice';
import userReducer from '../features/user/userSlice';
import carbonReducer from '../features/carbontracking/carbonSlice';
import helpfulResourcesReducer from '../features/helpfulresources/helpfulResourcesSlice';
import teamReducer from '../features/team/teamSlice';

const store = configureStore({
  reducer: {
    userGoals: userGoalsReducer,
    user: userReducer,
    carbon: carbonReducer,
    helpfulResources: helpfulResourcesReducer,
    team: teamReducer,
  },
});

export default store;

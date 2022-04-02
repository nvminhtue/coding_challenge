import { combineReducers } from 'redux';

import authReducer from '../components/Auth/Auth.reducer';
import dashboardReducer from '../components/Dashboard/Dashboard.reducer';

const rootReducer = combineReducers({
  authReducer,
  dashboardReducer,
});

export default rootReducer;

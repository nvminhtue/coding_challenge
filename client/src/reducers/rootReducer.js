import { combineReducers } from 'redux';

import authReducer from '../components/Auth/Auth.reducer';

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;

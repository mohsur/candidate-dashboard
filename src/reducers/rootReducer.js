import { combineReducers } from 'redux';
import filterReducer from './filterReducer';
import jobsReducer from './jobsReducer'

const rootReducer = combineReducers({
  filter: filterReducer,
  jobs: jobsReducer ,
});

export default rootReducer;
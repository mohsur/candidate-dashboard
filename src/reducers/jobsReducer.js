import { UPDATE_JOBS } from '../actions/actions.js'; 

const initialState = []; 

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_JOBS:
      return action.payload; 
    default:
      return state;
  }
};

export default jobsReducer;

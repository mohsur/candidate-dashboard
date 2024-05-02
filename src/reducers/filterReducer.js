import { UPDATE_FILTER } from '../actions/actions.js';

const initialState = {
    jobs: [],
    minExperience: '',
    companyName: '',
    location: '',
    remote: '',
    techStack: '',
    role: '',
    minBasePay: ''
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FILTER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;
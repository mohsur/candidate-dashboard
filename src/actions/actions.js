export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilter = (filter) => ({
  type: UPDATE_FILTER,
  payload: filter,
});

export const UPDATE_JOBS = 'UPDATE_JOBS';


export const updateJobs = (jobs) => ({
  type: UPDATE_JOBS,
  payload: jobs,
});
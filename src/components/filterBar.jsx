import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../actions/actions.js';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    dispatch(updateFilter({ [name]: value }));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap',gap:"10px",padding:"30px" }}>
  <div style={{  width:"150px"}}>
    <TextField
      label="Min Experience"
      name="minExperience"
      value={filter.minExperience}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div style={{ width:"150px" }}>
    <TextField
      label="Company Name"
      name="companyName"
      value={filter.companyName}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div style={{ width:"150px"  }}>
    <TextField
      label="Location"
      name="location"
      value={filter.location}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div >
    <FormControl variant="outlined" style={{ width:"154px"}}>
      <InputLabel>Remote/On-site</InputLabel>
      <Select
        name="remote"
        value={filter.remote}
        onChange={handleFilterChange}
        label="Remote/On-site"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="remote">Remote</MenuItem>
        <MenuItem value="onsite">On-site</MenuItem>
      </Select>
    </FormControl>
  </div>
  <div style={{width:"150px" }}>
    <TextField
      label="Tech Stack"
      name="techStack"
      value={filter.techStack}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div >
    <FormControl variant="outlined" style={{ width:"150px"}}>
      <InputLabel>Role</InputLabel>
      <Select
        name="role"
        value={filter.role}
        onChange={handleFilterChange}
        label="Role"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="developer">Developer</MenuItem>
        <MenuItem value="designer">Designer</MenuItem>
        {/* Add more roles */}
      </Select>
    </FormControl>
  </div>
  <div style={{ width:"150px" }}>
    <TextField
      label="Min Base Pay"
      name="minBasePay"
      value={filter.minBasePay}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <Button variant="contained" color="primary" style={{ width:"150px" }} >Apply Filters</Button>
</div>

  );
};

export default FilterBar;

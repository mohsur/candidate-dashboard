import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../actions/actions.js';
import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const FilterBar = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleFilterChange = (event) => {
    const filterType = event.target.name;
    const filterValue = event.target.value;
    const updatedFilter = { ...filter, [filterType]: filterValue };
    dispatch(updateFilter(updatedFilter));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap',gap:"10px",padding:"30px" }}>
  <div style={{  width:"180px",height:"20px"}}>
    <TextField
      label="Min Experience"
      name="minExperience"
      value={filter.minExperience}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div style={{ width:"180px" ,height:"30px" }}>
    <TextField
      label="Company Name"
      name="companyName"
      value={filter.companyName}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div style={{ width:"180px" ,height:"30px"  }}>
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
        <MenuItem value="remote">Remote</MenuItem>
        <MenuItem value="onsite">On-site</MenuItem>
      </Select>
    </FormControl>
  </div>
  <div style={{width:"180px" ,height:"30px" }}>
    <TextField
      label="Tech Stack"
      name="techStack"
      value={filter.techStack}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div >
  <TextField
      label="Role"
      name="role"
      value={filter.role}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
  <div style={{ width:"180px" ,height:"30px" }}>
    <TextField
      label="Min Base Pay"
      name="minBasePay"
      value={filter.minBasePay}
      onChange={handleFilterChange}
      variant="outlined"
    />
  </div>
</div>

  );
};

export default FilterBar;

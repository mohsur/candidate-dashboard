import React from "react";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      <h3>{job.jobRole}</h3>
      <p>{job.location}</p>
      <p>{job.company}</p>
      <p>{job.jobDetailsFromCompany}</p>
      <p>Experience: {job.minExp} - {job.maxExp} years</p>
      <p>Salary: {job.minJdSalary} - {job.maxJdSalary} {job.salaryCurrencyCode}</p>
      <a href={job.jdLink} target="_blank" rel="noopener noreferrer">Apply</a>
    </div>
  );
};

export default JobCard;
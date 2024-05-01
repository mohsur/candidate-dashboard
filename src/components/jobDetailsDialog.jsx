import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@material-ui/core";

const JobDetailsDialog = ({ open, handleClose, jobDetails }) => {
  const { jobRole, location, minExp, maxExp, jdLink, jobDetailsFromCompany,minJdSalary,maxJdSalary,salaryCurrencyCode } = jobDetails;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Job Description</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          <strong>About Role: </strong> {jobRole}
        </Typography>
        <Typography variant="body1">
          <strong>Location:</strong> {location}
        </Typography>
        <Typography variant="body1">
          <strong>Experience:</strong> {minExp}-{maxExp} years
        </Typography>
        <Typography variant="body1">
          <strong>About Company:</strong> {jobDetailsFromCompany}
        </Typography>
        <Typography variant="body1">
          <strong>What Do we Offer?</strong> 
          <div>Salary of {minJdSalary > 0 ? `${minJdSalary} -`: minJdSalary} {maxJdSalary} {salaryCurrencyCode}</div>
        </Typography>
        <Typography variant="body1">
          To review the Job Description <a href={jdLink} target="_blank">click here</a>.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default JobDetailsDialog;


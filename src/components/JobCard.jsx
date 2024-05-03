import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Button } from "@material-ui/core";
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import JobDetailsDialog from "./jobDetailsDialog"
import './jobCard.css'; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    easyApply: {
      main: 'rgb(85, 239, 196)',
    },
    unlockReferral: {
      main: 'rgb(73, 67, 218)',
    }
  },
});



const JobCard = ({ job }) => {

  const exchangeRate = 75; 
  const minSalaryLPA = (job.minJdSalary * exchangeRate*1000) / 100000;
  const maxSalaryLPA = (job.maxJdSalary * exchangeRate*1000) / 100000;
  
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card className="job-card" variant="outlined">
        <CardHeader
          avatar={<img src={job.logoUrl} alt="Company Icon" className="company-icon" />}
          title={<Typography variant="h6" className="card-title">{job.companyName}</Typography>}
          subheader={
            <div className="card-subheader">
              <Typography variant="subtitle1">{job.jobRole}</Typography>
              <Typography variant="body1">{job.location}</Typography>
            </div>
          }
        />
        <CardContent className="card-content">
          <div className="about-company">
            <Typography variant="body1">Estimated Salary:  {job.minJdSalary > 0 ? `${minSalaryLPA.toFixed(2)} -` : job.minJdSalary}  {maxSalaryLPA.toFixed(2)} LPA</Typography>
            <div className="about-company">
              <Typography variant="body1">About Company:</Typography>
              <Typography variant="body1">About us</Typography>
            </div>
          </div>
          <Typography variant="body2" className="job-details">{job.jobDetailsFromCompany}</Typography>
          {job.jobDetailsFromCompany.length > 280 &&
            <Button variant="text" className="see-more-button" color="primary" onClick={handleDialogOpen} >See More</Button>
          }
          <div className="buttons-container">
            <Typography variant="body1">Minimum Experience: </Typography>
            <Typography variant="body1" className="min-exp">{job.minExp? `${job.minExp} years` : '-'} </Typography>
            <Button variant="contained" className="easyApply">Easy Apply</Button>
            <Button variant="contained" className="unlockReferral">Unlock Referral</Button>
          </div>
        </CardContent>
      </Card>
      <JobDetailsDialog open={dialogOpen} handleClose={handleDialogClose} jobDetails={job} />
    </ThemeProvider>
  );
};

export default JobCard;

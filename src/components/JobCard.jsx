import React, { useState } from "react";
import { Card, CardContent, CardHeader, Typography, Button } from "@material-ui/core";
import JobDetailsDialog from "./jobDetailsDialog";
import { ThemeProvider,createTheme } from '@material-ui/core/styles';
import company_icon from '../company_logo.png'

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
  const [expanded, setExpanded] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  
  return (
    <ThemeProvider theme={theme}>
      <Card className="job-card" variant="outlined"  style={{ borderRadius: 12, maxHeight: '652.516px', maxWidth: '360px' }}>
        <CardHeader
          avatar={<img src={company_icon} alt="Company Icon" style={{ width: 40, height: 40, borderRadius: "50%" }} />}
          title={
            <Typography variant="h6">Company Name</Typography>
           }
          subheader={
            <div>
            <Typography variant="subtitle1">{job.jobRole}</Typography>
            <Typography variant="body1">{job.location}</Typography> 
            </div>
          }
        />
        <CardContent>
            <div style={{ display: "flex",flexDirection:"column", justifyContent: "space-between",gap:"8px" }}>
                <Typography variant="body1">Estimated Salary:  {job.minJdSalary > 0 ? `${job.minJdSalary} -`: job.minJdSalary}  {job.maxJdSalary} {job.salaryCurrencyCode}</Typography>
                <div style={{ display: "flex",flexDirection:"column", justifyContent: "space-between",gap:"2px" }}>
                    <Typography variant="body1">About Company:</Typography>
                    <Typography variant="body1">About us</Typography>
                </div>
            </div>
            <Typography variant="body2" style={{ maxHeight: expanded ? "none" : "5.5em", overflow: "hidden" }}>{job.jobDetailsFromCompany}</Typography>
            {job.jobDetailsFromCompany.length > 280 &&
            <Button variant="text" color="primary" onClick={handleDialogOpen} style={{ display: "block", margin: "0 auto" }}>See More</Button>
          }
          <div style={{ display: "flex",flexDirection:"column", justifyContent: "space-between",gap:"4px" }} >
          <Typography variant="body1">Minimum Experience: </Typography>
          <Typography variant="body1">{job.minExp} years</Typography>
          </div>
          <div style={{ display: "flex",flexDirection:"column", justifyContent: "space-between",gap:"4px" }} >
          <Button variant="contained" color="easyApply" style={{ marginTop: 10, backgroundColor: theme.palette.easyApply.main }}>Easy Apply</Button>
          <Button variant="contained" color="unlockReferral" style={{ marginTop: 10, backgroundColor: theme.palette.unlockReferral.main }}>Unlock Referral</Button>
          </div>
        </CardContent>
      </Card>
      <JobDetailsDialog open={dialogOpen} handleClose={handleDialogClose} jobDetails={job}/>
    </ThemeProvider>
  );
};

export default JobCard;
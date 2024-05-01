import logo from './logo.svg';
import './App.css';
import FilterBar from './components/filterBar'
import JobCard from './components/JobCard'
import fetchJobs from './service';
import {useState,useEffect} from 'react'

const App=()=>{
 
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs(10, 0); 
        setJobs(data.jdList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
      }
    };

    fetchData();
  }, []);

  const renderJobCards = () => {
    
    const jobSets = [];
    for (let i = 0; i < jobs.length; i += 3) {
      jobSets.push(jobs.slice(i, i + 3));
    }

   
    return jobSets.map((jobSet, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin:"30px" }}>
        {jobSet.map(job => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </div>
    ));
  };


  return(
    <div >
      {renderJobCards()}
    </div>
  );

}
export default App;
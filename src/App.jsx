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
        const data = await fetchJobs(10, 0); // Fetching 10 jobs starting from offset 0
        setJobs(data.jdList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        // Handle error
      }
    };

    fetchData();
  }, []);

  return(
    <div>
      {jobs.map((job) => (
        <JobCard key={job.jdUid} job={job} />
      ))}
    </div>
  );

}
export default App;
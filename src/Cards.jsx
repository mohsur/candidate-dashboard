import { useSelector, useDispatch } from 'react-redux';
import { updateJobs } from './actions/actions';
import { store } from './store';
import FilterBar from './components/filterBar';
import JobCard from './components/JobCard';
import fetchJobs from './service';
import { useEffect, useState } from 'react';


const Cards = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
  
    const jobs = useSelector(state => state.jobs);
    const filters = useSelector(store => store.filter);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await fetchJobs(10, 0);
          if (data.jdList.length > 0) {
            dispatch(updateJobs(data.jdList));
            setPage(page + 1);
          } else {
            setHasMore(false);
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(true);
          console.error('Error fetching data:', error);
        }
      };
  
      if (loading && hasMore) {
        fetchData();
      }
    }, [dispatch, loading, page, hasMore]);
  

    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          setLoading(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  

    
    const renderJobCards = () => {
      if (!jobs) return null;
  
      const filteredJobs = jobs.filter(job => {
      
        if (filters.minExperience && job.minExp < filters.minExperience) {
          return false;
        }
  
        if (filters.companyName && job.companyName !== filters.companyName) {
          return false;
        }
  
        if (filters.location && job.location !== filters.location) {
          return false;
        }
  
        if (filters.remote && job.location !== filters.remote) {
          return false;
        }
  
        if (filters.techStack && !job.techStack.includes(filters.techStack)) {
          return false;
        }
  
        if (filters.role && job.jobRole !== filters.role) {
          return false;
        }
  
        if (filters.minBasePay && job.minJdSalary < filters.minBasePay) {
          return false;
        }
  
        return true;
      });
  
      const jobSets = [];
      for (let i = 0; i < jobs.length; i += 3) {
        jobSets.push(filteredJobs.slice(i, i + 3));
      }
  
      return jobSets.map((jobRow, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '30px' }}>
          {jobRow.map((job) => (
            <JobCard key={job.jdUid} job={job} />
          ))}
        </div>
      ));
    };
  
    return (
        <div>
          <FilterBar className="filter-bar" />
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error fetching jobs.</div>
          ) : (
            renderJobCards()
          )}
        </div>
    );
}

export default Cards
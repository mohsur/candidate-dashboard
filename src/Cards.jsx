import { useSelector, useDispatch } from 'react-redux';
import { updateJobs } from './actions/actions';
import { store } from './store';
import FilterBar from './components/filterBar';
import JobCard from './components/jobCard';
import fetchJobs from './service';
import { useEffect, useState } from 'react';
import "./Cards.css"


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
            dispatch(updateJobs(data.jdList));
            setPage(2);
            setLoading(false);
            setHasMore(data.jdList.length > 0);
          }
        catch (error) {
          setLoading(false);
          setError(true);
          console.error('Error fetching data:', error);
        }
      };
        fetchData();
    }, [dispatch]);
  

    useEffect(() => {
      const handleScroll = () => {
        if (
          window.innerHeight + document.documentElement.scrollTop ===
          document.documentElement.offsetHeight
        ) {
          if (!loading && hasMore) {
            setLoading(true);
        }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, [loading, hasMore]);
  
    useEffect(() => {
      const fetchFilteredJobs = async () => {
          try {
              const data = await fetchJobs(10, (page - 1) * 10);
              dispatch(updateJobs([...jobs, ...data.jdList]));
              setPage(page + 1);
              setLoading(false);
              setHasMore(data.jdList.length>0)
          } catch (error) {
              setLoading(false);
              setError(true);
              console.error('Error fetching filtered jobs:', error);
          }
      };

      if (!loading && !error && hasMore) {
          fetchFilteredJobs();
      }
  }, [dispatch, filters, page]);
    
    const renderJobCards = () => {
      if (!jobs) return null;
  
      const filteredJobs = jobs.filter(job => {
      
        if (filters.minExperience && job.minExp <filters.minExperience) {
          return false;
        }
  
        if (filters.companyName && job.companyName !== filters.companyName) {
          return false;
        }
  
        if (filters.location && job.location !== filters.location) {
          return false;
        }
  
        if (filters.remote && filters.remote === "remote" && job.location !== "remote") {
          return false;
        }
    
        if (filters.remote && filters.remote === "onsite" && job.location === "remote") {
          return false;
        }
  
        // if (filters.techStack && !job.techStack.includes(filters.techStack)) {
        //   return false;
        // }
  
        if (filters.role && job.jobRole !== filters.role) {
          return false;
        }
  
        if (filters.minBasePay && job.minJdSalary < filters.minBasePay) {
          return false;
        }
  
        return true;
      });
      
  
      return (
      <div className="job-grid">
            {filteredJobs.map((job, index) => (
                <JobCard job={job} />
            ))}
        </div>
      )
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
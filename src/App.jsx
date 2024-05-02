import logo from './logo.svg';
import './App.css';
import FilterBar from './components/filterBar'
import JobCard from './components/JobCard'
import fetchJobs from './service';
import {useState,useEffect} from 'react'
import { Provider ,useSelector,useDispatch} from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';
import { updateJobs } from './actions/actions.js';



const store = createStore(rootReducer);

const App=()=>{
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs(6, (page-1)*6); 
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

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setLoading(true); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jobs = useSelector(state => state.jobs);
  const filters = useSelector(state => state.filter);

  const renderJobCards = () => {
    if (!jobs) return null;

    const filteredJobs = jobs.filter(job => {
      if (filters.minExperience && job.minExp < filters.minExperience) {
        return false;
      }

      if (filters.companyName && job.jdLink !== filters.companyName) {
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

      if (filters.role && job.role !== filters.role) {
        return false;
      }

      if (filters.minBasePay && job.minJdSalary < filters.minBasePay) {
        return false;
      }

      return true;
    });
    
    const jobSets = []
    for (let i = 0; i < jobs.length; i += 3) {
      jobSets.push(jobs.slice(i, i + 3));
    }

    return jobSets.map((jobRow, index) => (
      <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '30px' }}>
        {jobRow.map((job) => (
          <JobCard key={job.jdUid} job={job} />
        ))}
      </div>
    ));
  };

  
  return(
    <Provider store={store}>
     
    <div >
    <FilterBar className="filter-bar" />
    {loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>Error fetching jobs.</div>
    ) : (
      renderJobCards()
    )}
    </div>
    </Provider>
  );

}
export default App;
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
  const jobs = useSelector(state => state.jobs);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchJobs(10, 0); 
        dispatch(updateJobs(data.jdList));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        
      }
    };
    fetchData();
  }, [dispatch]);

  const renderJobCards = () => {
    if (!jobs) return null;
    
    const jobSets = []
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
    <Provider store={store}>
     
    <div >
    <FilterBar/>
      {renderJobCards()}
    </div>
    </Provider>
  );

}
export default App;
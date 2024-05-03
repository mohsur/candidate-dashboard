import React from 'react';
import Cards from './Cards';
import { store } from './store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Cards />
    </Provider>
  )
};

export default App;
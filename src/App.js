import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';
import Table from './components/Table';
import FormsFilter from './components/FormsFilter';

function App() {
  return (
    <StarWarsProvider>
      <span>Star Wars</span>
      <FormsFilter />
      <Table />
    </StarWarsProvider>
  );
}

export default App;

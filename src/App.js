import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';
import Table from './components/Table';

function App() {
  return (
    <StarWarsProvider>
      <span>Star Wars</span>
      <Table />
    </StarWarsProvider>
  );
}

export default App;

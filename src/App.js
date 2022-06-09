import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import './App.css';
import Table from './components/Table';
import FormsFilter from './components/FormsFilter';
import logo from './image/star-wars-logo.png';
import bb8 from './image/bb8.gif';

function App() {
  return (
    <StarWarsProvider>
      <main className="main">
        <div>
          <img src={ logo } alt="star wars logo" className="star-wars-logo" />
          <h1>Planet Search</h1>
        </div>
        <img src={ bb8 } alt="bb8" className="bb8" />
        <FormsFilter />
        <Table />
      </main>
    </StarWarsProvider>
  );
}

export default App;

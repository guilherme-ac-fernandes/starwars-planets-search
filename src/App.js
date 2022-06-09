import React from 'react';
import StarWarsProvider from './context/StarWarsProvider';
import Header from './components/Header';
import Table from './components/Table';
import PlanetSeatch from './components/PlanetSearch';
import './App.css';

function App() {
  return (
    <StarWarsProvider>
      <main className="main">
        <Header />
        <PlanetSeatch />
        <Table />
        <img src="https://i.giphy.com/media/Um8EFa2XuwvDTVY87D/giphy.webp" alt="boba fetch" className="star-wars-logo" />
      </main>
    </StarWarsProvider>
  );
}

export default App;

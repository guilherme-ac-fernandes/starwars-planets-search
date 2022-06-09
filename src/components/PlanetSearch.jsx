import React from 'react';
import DisplayFilters from './DisplayFilters';
import NameFilter from './NameFilter';
import NumericFilter from './NumericFilter';
import SortPlanet from './SortPlanet';
import '../style/PlanetSeatch.css';

function PlanetSeatch() {
  return (
    <section>
      <NameFilter />
      <div className="planet-search-container">
        <NumericFilter />
        <SortPlanet />
      </div>
      <DisplayFilters />
    </section>
  );
}

export default PlanetSeatch;

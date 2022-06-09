import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../style/DisplayFilters.css';

function DisplayFilters() {
  const { filters, handleRemoveFilter } = useContext(StarWarsContext);
  return (
    <ul className="display-filters-container">
      {filters.map((filter, index) => {
        const { column, comparison, number } = filter;
        const string = `${column} ${comparison} ${number}`;
        return (
          <li key={ index } data-testid="filter" className="filter-container">
            <span>{ string }</span>
            <button
              type="button"
              onClick={ () => handleRemoveFilter(filter) }
              className="btn"
            >
              <span className="material-symbols-outlined trash">
                delete
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default DisplayFilters;

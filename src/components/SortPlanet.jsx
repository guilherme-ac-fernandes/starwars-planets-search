import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../style/SortPlanet.css';

function SortPlanet() {
  const { columnOption, handleSort } = useContext(StarWarsContext);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortRadio, setSortRadio] = useState('ASC');

  const renderColumnOptions = () => (columnOption.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));

  return (
    <form className="form-group sort-planet-container">
      <label htmlFor="column-sort">
        <select
          data-testid="column-sort"
          value={ sortColumn }
          name="column-sort"
          id="column-sort"
          onChange={ ({ target: { value } }) => setSortColumn(value) }
          className="form-control"
        >
          { renderColumnOptions() }
        </select>
      </label>
      <label
        htmlFor="column-sort-input-asc"
        className="form-check-label sort-planet-label-input"
      >
        <input
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          id="column-sort-input-asc"
          name="column-sort-input"
          onChange={ ({ target: { value } }) => setSortRadio(value) }
          className="form-check-input"
        />
        ASC
      </label>
      <label
        htmlFor="column-sort-input-desc"
        className="form-check-label sort-planet-label-input"
      >
        <input
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          id="column-sort-input-desc"
          name="column-sort-input"
          onChange={ ({ target: { value } }) => setSortRadio(value) }
          className="form-check-input"
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleSort({
          column: sortColumn,
          sort: sortRadio,
        }) }
        className="btn btn-warning"
      >
        Sort Planets
      </button>
    </form>
  );
}

export default SortPlanet;

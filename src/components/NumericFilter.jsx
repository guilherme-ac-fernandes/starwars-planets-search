import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../style/NumericFilter.css';

function NumericFilter() {
  const {
    handleButtonFilter,
    columnOption,
    handleRemoveAllFilters,
  } = useContext(StarWarsContext);

  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);

  const renderColumnOptions = () => (columnOption.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));

  return (
    <form className="form-group numeric-filter-container">
      <label htmlFor="column-filter">
        <select
          data-testid="column-filter"
          value={ filterColumn }
          name="column-filter"
          id="column-filter"
          onChange={ ({ target: { value } }) => setFilterColumn(value) }
          className="form-control"
        >
          { renderColumnOptions() }
        </select>
      </label>
      <label htmlFor="comparison-filter">
        <select
          data-testid="comparison-filter"
          value={ filterComparison }
          name="comparison-filter"
          id="comparison-filter"
          onChange={ ({ target: { value } }) => setFilterComparison(value) }
          className="form-control"
        >
          <option value="maior que">maior que</option>
          <option value="igual a">igual a</option>
          <option value="menor que">menor que</option>
        </select>
      </label>
      <label htmlFor="value-filter">
        <input
          type="number"
          data-testid="value-filter"
          value={ filterNumber }
          id="value-filter"
          placeholder="Number"
          onChange={ ({ target: { value } }) => setFilterNumber(value) }
          className="form-control"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleButtonFilter({
          column: filterColumn,
          comparison: filterComparison,
          value: filterNumber,
        }) }
        className="btn btn-primary"
      >
        Filter
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFilters }
        className="btn btn-danger"
      >
        Remove All Filters
      </button>
    </form>
  );
}

export default NumericFilter;

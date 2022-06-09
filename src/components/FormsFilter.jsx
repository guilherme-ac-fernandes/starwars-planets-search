import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FormsFilter() {
  const { setFilterByName,
    handleButtonFilter,
    filters,
    columnOption,
    handleRemoveFilter,
    handleRemoveAllFilters,
    handleSort,
  } = useContext(StarWarsContext);

  const [filterName, setfilterName] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);
  const [sortColumn, setSortColumn] = useState('population');
  const [sortRadio, setSortRadio] = useState('ASC');

  useEffect(() => {
    setFilterByName({ name: filterName });
  }, [setFilterByName, filterName]);

  const renderColumnOptions = () => (columnOption.map((option) => (
    <option
      value={ option }
      key={ option }
    >
      { option }
    </option>
  )));

  return (
    <section>
      <form className="form-group">
        <label htmlFor="name-filter">
          <input
            type="text"
            data-testid="name-filter"
            value={ filterName }
            id="name-filter"
            placeholder="Planet Name"
            onChange={ ({ target: { value } }) => setfilterName(value) }
            className="form-control"
          />
        </label>

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

        {/* Sort */}
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
          className="form-check-label"
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
          className="form-check-label"
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

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ handleRemoveAllFilters }
          className="btn btn-danger"
        >
          Remove Filters
        </button>

      </form>
      <ul>
        {filters.map((filter, index) => {
          const { column, comparison, number } = filter;
          const string = `${column} | ${comparison} | ${number}`;
          return (
            <li key={ index } data-testid="filter">
              <span>{ string }</span>
              <button
                type="button"
                onClick={ () => handleRemoveFilter(filter) }
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    </section>

  );
}

export default FormsFilter;

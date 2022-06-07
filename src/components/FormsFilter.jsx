import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FormsFilter() {
  const { setFilterByName,
    setFilterByNumber,
    handleButtonFilter,
    filters,
  } = useContext(StarWarsContext);
  const [filterName, setfilterName] = useState('');
  const [filterColumn, setFilterColumn] = useState('population');
  const [filterComparison, setFilterComparison] = useState('maior que');
  const [filterNumber, setFilterNumber] = useState(0);

  useEffect(() => {
    setFilterByName({ name: filterName });
    setFilterByNumber({
      column: filterColumn,
      comparison: filterComparison,
      number: filterNumber,
    });
  }, [
    setFilterByName,
    filterName,
    setFilterByNumber,
    filterColumn,
    filterComparison,
    filterNumber,
  ]);

  return (
    <section>

      <form>
        <label htmlFor="name-filter">
          <input
            type="text"
            data-testid="name-filter"
            value={ filterName }
            id="name-filter"
            placeholder="Planet Name"
            onChange={ ({ target: { value } }) => setfilterName(value) }
          />
        </label>

        <label htmlFor="column-filter">
          <select
            data-testid="column-filter"
            value={ filterColumn }
            name="column-filter"
            id="column-filter"
            onChange={ ({ target: { value } }) => setFilterColumn(value) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>

        <label htmlFor="comparison-filter">
          <select
            data-testid="comparison-filter"
            value={ filterComparison }
            name="comparison-filter"
            id="comparison-filter"
            onChange={ ({ target: { value } }) => setFilterComparison(value) }
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
          />
        </label>

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleButtonFilter }
        >
          Filter
        </button>
      </form>
      <ul>
        {filters.map((filter, index) => {
          const { column, comparison, number } = filter;
          const string = `${column} | ${comparison} | ${number}`;
          return (<li key={ index }>{ string }</li>);
        })}
      </ul>
    </section>

  );
}

export default FormsFilter;

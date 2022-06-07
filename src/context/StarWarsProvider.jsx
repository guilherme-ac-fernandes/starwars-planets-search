import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumber, setFilterByNumber] = useState({
    column: '',
    comparison: '',
    value: '',
  });
  const [columnOption, setColumnOption] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    setLoading(true);
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((response) => response.json())
      .then(({ results }) => {
        results.map((planet) => delete planet.residents);
        setData(results);
        setDataFilter(results);
        setLoading(false);
      });
  }, []);

  const handleButtonFilter = () => {
    const arrayFilter = [...filters, filterByNumber];
    const columnOptionFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((option) => option !== curr.column);
      return newAcc;
    }, columnOption);

    setColumnOption(columnOptionFilter);
    const arrayPlanetsFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((planet) => {
        if (curr.comparison === 'maior que') {
          return Number(planet[curr.column]) > Number(curr.value);
        } if (curr.comparison === 'menor que') {
          return Number(planet[curr.column]) < Number(curr.value);
        }
        return Number(planet[curr.column]) === Number(curr.value);
      });
      return newAcc;
    }, dataFilter);

    setFilters(arrayFilter);
    setDataFilter(arrayPlanetsFilter);
  };

  useEffect(() => {
    // Utilizar o includes de forma insensível proveniente do site Bobby Hadz
    // link: https://bobbyhadz.com/blog/javascript-includes-case-insensitive
    const arrayPlanetsFilter = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()));
    setDataFilter(arrayPlanetsFilter);
  }, [filterByName, data, setDataFilter]);

  const contextValue = {
    loading,
    dataFilter,
    filterByName,
    setFilterByName,
    setFilterByNumber,
    handleButtonFilter,
    filters,
    columnOption,
  };

  return (
    <StarWarsContext.Provider value={ contextValue }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StarWarsProvider;

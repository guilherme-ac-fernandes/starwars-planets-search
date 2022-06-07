import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumber, setFilterByNumber] = useState({
    column: '',
    comparison: '',
    number: '',
  });

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
    const arrayPlanetsFilter = dataFilter.filter((planet) => {
      if (filterByNumber.comparison === 'maior que') {
        return Number(planet[filterByNumber.column]) > Number(filterByNumber.number);
      } if (filterByNumber.comparison === 'menor que') {
        return Number(planet[filterByNumber.column]) < Number(filterByNumber.number);
      }
      return Number(planet[filterByNumber.column]) === Number(filterByNumber.number);
    });
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

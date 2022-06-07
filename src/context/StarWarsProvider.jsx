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
    const arrayFilter = [...filters, filterByNumber];

    // let array = dataFilter;
    // arrayFilter.forEach((filter) => {
    //   array = array.filter((planet) => {
    //     if (filter.comparison === 'maior que') {
    //       return Number(planet[filter.column]) > Number(filter.number);
    //     } if (filter.comparison === 'menor que') {
    //       return Number(planet[filter.column]) < Number(filter.number);
    //     }
    //     return Number(planet[filter.column]) === Number(filter.number);
    //   });
    // });

    const arrayPlanetsFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((planet) => {
        if (curr.comparison === 'maior que') {
          return Number(planet[curr.column]) > Number(curr.number);
        } if (curr.comparison === 'menor que') {
          return Number(planet[curr.column]) < Number(curr.number);
        }
        return Number(planet[curr.column]) === Number(curr.number);
      });
      return newAcc;
    }, dataFilter);

    // const arrayPlanetsFilter = dataFilter.filter((planet) => {
    //   if (filterByNumber.comparison === 'maior que') {
    //     return Number(planet[filterByNumber.column]) > Number(filterByNumber.number);
    //   } if (filterByNumber.comparison === 'menor que') {
    //     return Number(planet[filterByNumber.column]) < Number(filterByNumber.number);
    //   }
    //   return Number(planet[filterByNumber.column]) === Number(filterByNumber.number);
    // });

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

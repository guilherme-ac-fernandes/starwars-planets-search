import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

const INICIAL_STATE_FILTER_BY_NUMBER = {
  column: '',
  comparison: '',
  value: '',
};

const INICIAL_STATE_ORDER = {
  column: '',
  sort: '',
};

const INICIAL_COLUMN_OPTIONS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function StarWarsProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumber, setFilterByNumber] = useState(INICIAL_STATE_FILTER_BY_NUMBER);
  const [columnOption, setColumnOption] = useState(INICIAL_COLUMN_OPTIONS);
  const [order, setOrder] = useState(INICIAL_STATE_ORDER);

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

  const applyFilterOnData = (startData, array) => array.reduce((acc, curr) => {
    const newAcc = acc.filter((planet) => {
      if (curr.comparison === 'maior que') {
        return Number(planet[curr.column]) > Number(curr.value);
      } if (curr.comparison === 'menor que') {
        return Number(planet[curr.column]) < Number(curr.value);
      }
      return Number(planet[curr.column]) === Number(curr.value);
    });
    return newAcc;
  }, startData);

  const handleButtonFilter = () => {
    const arrayFilter = [...filters, filterByNumber];
    const columnOptionFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((option) => option !== curr.column);
      return newAcc;
    }, columnOption);

    setColumnOption(columnOptionFilter);
    const arrayPlanetsFilter = applyFilterOnData(dataFilter, arrayFilter);
    setFilters(arrayFilter);
    setDataFilter(arrayPlanetsFilter);
  };

  const sortByPopulationASC = (a, b) => {
    // Proveniente da Documentação
    // link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    const ONE_NEGATIVE = -1;
    const ONE_POSITIVE = 1;
    if (nameA < nameB) return ONE_NEGATIVE;
    if (nameA > nameB) return ONE_POSITIVE;
    return 0;
  };

  useEffect(() => {
    // Utilizar o includes de forma insensível proveniente do site Bobby Hadz
    // link: https://bobbyhadz.com/blog/javascript-includes-case-insensitive
    const arrayPlanetsFilter = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    setDataFilter(arrayPlanetsFilter);
  }, [filterByName, data, setDataFilter]);

  const handleRemoveFilter = (option) => {
    const filtersChange = filters.filter((filter) => filter !== option);

    setFilters(filtersChange);
    setColumnOption([...columnOption, option.column]);

    const dataInput = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    const updateDataFilter = applyFilterOnData(dataInput, filtersChange);
    setDataFilter(updateDataFilter);
  };

  const handleRemoveAllFilters = () => {
    setFilters([]);
    setColumnOption(INICIAL_COLUMN_OPTIONS);

    const dataInput = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    const updateDataFilter = applyFilterOnData(dataInput, []);
    setDataFilter(updateDataFilter);
  };

  const orderByNumber = (a, b) => {
    const { column, sort } = order;
    if (sort === 'ASC') {
      return a[column] - b[column];
    }
    return b[column] - a[column];
  };

  const handleSort = () => {
    const dataFilterCopy = [...dataFilter];
    const dataFilterAndSort = dataFilterCopy.sort(orderByNumber);
    const arrayNumber = [];
    const arrayString = [];
    dataFilterAndSort.forEach((planet) => {
      if (typeof item === 'number') {
        arrayNumber.push(planet);
      } else {
        arrayString.push(planet);
      }
    });
    console.log([...arrayNumber, ...arrayString]);

    setDataFilter([...arrayNumber, ...arrayString]);
  };

  const contextValue = {
    loading,
    dataFilter,
    filterByName,
    setFilterByName,
    setFilterByNumber,
    handleButtonFilter,
    filters,
    columnOption,
    handleRemoveFilter,
    handleRemoveAllFilters,
    order,
    setOrder,
    handleSort,
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

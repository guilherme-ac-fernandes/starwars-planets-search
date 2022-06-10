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

  useEffect(() => {
    // Utilizar o includes de forma insensível proveniente do site Bobby Hadz
    // link: https://bobbyhadz.com/blog/javascript-includes-case-insensitive
    const arrayPlanetsFilter = data
      .filter(({ name }) => name.toLowerCase().includes(filterByName.name.toLowerCase()))
      .sort(sortByPopulationASC);
    setDataFilter(arrayPlanetsFilter);
  }, [filterByName, data, setDataFilter]);

  const handleButtonFilter = (object, setFilterColumn) => {
    const arrayFilter = [...filters, object];
    const arrayPlanetsFilter = applyFilterOnData(dataFilter, arrayFilter);
    const columnOptionFilter = arrayFilter.reduce((acc, curr) => {
      const newAcc = acc.filter((option) => option !== curr.column);
      return newAcc;
    }, columnOption);

    setFilterByNumber(object);
    setColumnOption(columnOptionFilter);
    setFilters(arrayFilter);
    setDataFilter(arrayPlanetsFilter);
    setFilterColumn(columnOptionFilter[0]);
  };

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

  // Resolução do sort com string baseada na código presente no Stack OverFlow
  // link: https://stackoverflow.com/questions/53958419/sort-an-array-which-contains-number-and-strings
  const splitDataWithUnknown = (column) => [...dataFilter].reduce((acc, curr) => {
    if (curr[column] === 'unknown') {
      acc.arrayString.push(curr);
      return acc;
    }
    acc.arrayNumber.push(curr);
    return acc;
  }, {
    arrayNumber: [],
    arrayString: [],
  });

  const orderDataFilterBySort = (arrayString, arrayNumber, { column, sort }) => {
    switch (sort) {
    case 'ASC':
      return [
        ...arrayString,
        ...arrayNumber.sort((a, b) => a[column] - b[column]),
      ];
    default:
      return [
        ...arrayNumber.sort((a, b) => b[column] - a[column]),
        ...arrayString,
      ];
    }
  };

  const handleSort = (object) => {
    setOrder(object);
    const { column } = object;
    const { arrayString, arrayNumber } = splitDataWithUnknown(column);
    const sortedArrayData = orderDataFilterBySort(arrayString, arrayNumber, object);
    setDataFilter(sortedArrayData);
  };

  const contextValue = {
    loading,
    dataFilter,
    filterByName,
    filterByNumber,
    setFilterByName,
    handleButtonFilter,
    filters,
    columnOption,
    order,
    handleRemoveFilter,
    handleRemoveAllFilters,
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

import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function FormsFilter() {
  const { setFilterByName } = useContext(StarWarsContext);
  const [planetName, setPlanetName] = useState('');

  const handleInput = ({ target: { value } }) => {
    setPlanetName(value);
  };

  useEffect(() => {
    setFilterByName({ name: planetName });
  }, [planetName, setFilterByName]);

  return (
    <form>
      <label htmlFor="name-filter">
        <input
          type="text"
          data-testid="name-filter"
          value={ planetName }
          id="name-filter"
          placeholder="Planet Name"
          onChange={ handleInput }
        />
      </label>
    </form>
  );
}

export default FormsFilter;

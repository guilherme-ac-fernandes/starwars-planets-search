import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { dataFilter, loading } = useContext(StarWarsContext);

  const createLink = (linkList, string) => (linkList.map((link, index) => (
    <a href={ link } key={ `${string}-${index}` }>{`${link.split('/')[5]}º`}</a>
  )));

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        { loading && (
          <tbody>
            <tr>
              <td>Loading...</td>
            </tr>
          </tbody>
        ) }
        { !loading && (
          <tbody>
            {dataFilter.map((planet) => (
              <tr key={ planet.name }>
                <td data-testid="planet-name">{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ createLink(planet.films, 'film') }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td><a href={ planet.url }>More info</a></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </section>
  );
}

export default Table;

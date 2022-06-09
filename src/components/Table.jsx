import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import '../style/Table.css';

function Table() {
  const { dataFilter, loading } = useContext(StarWarsContext);

  const createLink = (linkList, string) => (linkList.map((link, index) => (
    <a href={ link } key={ `${string}-${index}` }>{`${link.split('/')[5]}º`}</a>
  )));

  const formatedDisplayDate = (string) => {
    const firstPart = string.split('.')[0].split('T');
    const transformString = `
    ${firstPart[0].replace('-', '/').replace('-', '/')} at ${firstPart[1]}
    `;
    return transformString;
  };

  return (
    <section className="table-container">
      <table className="table table-hover table-dark table-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Rotation Period</th>
            <th scope="col">Orbital Period</th>
            <th scope="col">Diameter</th>
            <th scope="col">Climate</th>
            <th scope="col">Gravity</th>
            <th scope="col">Terrain</th>
            <th scope="col">Surface Water</th>
            <th scope="col">Population</th>
            <th scope="col">Films</th>
            <th scope="col">Created</th>
            <th scope="col">Edited</th>
            <th scope="col">URL</th>
          </tr>
        </thead>
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
                <td>{ formatedDisplayDate(planet.created) }</td>
                <td>{ formatedDisplayDate(planet.edited) }</td>
                <td><a href={ planet.url }>More info</a></td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      { loading && <h2>Loading...</h2>}
    </section>
  );
}

export default Table;

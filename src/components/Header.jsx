import React from 'react';
import logo from '../image/star-wars-logo.png';
import bb8 from '../image/bb8.gif';
import '../style/Header.css';

function Header() {
  return (
    <header className="header-container">
      <img src="https://thatpartyplace.co.uk/media/catalog/product/cache/f77ffc1f1a5cd8124cb7ab9df9a74e56/t/p/tppvs-022-babyyodacot-amz.png" alt="grogu" className="grogu" />
      <div className="header-title-container">
        <img src={ logo } alt="star wars logo" className="star-wars-logo" />
        <h3>Planet Search</h3>
      </div>
      <img src={ bb8 } alt="bb8" className="bb8" />
    </header>
  );
}

export default Header;

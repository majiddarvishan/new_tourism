import React from 'react';

const CityMenu = ({ selectedCity, setSelectedCity }) => {
  const cities = ["همه", "تهران", "مشهد", "اصفهان", "شیراز", "تبریز"];

  return (
    <div className="container mt-3">
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="cityMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {selectedCity === "همه" ? "انتخاب شهر" : selectedCity}
        </button>
        <ul className="dropdown-menu" aria-labelledby="cityMenuButton">
          {cities.map((city, index) => (
            <li key={index}>
              <a
                className="dropdown-item"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CityMenu;

// Archive.js
import React, { memo, useState } from "react";
import CountryModal from "./CountryModal";

function Archive({ searchedCountries = [], isDarkMode, onFetchError }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
  };

  return (
    <aside>
      <h2>Country archive</h2>
      <div className="country-container">
        {searchedCountries.map((country, i) => (
          <div
            key={i}
            className={`country-box ${isDarkMode ? "dark-mode" : ""}`}
            onClick={() => handleCountryClick(country)}
          >
            <img
              src={country.flags.png}
              className={isDarkMode ? "no-invert" : ""}
              alt={`${country.name.common} Flag`}
            />
            <p>
              <strong>Name:</strong> {country.name.common}
            </p>
            <p>
              <strong>Region:</strong> {country.region}
            </p>
          </div>
        ))}
      </div>
      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={handleCloseModal}
          onFetchError={onFetchError} // Pass onFetchError to CountryModal
        />
      )}
    </aside>
  );
}

export default memo(Archive);

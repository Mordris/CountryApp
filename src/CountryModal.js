// CountryModal.js
import React, { useEffect, useRef, useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";

function CountryModal({ country, onClose, isDarkMode, onFetchError }) {
  const modalRef = useRef();
  const [borderCountries, setBorderCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorderCountries = async () => {
      if (country && country.borders && country.borders.length > 0) {
        try {
          const borderCountryNames = await Promise.all(
            country.borders.map(async (borderCode) => {
              try {
                const response = await fetch(
                  `https://restcountries.com/v3.1/alpha/${borderCode}`
                );
                if (!response.ok) {
                  throw new Error(`Failed to fetch data for ${borderCode}`);
                }
                const data = await response.json();

                // Check if the 'name' property exists before extracting the country name
                const countryName = data?.[0]?.name?.common || "N/A";

                return countryName;
              } catch (error) {
                console.error(`Error fetching ${borderCode}:`, error);
                setError(error.message);
                onFetchError(error);
                return "N/A";
              }
            })
          );

          setBorderCountries(borderCountryNames);
        } catch (error) {
          console.error("Error fetching border countries:", error);
          setError(error.message);
        }
      }
    };

    fetchBorderCountries();
  }, [country, onFetchError]);

  const allBorderCountries = borderCountries.join(", ");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (error) {
    return <ErrorPage />;
  }

  if (!country) {
    console.error("Country data is missing in CountryModal");
    return <ErrorPage />;
  }

  const {
    name,
    currencies,
    capital,
    region,
    subregion,
    languages,
    area,
    population,
    flags,
  } = country;

  return (
    <ErrorBoundary>
      <div className={`modal-overlay ${isDarkMode ? "dark-mode" : ""}`}>
        <div
          className={`modal-box ${isDarkMode ? "dark-mode" : ""}`}
          ref={modalRef}
        >
          <button className="close-button" onClick={onClose}>
            Close
          </button>
          <h2>{name?.common || "N/A"}</h2>
          <img src={flags?.png} alt={`${name?.common} Flag`} />
          <p>
            <strong>Currencies:</strong>{" "}
            {currencies ? Object.values(currencies)[0]?.name || "N/A" : "N/A"}
          </p>
          <p>
            <strong>Capital:</strong> {capital ? capital[0] : "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {region || "N/A"}
          </p>
          <p>
            <strong>Subregion:</strong> {subregion || "N/A"}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {languages ? Object.values(languages).join(", ") : "N/A"}
          </p>
          <p>
            <strong>Borders:</strong>{" "}
            {borderCountries.length > 0 ? allBorderCountries : "N/A"}
          </p>
          <p>
            <strong>Area:</strong> {area ? new Intl.NumberFormat('en-US').format(area) + ' km²' : "N/A"}
          </p>
          <p>
            <strong>Population:</strong>{" "}
            {population ? population.toLocaleString() : "N/A"}
          </p>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default CountryModal;

// Results.js
import React from "react";

function Results({ searchedCountries }) {
  const countryCount = searchedCountries ? searchedCountries.length : 0;

  return <p>🚀 {countryCount} countries found</p>;
}

export default Results;

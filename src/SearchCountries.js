// SearchCountries.js
import React, { useState } from "react";

function SearchCountries({ setSearchQuery }) {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    if (setSearchQuery) {
      setSearchQuery(newValue);
    } else {
      console.error("SearchCountries is missing setSearchQuery prop");
    }
  };

  return (
    <input
      data-testid="search-input"
      value={inputValue}
      onChange={handleChange}
      placeholder="Search countries..."
    />
  );
}

export default SearchCountries;

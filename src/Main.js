// Main.js
import { memo, useState } from "react";
import Archive from "./Archive";
import ErrorPage from "./ErrorPage";

function Main({ searchedCountries, isFakeDark, toggleSortOrder }) {
  const [error, setError] = useState(null);

  const handleFetchError = (error) => {
    console.error("Error fetching country data:", error.message);
    setError(error.message);
  };

  return (
    <main>
      {error ? (
        // Render ErrorPage if there's an error
        <ErrorPage />
      ) : (
        // Otherwise, render the main content
        <>
          <div className="sort-button-container">
            <button onClick={toggleSortOrder}>Sort by Name</button>
          </div>
          <Archive
            searchedCountries={searchedCountries}
            isFakeDark={isFakeDark}
            onFetchError={handleFetchError}
          />
        </>
      )}
    </main>
  );
}

export default memo(Main);

// Main.js
import { memo, useState } from "react";
import Archive from "./Archive";
import ErrorPage from "./ErrorPage"; // Import ErrorPage

function Main({ searchedCountries, isFakeDark, toggleSortOrder }) {
  const [error, setError] = useState(null); // State to track errors

  // Function to handle API fetch errors
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
          {/* Pass handleFetchError function to Archive */}
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

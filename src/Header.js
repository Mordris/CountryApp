// Header.js
import { memo } from "react";
import Results from "./Results";
import SearchCountries from "./SearchCountries";
import ErrorPage from "./ErrorPage";

function Header({ searchedCountries, setSearchQuery }) {
  if (!setSearchQuery || !searchedCountries) {
    // Handle missing props
    console.error("Header component is missing required props");
    return <ErrorPage />;
  }
  return (
    <header>
      <h1>
        <span>
          <img className="appicon" src="appicon.ico" alt="app icon"></img>
        </span>
        Country Information App
      </h1>
      <div>
        <Results searchedCountries={searchedCountries} />
        <SearchCountries setSearchQuery={setSearchQuery} />
      </div>
    </header>
  );
}

export default memo(Header);

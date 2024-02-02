// App.js
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import "./styles.css";
import ErrorBoundary from "./ErrorBoundary";
import ErrorPage from "./ErrorPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [error, setError] = useState(null); // State to track errors

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");

        if (!response.ok) {
          throw new Error("Failed to fetch country data");
        }

        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching country data:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", isDarkMode);
  }, [isDarkMode]);

  const searchedCountries =
    searchQuery.length > 0
      ? countries.filter((country) =>
          `${country.name.common} ${country.region}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : countries;

  const sortedCountries = [...searchedCountries].sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();

    if (sortAscending) {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  const toggleSortOrder = () => {
    setSortAscending((prevSortAscending) => !prevSortAscending);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prevIsDarkMode) => !prevIsDarkMode);
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ErrorBoundary>
      <section className={isDarkMode ? "dark-mode" : ""}>
        <button onClick={toggleDarkMode} className="btn-dark-mode">
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        <Header
          searchedCountries={sortedCountries}
          setSearchQuery={setSearchQuery}
        />
        <Main
          searchedCountries={sortedCountries}
          isDarkMode={isDarkMode}
          toggleSortOrder={toggleSortOrder}
        />
        <Footer />
      </section>
    </ErrorBoundary>
  );
}

export default App;

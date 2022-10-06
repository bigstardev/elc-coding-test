/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React, { useState, useEffect } from "react";
import useDebounce from "../hook/useDebounce";
import Product from "./product";

const Menu = () => {
  const [showingSearch, setShowingSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const showSearchContainer = (e) => {
    e.preventDefault();
    setShowingSearch((prev) => !prev);
  };

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  // API search function
  const searchCharacters = (search) => {
    return fetch(`http://localhost:3035/?search=${search}`, {
      method: "GET",
    })
      .then((r) => r.json())
      .then((r) => r.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
  };
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((searchResults) => {
          setIsSearching(false);
          setResults(searchResults);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>ELC</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>

            <a href="#" onClick={showSearchContainer}>
              <i className="material-icons search">search</i>
            </a>
          </nav>
        </div>
      </div>
      <div className={(showingSearch ? "showing " : "") + "search-container"}>
        <input type="text" onChange={onSearch} />
        <a href="#" onClick={showSearchContainer}>
          <i className="material-icons close">close</i>
        </a>
        {isSearching && <div>Searching ...</div>}
        {results && (
          <>
            {results.length === 0 ? (
              debouncedSearchTerm === "" ? null : (
                <h3 className="no-result">No results</h3>
              )
            ) : (
              <div className="search-result">
                {results.map((result) => (
                  <Product key={result._id} data={result} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Menu;

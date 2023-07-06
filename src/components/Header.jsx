import Nav from "./Nav";
import SearchBar from "./SearchBar.js";
import YearSelector from "./YearSelector.js";
import React from 'react';

/*
 * Populates the years array, referenced by the "YearSelector".
 * Declared globally for stability. Note: Move to Header or YearSelector.
*/
const years = [""]
for (let i = 1990; i <= new Date().getFullYear(); i++) {
    years.push(i);
}

/**
 * The header component. Rendered by App for every page.
 * Includes the Nav, SearchBar and YearSelector components.
 * 
 * @param {Object} props Set of states: query, setQuery, year, setYear, setRowData, loggedIn, setLoggedIn, setPagination.
 * @returns {JSX.Element} Header element containing navigation components.
*/
export default function Header(props) {
    const { query, setQuery, year, setYear, setRowData, loggedIn, setLoggedIn, setPagination } = props;

    return (
        <header>
            <div id="content">
                <img src="/img/icon.png" alt="Icon" />
                <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                <div className="search-container">
                    <SearchBar query={query} setQuery={setQuery} year={year} setRowData={setRowData} setPagination={setPagination} />
                    <YearSelector year={year} setYear={setYear} years={years}/>
                </div>
            </div>
        </header>
    );
}
import Nav from "./Nav";
import SearchBar from "./SearchBar.js";
import YearSelector from "./YearSelector.js";
import React from 'react';


const years = [""]
for (let i = 1990; i <= new Date().getFullYear(); i++) {
    years.push(i);
}

// the header
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
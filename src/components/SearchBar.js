import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import FetchJSON from "../api/FetchJSON.js"

/*
 * Checks the provided movie title string does not include disallowed characters.
*/
function validateInput(searchQuery) {
    const titleRegex = /^[^.;\\/|\'\"\`]*$/;

    return titleRegex.test(searchQuery);
}

/**
 * SearchBar component which accepts a string related to a movie title.
 * Upon submission, will query the backend for movies including the provided substring.
 * 
 * @param {Object} props query, setQuery, year, setRowData, setPagination.
 * @returns search-bar component which includes an input bar and submit button.
 * @usedIn Nav
 */
export default function SearchBar(props) {
    const { query, setQuery, year, setRowData, setPagination } = props;
    const [innerSearch, setInnerSearch] = useState("");
    const [submit, setSubmit] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    //Sections pertaining to empty search commented out.
    const handleSearch = () => {
        //if (innerSearch.trim() !== "") {
            if (validateInput(innerSearch)) {
                setQuery(innerSearch);
                setSubmit(!submit);
                navigate("/movies");
            } else {
                window.alert("Your search query contains disallowed symbols. Please try again.");
                setInnerSearch("");
            }
        /*} else {
            window.alert("Search field cannot be empty");
            setInnerSearch("");
        }*/
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target === searchInputRef.current) {
            handleSearch();
        }
    };

    useEffect(() => {
        if (isMounted) {
            FetchJSON({ query, year, setRowData, setPagination });
        } else {
            setMounted(true);
        }
    }, [submit]);

    return (
        <div className="search-bar">
            <input
                aria-labelledby="search-button"
                name="search"
                id="search"
                type="search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={searchInputRef}
            />
            <button
                className="search-button"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
}
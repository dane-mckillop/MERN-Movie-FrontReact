import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import FetchJSON from "../api/FetchJSON.js"

function validateInput(searchQuery) {
    const titleRegex = /^[^.;\\/|\'\"\`]*$/;

    return titleRegex.test(searchQuery);
}

export default function SearchBar(props) {
    const { query, setQuery, year, setRowData, setPagination } = props;
    const [innerSearch, setInnerSearch] = useState("");
    const [submit, setSubmit] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const searchInputRef = useRef(null);
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && event.target === searchInputRef.current) {
            if (innerSearch.trim() !== "") {
                if (validateInput(innerSearch)) {
                    setQuery(innerSearch);
                    setSubmit(!submit);
                    navigate("/movies");
                } else {
                window.alert("Your search query contains disallowed symbols. Please try again.");
                }
            } else {
                window.alert("Search field cannot be empty");
            }            
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
                onClick={() => {
                    if (innerSearch.trim() !== "") {
                        if (validateInput(innerSearch)) {
                            setQuery(innerSearch);
                            setSubmit(!submit);
                            navigate("/movies");
                        } else {
                        window.alert("Your search query contains disallowed symbols. Please try again.");
                        setInnerSearch("");
                        }
                    } else {
                        window.alert("Search field cannot be empty");
                        setInnerSearch("");
                    }   
                }}
            >
                Search
            </button>
        </div>
    );
}
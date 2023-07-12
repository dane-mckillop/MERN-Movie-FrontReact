import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//components
import FetchMovie from "../api/FetchMovie.js";
import MovieComponent from "../components/MovieComponent.js"
//data
//import countries from '../data/countries.json';


/**
 * Movie page for the web-application. Displays information related to the movie.
 * Makes an api call to get movie information related to the passed parameter,
 * then displays the formatted information.
 * 
 * @param {Object} props loggedIn, setLoggedIn
 * @returns React component for the movie page.
*/
export default function Movie() {
    const { imdbID } = useParams();
    const [persons, setPersons] = useState([]);
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: "",
        year: "",
        runtime: "",
        genres: [],
        country: "",
        principals: [],
        ratings: [],
        boxoffice: "",
        poster: "",
        plot: "",
    });
    const columns = [
        { headerName: "Name", field: "name", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
        { headerName: "Role", field: "category", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
        { headerName: "Characters", field: "characters", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
    ]

    /*
    //DEPRECATED
    //flagsapi is blocking GET request due to CORS policy
    //restcountries.com will be shutting down as of May 2023.
    function FetchFlags(someCountries) {
        const countryCodes = [];
        const countryFlags = [];
        if (someCountries !== "") {
            const countryArr = movie.country.split(", ");
            countryArr.forEach((countryName) => {
                const countryCode = countries[countryName];
                if (countryCode) {
                    countryCodes.push(countryCode);
                }
            });
            countryCodes.forEach((countryCode) => {
                fetch(`https://flagsapi.com/shiny/16/${countryCode}.png`)
                    .then((response) => response.blob())
                    .then((blob) => {
                        const flag = URL.createObjectURL(blob);
                        countryFlags.push(flag);
                        setFlags(countryFlags);
                    })
                    .catch((error) => {
                        console.error(`Error loading flag for ${countryCode}:`, error);
                    });
            });
        };
    };
    */

    useEffect(() => {
        if (imdbID !== undefined) {
            FetchMovie(imdbID)
                .then((movie) => {
                    setMovie(movie);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [imdbID]);

    useEffect(() => {
        setPersons(movie.principals);
    }, [movie]);

    return (
        <div>
            <div className="movie-organize">
                <MovieComponent movie={movie} />
            </div>
            <div className="movie-organize">
                <div className="movie-persons">
                    <div className="movie-table">
                        <AgGridReact
                            className="ag-theme-balham"
                            columnDefs={columns}
                            rowData={persons}
                            pagination={true}
                            paginationPageSize={10}
                            domLayout="autoHeight"
                            onRowClicked={(row) => {
                                navigate(`/person/${row.data.id}`)
                            }}
                            suppressBrowserResizeObserver={true}
                        />
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: "150px" }} />
        </div>
    );
}
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//components
import FetchMovie from "../api/FetchMovie.js";
//data
//import countries from '../data/countries.json';


/**
 * Movie page for the web-application. Displays information related to the movie.
 * Makes an api call to get movie information related to the passed parameter,
 * then displays the formatted information.
 * NOTE: SEPERATE OUT COMPONENTS FROM RETURN STATEMENT.  
 * 
 * @param {Object} props loggedIn, setLoggedIn
 * @returns React component for the movie page.
 * @todo Separate components from the return statement.
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
    const badgeColors = {
        Action: "#8B0000",
        Adult: "#1c1c1c",
        Adventure: "#AC5B27",
        Animation: "#000FF0",
        Biography: "#6495ED",
        Comedy: "#EC8F55",
        Crime: "#2C175C",
        Documentary: "#8FBC8F",
        Drama: "#008080",
        Family: "#6D1464",
        Fantasy: "#DAA520",
        History: "#004d00",
        "Sci-Fi": "#838F9C",
        Thriller: "#8E8E8E",
        Romance: "#E5007A",
        Horror: "#660000",
        Music: "#C7A743",
        Musical: "#9f8535",
        Mystery: "#674ea7",
        Sport: "#38761d",
        Western: "#89481f",
        War: "#000000"
    };
    const columns = [
        { headerName: "Name", field: "name", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
        { headerName: "Role", field: "category", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
        { headerName: "Characters", field: "characters", sortable: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
    ]
    const asDollars = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    });

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
                <div className="movie-container">
                    <div className="movie-info">
                        <h2> {movie.title} </h2>
                        <p> Released in: {movie.year}</p>
                        <p className="genre-container">
                            Genres:&nbsp;
                            {movie.genres && movie.genres.map((genre, index) => (
                                <span key={index} style={{ backgroundColor: badgeColors[genre], padding: "5px", marginRight: "5px", borderRadius: "8px" }}>
                                    {genre}
                                </span>
                            ))}
                        </p>
                        <p>{movie.country.includes(", ") ? "Countries: " : "Country: "} {movie.country}</p>
                        <p> Box Office: {asDollars.format(movie.boxoffice)} </p>
                        <p>
                            {movie.plot}
                        </p>
                        <p className="movie-rating">
                            {movie.ratings.map((rating, index) => (
                                <span key={index} style={{ marginRight: "15px" }}>
                                    {rating.source === "Internet Movie Database"
                                        ? `IMDB: ${rating.value ? rating.value + "/10" : "None"}`
                                        : `${rating.source}: ${rating.value ? rating.value + "%" : "None"}`}
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className="movie-poster">
                        {<img src={movie.poster} alt="Poster" />}
                    </div>
                </div>
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
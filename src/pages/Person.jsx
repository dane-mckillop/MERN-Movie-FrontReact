import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
//Components
import FetchPerson from "../api/FetchPerson";
import Prompt from "../components/Prompt";
import BarChart from "../components/BarChart";

/**
 * Person page for the web-application. Includes a table which is
 * populated by persons who worked on given a movie.
 * 
 * @param {Object} props loggedIn
 * @returns React component for the Person page.
 * @todo Separate out components from return statement.
*/
export default function Person(props) {
    const { personID } = useParams();
    const { loggedIn } = props;
    const [roles, setRoles] = useState([]);
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate();
    const [person, setPerson] = useState({
        name: "",
        birthYear: null,
        deathYear: null,
        roles: []
    });
    const columns = [
        { headerName: "Role", field: "category", width: "125px", sortable: true },
        { headerName: "Movie", field: "movieName", width: "300px", sortable: true, autoHeight: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
        { headerName: "Characters", field: "characters", width: "125px", sortable: true },
        { headerName: "IMDB Score", field: "imdbRating", width: "80px", sortable: true },
    ];

    useEffect(() => {
        if (personID !== undefined && loggedIn) {
            FetchPerson(personID)
                .then((person) => {
                    setPerson(person);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [personID]);

    useEffect(() => {
        if (person.roles.length > 0) {
            setRoles(person.roles);
            const ratings = roles.map(role => role.imdbRating);
            setRatings(ratings);
        }
    }, [person]);

    return (
        <div>
            {loggedIn ? (
                <>
                    <div>
                        <div className="movie-organize">
                            <div className="movies-container">
                                <div className="movies-info">
                                    <h1> {person.name} </h1>
                                    <h3> {person.birthYear} - {person.deathYear} </h3>
                                    <div className="movies-table">
                                        <AgGridReact
                                            className="ag-theme-balham"
                                            columnDefs={columns}
                                            rowData={roles}
                                            pagination={true}
                                            paginationPageSize={10}
                                            domLayout="autoHeight"
                                            onRowClicked={(row) => {
                                                navigate(`/movies/${row.data.movieId}`);
                                            }}
                                            suppressBrowserResizeObserver={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="movie-organize">
                            <div className="movies-container">
                                <div className="movies-info">
                                    <h2> {person.name}'s IMDB ratings </h2>
                                    <BarChart ratings={ratings} />
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop:"150px"}} />
                    </div>
                </>
            ) : (
                <>
                    <Prompt />
                </>
            )}
        </div >
    )
}
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "reactstrap";

/**
 * Movies page for the web-application. Populated by substring from SearchBar.
 * Generates a table populated with movies matching query substring.
 * 
 * @param {Object} props query, year, rowData, setRowData, loggedIn, pagination, setPagination
 * @returns React component for the movies page.
 * @todo Implement infinite scrolling for the AgGridReact table.
*/
export default function Movies(props) {
  const { query, year, rowData, setRowData, loggedIn, pagination, setPagination } = props;
  const [forceUpdate, setForceUpdate] = useState(false);
  const [lastPage, setLastPage] = useState(pagination.lastPage);
  const [total, setTotal] = useState(pagination.total);
  const navigate = useNavigate();
  const paginationPageSize = 100;

  const columns = [
    { headerName: "Title", field: "title", width: "300px", autoHeight: true, cellStyle: { whiteSpace: "normal", wrapText: true } },
    { headerName: "Year", field: "year", width: "100px" },
    { headerName: "IMDB score", field: "imdbRating", width: "100px" },
    { headerName: "RottenTomatoes", field: "rottenTomatoesRating", width: "130px" },
    { headerName: "Metacritic", field: "metacriticRating", width: "100px" },
    { headerName: "Rated", field: "classification", width: "100px" }
  ];

  const defaultColDef = {
    sortable: true
  };

  useEffect(() => {
    setForceUpdate((prev) => !prev);
  }, [rowData]);

  useEffect(() => {
    setTotal(pagination.total);
    setLastPage(pagination.lastPage);
  }, [pagination]);

  return (
    <div className="movies-container">
      <div className="movies-info">
        {query !== "" ?
          <h1>Movies matching "{query}" for {year === "" ? "All" : year}</h1>
          : <h1>Enter a movie title to search</h1>
        }
        <p>
          <Badge color="success">{total}</Badge> results found
        </p>
        <div className="movies-table">
          <AgGridReact
            className="ag-theme-balham"
            columnDefs={columns}
            defaultColDef={defaultColDef}
            rowData={rowData}
            //rowModelType='infinite'
            pagination={true}
            paginationPageSize={10}
            domLayout="autoHeight"
            forceUpdate={forceUpdate}

            onRowClicked={(row) => {
              navigate(`/movies/${row.data.imdbID}`);
            }}
          ></AgGridReact>
        </div>
      </div>
      <div style={{ paddingTop:"150px"}} />
    </div>
  );
}
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

  const onGridReady = (params) => {
    const gridApi = params.api;
    const dataSource = {
      rowCount: null,
      getRows: (params) => {
        // params contains information about the requested rows
        // such as startRow, endRow, and sort/model information
  
        // Here, you can make an API call or fetch data from your data source
        // based on the requested rows
  
        // Once you have the data, you can update the rowData state using setRowData
        // For example:
        // fetchRowsFromAPI(params.startRow, params.endRow)
        //   .then((newData) => {
        //     setRowData([...rowData, ...newData]);
        //     params.successCallback(newData, totalCount);
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //     params.failCallback();
        //   });
  
        // After updating the rowData state, you need to call params.successCallback
        // to let the grid know that the data has been successfully fetched
        // and it can continue rendering the requested rows
  
        // In this example, I'll just call the successCallback with empty data
        params.successCallback([], 0);
      },
    };
  
    // Set the grid's datasource to the infinite scrolling data source
    gridApi.setDatasource(dataSource);
  };

  const defaultColDef = {
    sortable: true
  };

  const gridOptions = {
    className: "ag-theme-balham",
    columnDefs: {columns},
    defaultColDef: {defaultColDef},
    rowModelType: 'infinite',
    paginationPageSize: paginationPageSize,
    paginationAutoPageSize: true,
    cacheBlockSize: paginationPageSize,
    onGridReady: onGridReady,
    maxBlocksInCache: 6,
    domLayout: "autoHeight",
    forceUpdate: {forceUpdate},
    suppressBrowserResizeObserver: true,
  }

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
            gridOptions={gridOptions}
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
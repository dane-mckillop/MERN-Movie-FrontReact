import "../styles.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
// components
import Header from "./Header";
import Footer from "./Footer";
import useInterval from '../useInterval';
import RefreshUser from "../api/RefreshUser";
import LogoutUser from "../api/LogoutUser";
// pages
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import Movie from "../pages/Movie";
import Person from "../pages/Person";
import Login from "../pages/Login";
import Register from "../pages/Register";

/**
  Movies can be searched for by name(substring) or year(int),
  after a user has logged in. A user may login after they register.
  
  A Movie can be found through the Movies page by searching for
  movies then selecting from an individual movie from results. 
  
  A Person may be found by selecting them from an individual
  movie's results.
*/
export default function App() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("");
  const [rowData, setRowData] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setContainerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerWidth]);

  //Too much instability if logged in between sessions.
  useEffect(() => {
    if (loggedIn) {
      setLoggedIn(false);
      LogoutUser();
    }
  }, []);

  useEffect(() => {
    console.log(pagination);
  }, [pagination])

  useInterval(() => {
    if (loggedIn) {
      try {
        RefreshUser();
        console.log("User Session Refreshed.");
      } catch (error) {
        console.error(error);
        LogoutUser();
      }
    }
  }, 559000);

  useInterval(() => {
    console.log("Token has expired.");
    if (loggedIn) {
      try {
        LogoutUser();
        setLoggedIn(false);
        window.alert("Session expired. Please login again.");
      } catch (error) {
        console.error(error);
      }
    }
  }, 83995000);

  return (
    <BrowserRouter>
      <div className="App">
        <Header query={query} setQuery={setQuery} year={year} setYear={setYear} setRowData={setRowData}
          loggedIn={loggedIn} setLoggedIn={setLoggedIn} setPagination={setPagination}
        />
        {/* the content */}
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/movies" element={<Movies query={query} year={year} rowData={rowData} setRowData={setRowData}
            loggedIn={loggedIn} pagination={pagination} setPagination={setPagination} />}
          />
          <Route path="/movies/:imdbID" element={<Movie />} />
          <Route path="/person/:personID" element={<Person loggedIn={loggedIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
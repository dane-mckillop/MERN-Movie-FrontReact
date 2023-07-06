import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LogoutUser from "../api/LogoutUser.js";

/**
 * Navbar component which displays different links depending whether logged in or out.
 * Logged in: Home, Movies, Login, Register
 * Logged out: Home, Movies, Logout, email(label)
 * 
 * @param {Object} props loggedIn, setLoggedIn
 * @returns {JSX.Element} A navbar component with links to Hom, Movies, Login, Register and Logout.
 */
export default function Nav(props) {
  const { loggedIn, setLoggedIn } = props;
  const [email, setEmail] = useState(localStorage.getItem("email"));
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
  }, [loggedIn])

  return (
    <nav>
      <button className="navbar-toggler-icon" onClick={toggleCollapse}>
        <img src="/img/hamburger-icon.png" alt=" - " />
      </button>
      <ul className={`collapse${isCollapsed ? "" : " show"}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        {loggedIn ? (
          <>
            <li><Link to="/" onClick={() => {
              LogoutUser();
              setLoggedIn(false);
            }}>Logout</Link></li>
            <li><p>{email}</p></li>
          </>
        ) : (
          <>
            <li><Link to="/login" >Login</Link></li>
            <li><Link to="/register" >Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
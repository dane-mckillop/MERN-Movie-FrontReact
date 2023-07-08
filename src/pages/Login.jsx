import React from "react";
import { Link } from "react-router-dom";
//components
import LoginWindow from "../components/LoginWindow.js"


/**
 * Login page for the web-application. Uses the LoginWindow component.
 * 
 * @param {Object} props loggedIn, setLoggedIn
 * @returns React component for the login page.
*/
export default function Login(props) {
  const { loggedIn, setLoggedIn } = props;

  return (
    <div>
      <div className="movie-organize">
        <div className="login-container">
          <h1> Login </h1>
          <LoginWindow loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </div>
      </div>
      <div className="login-register">
        <li><Link to="/register" className="register-link">
          Register here
        </Link></li>
      </div>
    </div>
  );
}
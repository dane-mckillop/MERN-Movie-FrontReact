import React from "react";
import { Link } from "react-router-dom";
//components
import RegisterWindow from "../components/RegisterWindow.js"

//Note: Login styling used as page layout is the same.
export default function Register(props) {
    const {email, setEmail} = props;

    return (
        <div>
            <div className="movie-organize">
                <div className="login-container">
                    <h1> Register </h1>
                    <RegisterWindow email={email} setEmail={setEmail} />
                </div>
            </div>
            <div className="login-register">
                <li><Link to="/login" className="register-link">
                    Login here
                </Link></li>
            </div>
        </div>
    );
}
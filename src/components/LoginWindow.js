import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoginUser from "../api/LoginUser.js";

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export default function LoginWindow(props) {
    const { loggedIn, setLoggedIn } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submit, setSubmit] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && (event.target === emailInputRef.current || event.target === passwordInputRef.current)) {
            if (email === "" || password === "") {
                window.alert("Email or password cannot be blank");
            } else if (validateEmail(email)) {
                setSubmit(!submit);
            } else {
                window.alert("Ensure email is valid. Valid example is 'username@domain.com'");
            }
        }
    };

    useEffect(() => {
        if (isMounted) {
            {
                setLoading(true);
                LoginUser(email, password)
                    .then(() => {
                        if (!!localStorage.getItem('token')) {
                            setLoading(false);
                            setLoggedIn(true);
                        }
                    })
                    .catch((error) => {
                        console.log(error.message);
                        window.alert("Login failed. Ensure correct details or register.");
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }
        } else {
            setMounted(true);
        }
    }, [submit]);

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn])

    return (
        <div className="login-window">
            <div className="login-content">
                <div className="login-text">
                    <p style={{ marginTop: "4px" }}> Email:&nbsp; </p>
                    <p> Password:&nbsp; </p>
                </div>
                <div className="login-search">
                    <input
                        name="login-email"
                        id="login-email"
                        type="search"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={emailInputRef}
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        name="search"
                        id="login-password"
                        type="login-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={passwordInputRef}
                    />
                </div>
            </div>
            {loading ? (
                <p>Validating...</p>
            ) : (
                <button
                    className="search-button"
                    onClick={() => {
                        if (email === "" || password === "") {
                            window.alert("Email or password cannot be blank");
                        } else if (validateEmail(email)) {
                            setSubmit(!submit);
                        } else {
                            window.alert("Ensure email is valid. Valid example is 'username@domain.com'");
                        }
                    }}>
                    Submit
                </button>
            )}
        </div>
    )
}
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import RegisterUser from "../api/RegisterUser.js";

/*
 * Checks if the provided email is of the valid format.
*/
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Generates the registration window, where the user can input email, password, and confirm password.
 * After submission, the form will validate while sending off to the backend.
 * 
 * @todo Refactor logic out into functions, and refactor return into a component.
 * @returns {JSX.Element} A registration window component with email, password, and confirm password input fields, validation logic, and a submit button.
 * @usedIn Register
*/
export default function RegisterWindow() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [submit, setSubmit] = useState(false);
    const [isMounted, setMounted] = useState(false);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const confirmInputRef = useRef(null)
    const navigate = useNavigate();
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && (event.target === emailInputRef.current || event.target === passwordInputRef.current || event.target === confirmInputRef.current )) {
            if (email === "" || password === "" || confirm === "") {
                window.alert("Fields cannot be blank");
            } else if (validateEmail(email)) {
                setSubmit(!submit);
            } else if (password !== confirm) {
                window.alert("Passwords provided don't match.");
            } else {
                window.alert("Ensure email is valid. Valid example is 'username@domain.com'");
            }
        }
    };

    useEffect(() => {
        if (isMounted) {
            {
                RegisterUser(email, password);
                navigate("/login");
            }
        } else {
            setMounted(true);
        }
    }, [submit]);

    return (
        <div className="login-window">
            <div className="login-content">
                <div className="login-text">
                    <p style={{ marginTop: "4px" }}> Email:&nbsp; </p>
                    <p> Password:&nbsp; </p>
                    <p> Confirm:&nbsp; </p>
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
                        style={{ marginBottom: "10px" }}
                    />
                    <input
                        name="search"
                        id="login-confirm"
                        type="login-confirm"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        onKeyDown={handleKeyDown}
                        ref={confirmInputRef}
                    />
                </div>
            </div>
            <button
                className="search-button"
                onClick={() => {
                    if (email === "" || password === "" || confirm === "") {
                        window.alert("Fields cannot be blank");
                    } else if (validateEmail(email)) {
                        setSubmit(!submit);
                    } else {
                        window.alert("Ensure email is valid. Valid example is 'username@domain.com'");
                    }
                }}>
                Submit </button>
        </div>
    )
}
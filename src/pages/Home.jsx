import React, { useState, useEffect } from "react";
import Hero from "../components/Hero.js";

/**
 * Home page for the web-application. 
 * Note: Should separate Hero component out.
 * 
 * @param {Object} props loggedIn, setLoggedIn
 * @returns React component for the home page.
*/
export default function Home(props) {
  const { loggedIn, setLoggedIn } = props;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) {
      setEmail(localStorage.getItem("email"));
    }
  }, [loggedIn])

  return (
    <main>
      <Hero loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </main>
  );
}
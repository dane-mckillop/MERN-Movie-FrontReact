import { Link } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import LogoutUser from "../api/LogoutUser.js";


export default function Home(props) {
  const { loggedIn, setLoggedIn } = props;
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (loggedIn) {
      setEmail(localStorage.getItem("email"));
    }
  }, [loggedIn])

  // hero content
  const Hero = (props) => (
    <section className="hero">
      {/* content for the hero */}
      <div className="hero__content">
        <h1 className="hero__title">Dane Mckillop's<br />Movie Search</h1>
        {
          loggedIn ? (
            <>
              <Link to="/" onClick={() => {
                LogoutUser();
                setLoggedIn(false);
              }}>Logout</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Register</Link>
            </>
          )
        }
      </div>
    </section>
  );

  return (
    <main>
      <Hero loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
    </main>
  );
}
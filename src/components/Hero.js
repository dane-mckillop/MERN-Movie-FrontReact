import { Link } from "react-router-dom";
import LogoutUser from "../api/LogoutUser.js";

export default function Hero(props) {
    const { loggedIn, setLoggedIn } = props;

    return (
        <section className="hero">
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
    )
};
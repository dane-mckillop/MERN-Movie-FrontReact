import { Link } from "react-router-dom";

/**
 * Hero content for the home page. Includes log in and register links.
 * 
 * @returns {JSX.Element} Hero content component with links to login and registration.
 */
export default function Prompt() {

    return (
        <div className="hero">
            <div className="hero__content">
                <h1 className="hero__title">Please login to view</h1>
                <Link to="/login">Log In</Link>
                <Link to="/register">Register</Link>
            </div>
            <div style={{ paddingTop:"150px"}} />
        </div>
    )
}
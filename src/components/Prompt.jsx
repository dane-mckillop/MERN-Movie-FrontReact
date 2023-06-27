import { Link } from "react-router-dom";

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
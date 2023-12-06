import { Link } from "react-router-dom";
const Nav = () => {
    return (
        <div className="nav">
            <div className="button-container-nav" spacing={3} direction={"row"}>
                <Link className="nav-link" to="/">
                    Welcome
                </Link>
                <Link className="nav-link" to="/goals/:userEmail">
                    My Goals
                </Link>
                <Link className="nav-link" to="/freetime">
                    Free Time
                </Link>
                <Link className="nav-link" to="/signup">
                    Sign Up
                </Link>
                <Link className="nav-link" to="/login">
                    Login
                </Link>
            </div>
        </div>
    );
};
export default Nav;
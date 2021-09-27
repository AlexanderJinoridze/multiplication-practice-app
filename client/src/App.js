import React from "react";
import useRoutes from "./routes";
import { Link } from "react-router-dom";

export default function App() {
    const routes = useRoutes(true);

    return (
        <div>
            {/* <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/account/login">Log in</Link></li>
                    <li><Link to="/practice">Practice</Link></li>
                    <li><Link to="/privacy-policy">Privacy policy</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/account/registration">Registration</Link></li>
                    <li><Link to="/statistics">Statistics</Link></li>
                    <li><Link to="/terms-of-service">Terms of service</Link></li>
                    <li><Link to="/tips">Tips</Link></li>
                </ul>
            </nav> */}
            { routes }
        </div>
    );
}

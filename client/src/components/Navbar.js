import React from "react";
import { Link } from "react-router-dom";
import LightToggle from "./LightToggle";

export default function Navbar() {
    return(
        <nav>
            <div>
                <h1 className="text-2xl">Logo Placeholder</h1>
            </div>
            <div>
                <Link to="/account/login" className="btn btn-link mr-4">Log in</Link>
                <Link to="/account/registration" className="btn btn-link">Sign up</Link>

                <LightToggle attribute={{ className: "btn btn-primary ml-6" }} content={{ dark: "Dark mode is on", light: "Light mode is on" }} />
            </div>
        </nav>
    );
}
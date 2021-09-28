import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    return(
        <nav>
            <div>
                <h1 className="text-2xl">Logo Placeholder</h1>
            </div>
            <div>
                <Link to="/account/login">Log in</Link>
                <span> | </span>
                <Link to="/account/registration">Registration</Link>
                <button></button>
            </div>
        </nav>
    );
}
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LightToggle from "./LightToggle";

export default function Navbar() {
    const { logout, isAuthenticated } = useContext(AuthContext);

    return(
        <nav>
            <div id="logo">
                <Link to="/"><h1 className="text-2xl">Logo Placeholder</h1></Link>
            </div>
            <div className="flex items-center">
                {
                    !isAuthenticated
                    &&
                    <>
                        <Link to="/account/login" className="btn btn-link mr-4">Log in</Link>
                        <Link to="/account/registration" className="btn btn-link">Sign up</Link>
                    </>
                }
                {
                    isAuthenticated
                    &&
                    <>
                        <Link to="/dashboard" className="btn btn-link mr-4">Dashboard</Link>
                        <button onClick={ logout } className="btn btn-danger">Log out</button>
                    </>
                }
                <LightToggle attribute={{ className: "btn btn-primary btn-square ml-6" }} content={{ dark: <i className="icon-day"></i>, light: <i className="icon-night"></i> }} />
            </div>
        </nav>
    );
}
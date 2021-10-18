import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import LightToggle from "./LightToggle";

export default function Navbar() {
    const { logout, isAuthenticated } = useContext(AuthContext);
    const history = useHistory();

    return(
        <nav>
            <div>
                <Link to="/" className="logo"><h1 className="text-2xl">Logo Placeholder</h1></Link>
            </div>
            <div className="flex items-center">
                {
                    !isAuthenticated
                    &&
                    <>
                        <Link to="/account/login" className="btn-small btn-theme-link mr-4">Log in</Link>
                        <Link to="/account/registration" className="btn-small btn-theme-link">Sign up</Link>
                    </>
                }
                {
                    isAuthenticated
                    &&
                    <>
                        <Link to="/dashboard" className="btn-small btn-theme-link mr-4">Dashboard</Link>
                        <button onClick={ ()=>{ logout(); history.push("/"); } } className="btn-small btn-theme-danger">Log out</button>
                    </>
                }
                <LightToggle attribute={{ className: "btn-square btn-theme-primary ml-6" }} content={{ dark: <i className="icon-day"></i>, light: <i className="icon-night"></i> }} />
            </div>
        </nav>
    );
}
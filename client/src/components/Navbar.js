import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import LightToggle from "./LightToggle";
import Logo from "./Logo";

export default function Navbar() {
    const { logout, isAuthenticated } = useContext(AuthContext);
    const history = useHistory();

    return(
        <nav>
            <Logo classes="mb-4 sm:mb-0" />
            <div className="flex items-center">
                {
                    !isAuthenticated
                    &&
                    <>
                        <Link to="/account/login" className="btn-small btn-theme-link mr-4 whitespace-nowrap">Log in</Link>
                        <Link to="/account/registration" className="btn-small btn-theme-link whitespace-nowrap">Sign up</Link>
                    </>
                }
                {
                    isAuthenticated
                    &&
                    <>
                        <Link to="/dashboard" className="btn-small btn-theme-link mr-4">Dashboard</Link>
                        <button onClick={ ()=>{ logout(); history.push("/"); } } className="btn-square btn-theme-danger"><i className="icon-logout"></i></button>
                    </>
                }
                <LightToggle attribute={{ className: "btn-square btn-theme-primary ml-4" }} content={{ dark: <i className="icon-day"></i>, light: <i className="icon-night"></i> }} />
            </div>
        </nav>
    );
}
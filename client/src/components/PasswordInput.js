import React, { useState } from "react";

export default function Navbar(props) {
    const [passwordType, setPasswordType] = useState("password");

    const toggleShowPassword = (e) => {
        e.preventDefault();
        if(passwordType === "password") {
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    }

    return(
        <div className="relative">
            <button className="btn btn-input" onClick={ toggleShowPassword }>{ passwordType === "password"? <i className="icon-eye"></i> : <i className="icon-eye-slash"></i> }</button>
            <input type={ passwordType } { ...props } />
        </div>
    );
}
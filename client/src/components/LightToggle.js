import React, { useContext } from "react";
import { LightToggleContext } from "../context/LightToggleContext";

export default function LightToggle(props) {
    let { isDark, setLightMod, setDarkMod } = useContext(LightToggleContext);

    return(
        <button { ...props.attribute } onClick={ () => isDark? setLightMod() : setDarkMod() }>{ isDark? props.content.dark : props.content.light }</button>
    );
}
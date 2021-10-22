import { createContext } from "react";

function noop() {}

export const LightToggleContext = createContext({
    isDark: null,
    setLightMod: noop,
    setNightMod: noop
});
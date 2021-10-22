import { useCallback, useState } from "react";

export const useLightToggle = () => {
    const [isDark, setIsDark] = useState(document.documentElement.classList.contains("dark"));

    const setLightMod = useCallback(() => {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark");
        setIsDark(false);
    }, []);

    const setDarkMod = useCallback(() => {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
        setIsDark(true);
    }, []);

    return { isDark, setLightMod, setDarkMod }
}
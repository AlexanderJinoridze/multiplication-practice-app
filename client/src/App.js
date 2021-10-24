import React from "react";
import useRoutes from "./routes";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import { LightToggleContext } from "./context/LightToggleContext";
import { useLightToggle } from "./hooks/lighttoggle.hook";
import Loader from "./components/Loader";

export default function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const { isDark, setLightMod, setDarkMod } = useLightToggle();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <LightToggleContext.Provider value={{ isDark, setLightMod, setDarkMod }}>
            <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated }}>
                <div className="page">
                    { routes }
                    <Toaster
                        position="bottom-right"
                        reverseOrder={false}
                    />
                </div>
            </AuthContext.Provider>
        </LightToggleContext.Provider>
    );
}

import React from "react";
import useRoutes from "./routes";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";
import Loader from "./components/Loader";

export default function App() {
    const { token, login, logout, userId, ready } = useAuth();
    const isAuthenticated = !!token;
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, login, logout, userId, isAuthenticated
        }}>
            <div>
                { routes }
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
            </div>
        </AuthContext.Provider>
    );
}

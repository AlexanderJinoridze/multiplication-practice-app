import { useState, useCallback, useEffect } from "react";
import Cookies from "js-cookie";

const storageName = "userData";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [ready, setReady] = useState(false);
    const [userId, setUserId] = useState(null);

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);


        Cookies.set(storageName, JSON.stringify({
            userId: id,
            token: jwtToken
        }), {
            expires: 1/24
        });
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        Cookies.remove(storageName);
    }, []);

    useEffect(() => {
        //const data = JSON.parse(localStorage.getItem(storageName));
        const data = JSON.parse(Cookies.get(storageName) || "{}");

        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(true);
    }, [login])

    return { login, logout, token, userId, ready }
}
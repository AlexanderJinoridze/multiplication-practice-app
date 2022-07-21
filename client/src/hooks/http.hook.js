import { useState, useCallback } from "react";
import Cookies from "js-cookie";

export default function useHttp() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = "GET", body = null, headers = {}) => {
        setLoading(true);
        try {
            if (body) {
                body = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            }

            const response = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok) {
                throw data;
            }

            setLoading(false);

            return data;
        } catch (e) {
            if(e.message === "No authorization"){
                Cookies.remove("userData");
            }

            setLoading(false);
            setError(e.message);
            throw e;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
}
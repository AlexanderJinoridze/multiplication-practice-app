import React, { useCallback, useContext, useEffect, useState } from "react";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";


export default function DashboardPage() {
    const [username, setUsername] = useState("");

    const { loading, request } = useHttp();
    const { token, userId } = useContext(AuthContext);

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/user/${ userId }`, "GET", null, {
                Authorization: `Bearer ${ token }`
            });
            setUsername(fetched.username);
        } catch(e) {}
    }, [token, userId, request]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if(loading) {
        return <Loader />
    }

    return(
        <>
        {!loading && <div>
            <h1>Dashboard</h1>
            <span>{ username }</span>
        </div>}
        </>
    );
}
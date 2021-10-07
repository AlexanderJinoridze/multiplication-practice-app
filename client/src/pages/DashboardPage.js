import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";
import useHttp from "../hooks/http.hook";
import toast from 'react-hot-toast';


export default function DashboardPage() {
    const [userData, setUserData] = useState({usename: "", email: ""});

    const { loading, request } = useHttp();
    const { token, userId, logout } = useContext(AuthContext);

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/user/${ userId }`, "GET", null, {
                Authorization: `Bearer ${ token }`
            });
            setUserData({ username: fetched.username, email: fetched.email });
        } catch(e) {}
    }, [token, userId, request]);

    const deleteUser = useCallback(async () => {
        try {
            const data = await request(`/api/user/delete/${ userId }`, "DELETE", null, {
                Authorization: `Bearer ${ token }`
            });
            logout();
            toast.success(data.message);
        } catch(e) {}
    }, [token, userId, request, logout]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if(loading) {
        return <Loader />
    }

    return(
        <>
        {!loading
        &&
        <div id="page">
            <Navbar />
            <main className="container flex flex-col justify-center items-center text-center max-w-4xl">
                <h2 className="mb-2">Welcome <b>{ userData.username }</b></h2>
                <h5>Your email is <i>{ userData.email }</i></h5>
                <div className="flex mt-8 justify-center">
                    <Link className="btn btn-primary mx-2" to="/practice">Practice</Link>
                    <Link className="btn btn-primary mx-2" to="/tips">Tips & Tricks</Link>
                    <Link className="btn btn-primary mx-2" to="/statistics">Statistics</Link>
                </div>
                <div className="flex flex-col items-center mt-32">
                    <span>Want to permanemtly delete your account and progress?</span>
                    <button onClick={ deleteUser } className="btn btn-danger mt-4 flex flex-row items-center"><i className="icon-trash mr-2"></i>Delete account<div className="loader"></div></button>
                </div>
            </main>
            <Footer />
        </div>
        }
        </>
    );
}
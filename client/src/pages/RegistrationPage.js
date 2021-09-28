import React from "react";
import { Link } from "react-router-dom";

export default function RegistrationPage() {
    return(
        <div className="w-96 mx-auto">
            <h1 className="text-3xl mb-10 mt-24 text-center">Create your account</h1>
            <div className="mb-4">
                <label htmlFor="name">
                    <span>Username</span>
                    <input type="text" />
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="name">
                    <span>E-mail</span>
                    <input type="text" />
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="name">
                    <span>Password</span>
                    <input type="password" />
                </label>
            </div>
            <div className="mb-4">
                <label htmlFor="name">
                    <span>Confirm password</span>
                    <input type="password" />
                </label>
            </div>
            <div className="flex items-center mb-10">
                <input type="checkbox" name="accept" className="mr-3" />
                <span>I accept the <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> and <br /> the <Link to="/terms-of-service" target="_blank">Terms of Service</Link></span>
            </div>
            <div className="flex items-center mb-10">
                <button className="bg-yellow-500 hover:bg-yellow-300 text-gray-900 block py-3 px-8 mr-5 rounded-xl">Sign up</button>
                <span>Have an account? <Link to="/account/login">Log in now</Link></span>
            </div>
        </div>
    );
}
import React from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";

export default function RegistrationPage() {
    return(
        <div className="w-96 mx-auto">
            <h1 className="text-3xl mb-10 mt-24 text-center">Create your account</h1>
            <form action="">
                <div className="mb-4">
                    <label htmlFor="username">
                        <span>Username</span>
                        <input type="text" name="username" id="username" />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="email">
                        <span>E-mail</span>
                        <input type="text" name="email" id="email" />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="password">
                        <span>Password</span>
                        <PasswordInput name="password" id="password" />
                    </label>
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword">
                        <span>Confirm password</span>
                        <PasswordInput name="confirmPassword" id="confirmPassword" />
                    </label>
                </div>
                <div className="flex items-center mb-10">
                    <input type="checkbox" name="terms" className="mr-3" />
                    <span>I accept the <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> and <br /> the <Link to="/terms-of-service" target="_blank">Terms of Service</Link></span>
                </div>
                <div className="flex items-center mb-10">
                    <input type="submit" name="submit" value="Sign up" className="btn btn-primary mr-6" />
                    <span>Have an account? <Link to="/account/login">Log in now</Link></span>
                </div>
            </form>
        </div>
    );
}
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import useHttp from "../hooks/http.hook";

export default function RegistrationPage() {
    const validationTests = {
        username: (value)=>!!value.trim(),
        email: (value)=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
        password: (value)=>/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value.trim()),
        confirmPassword: (value)=>value.trim()===body.password.trim(),
        terms: (value)=>!!value
    };

    const { loading, error, request, clearError } = useHttp();

    const [startValidation, setStartValidation] = useState(false);
    const [showPasswordGuide, setShowPasswordGuide] = useState(false);
    const [body, setBody] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false
    });
    const [errors, setErrors] = useState({
        username: { msg: "Invalid username", isInvalid: false },
        email: { msg: "Invalid email syntax", isInvalid: false },
        password: { msg: "Password should have minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number, password must contain only Latin letters and numbers", isInvalid: false },
        confirmPassword: { msg: "Passwords must be same", isInvalid: false },
        terms: { msg: "You have to accept terms of service and privacy policy to sign up", isInvalid: false }
    });

    const registerHandler = async (e) => {
        e.preventDefault();
        try{
            const data = await request("/api/auth/register", "POST", { ...body });
            setBody({
                username: "",
                email: "",
                password: "",
                confirmPassword: "",
                terms: false
            });
        } catch (e) {
            setStartValidation(true);
            setShowPasswordGuide(false)
            setErrors((prev)=>{
                let res = { ...prev };
                e.errors.forEach(element => {
                    res[element.param].msg = element.msg;
                    res[element.param].isInvalid = true;
                });
                return res;
            });
        }
    }

    const handleChange = (e) => {
        setBody((prev)=>{
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    useEffect(()=>{
        if(!startValidation) {
            setShowPasswordGuide(!!body.password.length)
        }
        Object.keys(errors).forEach(key => {
            if(startValidation) {
                setErrors((prev)=>{
                    return { ...prev, [key]: { ...prev[key], isInvalid: !validationTests[key](body[key]) } }
                });
            }
        });
    },[body])

    return(
        <div id="page">
            <main>
                <div className="w-96 mx-auto">
                    <h3 className="mb-10 text-center">Create your account</h3>
                    <form action="" onSubmit={ registerHandler }>
                        <div className="mb-4">
                            <label htmlFor="username">
                                <span>Username</span>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    maxlength="256"
                                    value={ body.username }
                                    className={ errors.username.isInvalid? "error" : "" }
                                    onChange={ handleChange }
                                />
                                { errors.username.isInvalid && <span className="error-message">{ errors.username.msg }</span> }
                            </label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email">
                                <span>E-mail</span>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    maxlength="320"
                                    value={ body.email }
                                    className={ errors.email.isInvalid? "error" : "" }
                                    onChange={ handleChange }
                                />
                                { errors.email.isInvalid && <span className="error-message">{ errors.email.msg }</span> }
                            </label>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password">
                                <span>Password</span>
                                <PasswordInput
                                    name="password"
                                    id="password"
                                    maxlength="128"
                                    value={ body.password }
                                    className={ errors.password.isInvalid? "error" : "" }
                                    onChange={ handleChange }
                                />
                                {showPasswordGuide || errors.password.isInvalid && <div className={showPasswordGuide && "text-white bg-blue-600 rounded-lg px-5 py-3 inline-block mt-2" || errors.password.isInvalid && "error-message"}>
                                    <span>Password should have:</span>
                                    <ul className="p-0 mt-1 ml-6">
                                        <li>Minimum 8 characters</li>
                                        <li>At least 1 uppercase letter, 1 lowercase letter and 1 number</li>
                                        <li>Password must contain only Latin letters and numbers</li>
                                    </ul>
                                </div>}
                            </label>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="confirmPassword">
                                <span>Confirm password</span>
                                <PasswordInput
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    maxlength="128"
                                    value={ body.confirmPassword }
                                    className={ errors.confirmPassword.isInvalid? "error":"" }
                                    onChange={ handleChange }
                                />
                                { errors.confirmPassword.isInvalid && <span className="error-message">{ errors.confirmPassword.msg }</span> }
                            </label>
                        </div>
                        <div className="mb-10">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    id="terms"
                                    defaultChecked={ body.terms }
                                    onChange={ (e)=>setBody((prev)=>{
                                        return { ...prev, terms: !body.terms }
                                    }) }
                                />
                                <label for="terms" className="mr-3"></label>
                                <span>I accept the <Link to="/privacy-policy" target="_blank">Privacy Policy</Link> and <br /> the <Link to="/terms-of-service" target="_blank">Terms of Service</Link></span>
                            </div>
                            { errors.terms.isInvalid && <span className="error-message">{ errors.terms.msg }</span> }
                        </div>
                        <div className="flex items-center">
                            <div className={`submit-container mr-6 ${ loading? "loading" : ""}`}>
                                <input
                                    type="submit"
                                    name="submit"
                                    disabled={ loading }
                                    value="Sign up"
                                    className="btn btn-primary"
                                />
                                <div className="loader"></div>
                            </div>
                            <span>Have an account? <Link to="/account/login">Log in now</Link></span>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
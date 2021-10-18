import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import useHttp from "../hooks/http.hook";
import toast from 'react-hot-toast';
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {

    const validationTests = {
        email: (value)=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.trim()),
        password: (value)=>!!value.trim()
    };

    const auth = useContext(AuthContext);
    const { loading, request } = useHttp();

    const [startValidation, setStartValidation] = useState(false);
    const [body, setBody] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({
        email: { msg: "Invalid email syntax", isInvalid: false },
        password: { msg: "Enter password", isInvalid: false }
    });

    const loginHandler = async (event) => {
        event.preventDefault();
        try{
            const data = await request("/api/auth/login", "POST", { ...body });
            auth.login(data.token, data.userId);
        } catch (e) {
            if(e.errors) {
                setStartValidation(true);
                setErrors((prev)=>{
                    let newErrorState = { ...prev };
                    e.errors.forEach(element => {
                        const currentField = newErrorState[element.param];
                        currentField.msg = element.msg;
                        currentField.isInvalid = true;
                    });
                    return newErrorState;
                });
            } else {
                setStartValidation(false);
            }
            toast.error(e.message);
        }

        setBody({
            email: "",
            password: ""
        });
    }

    const handleChange = (e) => {
        setBody((prev)=>{
            return { ...prev, [e.target.name]: e.target.value }
        });
    }

    useEffect(()=>{
        if(startValidation) {
            Object.keys(errors).forEach(key => {
                if(startValidation) {
                    setErrors((prev)=>{
                        return { ...prev, [key]: { ...prev[key], isInvalid: !validationTests[key](body[key]) } }
                    });
                }
            });
        }
    },[body]);

    return(
        <div className="page">
            <main>
                <div className="w-96 mx-auto">
                    <h3 className="mb-10 text-center">Log in</h3>
                    <form action="" onSubmit={ loginHandler }>
                        <div className="mb-4">
                            <label htmlFor="email">
                                <span>E-mail</span>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    maxLength="320"
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
                                    maxLength="128"
                                    value={ body.password }
                                    className={ errors.password.isInvalid? "error" : "" }
                                    onChange={ handleChange }
                                />
                                { errors.password.isInvalid && <span className="error-message">{ errors.password.msg }</span> }
                            </label>
                        </div>
                        <div className="flex items-center mt-10">
                            <div className={`submit-container mr-4 ${ loading? "loading" : ""}`}>
                                <input
                                    type="submit"
                                    name="submit"
                                    disabled={ loading }
                                    value="Log in"
                                    className="btn-small btn-theme-primary"
                                />
                                <div className="loader"></div>
                            </div>
                            <span>Don't have an account? <Link to="/account/registration">Sign Up</Link></span>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
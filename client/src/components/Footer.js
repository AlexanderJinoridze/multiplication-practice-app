import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <footer className="text-center p-9">
            <span>Copyright &copy; Art of Multiplication {new Date().getFullYear()}, Check out <Link to="/terms-of-service">Terms of Service</Link> and <Link to="/privacy-policy">Privacy Policy</Link></span>
        </footer>
    );
}
import React from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function NoMatchPage() {
    return(
        <div className="page">
            <main className="max-w-4xl text-center justify-center">
                <h1 className="mb-4">404 - Page not found</h1>
                <span>Oops... it seems the page you are looking for doesn't exists</span>
                <Link to="/" className="btn-small btn-theme-primary mt-12 self-center">Return Home</Link>
            </main>
            <Footer />
        </div>
    );
}
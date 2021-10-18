import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HomepagePage() {
    return(
        <div className="page">
            <Navbar />
            <main className="page-main container flex flex-col items-center text-center max-w-4xl">
                <h2 className="font-display mb-4">Art of Multiplication</h2>
                <h4 className="font-display mb-8 text-pale">Learn the multiplication table up to 20 with ease in just a few days,<br /> through practice and list of helpful tips & tricks</h4>
                <Link to="/practice" className="btn-big btn-theme-primary mb-4">Practice</Link>
                <Link to="/tips">List of useful Tips & Tricks to help you remember the multiplication table</Link>
            </main>
            <Footer />
        </div>
    );
}
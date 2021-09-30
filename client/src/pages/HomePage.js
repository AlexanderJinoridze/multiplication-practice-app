import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

export default function HomepagePage() {
    return(
        <div id="page">
            <Navbar />
            <main className="container flex flex-col items-center text-center max-w-4xl">
                <h2 className="display-font mb-4">Art of Multiplication</h2>
                <h4 className="display-font mb-8 text-gray-700 dark:text-gray-400">Learn the multiplication table up to 20 with ease in just a few days,<br /> through practice and list of helpful tips & tricks</h4>
                <Link to="/practice" className="btn btn-primary mb-4">Practice</Link>
                <Link to="/tips">List of useful Tips & Tricks to help you remember the multiplication table</Link>
            </main>
            <Footer />
        </div>
    );
}
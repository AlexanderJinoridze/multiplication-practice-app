import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Practice from "../components/Practice";
import PracticeSettings from "../components/PracticeSettings";
import { PracticeContext } from "../context/PracticeContext";

export default function PracticePage() {
    const [practiceState, setPracticeState] = useState("tuning-quiz");
    const [multiplicand, setMultiplicand] = useState([]);
    const [multiplicator, setMultiplicator] = useState([]);

    return(
        <>
            <Navbar />
            <main className="items-center container">
                <PracticeContext.Provider value={{
                    practiceState,
                    setPracticeState,
                    multiplicand,
                    setMultiplicand,
                    multiplicator,
                    setMultiplicator
                }}>
                    { practiceState === "tuning-quiz" && <PracticeSettings /> }
                    { practiceState === "quiz-page" && <Practice /> }
                </PracticeContext.Provider>
            </main>
            <Footer />
        </>
    );
}
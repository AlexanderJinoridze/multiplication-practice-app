import React, { useContext } from "react";
import toast from 'react-hot-toast';
import { PracticeContext } from "../context/PracticeContext";
import PracticeGroupSelection from "./PracticeGroupSelection";
import PracticeSelection from "./PracticeSelection";


export default function PracticeSettings() {
    const {
        setPracticeState,
        multiplicand,
        multiplicator
    } = useContext(PracticeContext);

    const startQuizHandler = () => {
        if(multiplicand.length && multiplicator.length){
            setPracticeState("quiz-page")
        } else {
            toast.error("Please select at least one number from each side");
        }
    }

    return(
        <div className="max-w-3xl w-full">
            <h2 className="text-center font-display">Practice settings</h2>
            <PracticeGroupSelection />
            <PracticeSelection />
            <div className="flex justify-center mt-12">
                <button className="btn-big btn-theme-primary" onClick={startQuizHandler}>Start Practicing</button>
            </div>
        </div>
    );
}
import React, { useContext } from "react";
import { PracticeContext } from "../context/PracticeContext";

export default function PracticeGroupSelection() {
    const {
        setMultiplicand,
        setMultiplicator
    } = useContext(PracticeContext);

    const clearSelection = (direction = "both") => {
        if(direction === "x" || direction === "both") {
            setMultiplicand([]);
        }

        if(direction === "y" || direction === "both") {
            setMultiplicator([]);
        }
    }

    const groupSelection = (direction = "both", start = 0, end = 20) => {
        if(start >= end) {
            throw new Error("start value must be less than a value of the end");
        }

        const delta = end - start;

        if(direction === "x" || direction === "both"){
            setMultiplicand(Array(delta).fill("").map((_,i)=>(i+1) + start));
        }

        if(direction === "y" || direction === "both") {
            setMultiplicator(Array(delta).fill("").map((_,i)=>(i+1) + start));
        }
    }

    return(
        <div className="group-select-panel">
            <div className="flex">
                <div className="btn-small btn-theme-danger" onClick={ ()=>clearSelection() }>Clear</div>
                <div className="btn-small btn-theme-primary" onClick={ ()=>groupSelection() }>Select all</div>
            </div>
            <div className="group-select-axis-panel">
                <div>
                    <div className="btn-small btn-theme-danger" onClick={ ()=>clearSelection("x") }>Clear by X axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("x", 0, 10) }>All 1 digits by X axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("x", 10) }>All 2 digits by X axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("x") }>Select all by X axis</div>
                </div>
                <div>
                    <div className="btn-small btn-theme-danger" onClick={ ()=>clearSelection("y") }>Clear by Y axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("y", 0, 10) }>All 1 digits by Y axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("y", 10) }>All 2 digits by Y axis</div>
                    <div className="btn-small btn-theme-link" onClick={ ()=>groupSelection("y") }>Select all by Y axis</div>
                </div>
            </div>
        </div>
    );
}

import React, { useContext, useState, useEffect } from "react";
import { PracticeContext } from "../context/PracticeContext";
import PracticeCheckbox from "./PracticeCheckbox";

export default function PracticeSelection() {
    const [smallSettingsBoard, setSmallSettingsBoard] = useState(window.innerWidth <= 768);

    const {
        multiplicand,
        multiplicator
    } = useContext(PracticeContext);

    const printGrid = () => {
        return Array(441).fill("").map((_, i) => {
            const remainder = i % 21;
            const x = remainder ;
            const y = ((i-remainder) / 21);
            let isSelected = false;
            let isRowSelected = false;
            let isEqual = false;

            if(multiplicand.includes(x) && multiplicator.includes(y)) {
                isSelected = true;
            }

            if(multiplicand.includes(x) || multiplicator.includes(y)) {
                isRowSelected = true;
            }

            if(x === y) {
                isEqual = true;
            }

            if(x === 0 && y === 0) {
                return(<div key={i}></div>)
            }

            if(x === 0) {
                return(
                    <PracticeCheckbox key={i} direction="y" id={ y } />
                );
            }

            if(y === 0) {
                return(
                    <PracticeCheckbox key={i} direction="x" id={ x } />
                );
            }

            return(
                <div key={i} className={ `multiplication-table-cell${ isSelected? " selected" : "" }${ isRowSelected? " row-selected" : "" }${ isEqual? " equal" : "" }` }>
                    <div>{ `${x*y}` }</div>
                </div>
            );
        })
    }

    const printColumn = (dir) => (
        Array(20).fill("").map((_, i) => {
            return(
                <PracticeCheckbox  key={i} direction={ dir } id={ i+1 } isMini={ smallSettingsBoard } />
            );
        })
    )

    const resize = () => { setSmallSettingsBoard(window.innerWidth <= 768) }

    useEffect(() => {
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
        }
    }, []);

    return(
        smallSettingsBoard? 
            <div className="mini-settings-panel">
                <div>{ printColumn("x") }</div>
                <h2 className="display-font text-5xl">x</h2>
                <div>{ printColumn("y") }</div>
            </div>
        :
            <div className="chart-outer-container">
                <div className="chart-inner-container flex flex-wrap">
                    { printGrid() }
                </div>
                <div className="chart-bg-map">
                    <svg viewBox="-690.5 93.5 500 500" xmlns="http://www.w3.org/2000/svg">
                        <path d="m-593.02 168.97h147.8c1.728 0 3.138 1.433 3.138 3.145v15.726c0 1.711-1.43 3.145-3.138 3.145h-147.81v147.8c0 1.705-1.437 3.145-3.142 3.145h-15.729c-1.704 0-3.141-1.417-3.141-3.145v-147.8h-72.331c-1.724 0-3.138-1.433-3.138-3.145v-15.726c0-1.715 1.43-3.145 3.138-3.145h72.331v-72.327c0-1.704 1.439-3.141 3.145-3.141h15.726c1.705 0 3.145 1.414 3.145 3.141v72.326z" fill="#f0f"/>
                        <path d="m-618.18 143.81h172.96c1.728 0 3.142 1.431 3.142 3.146v15.726c0 1.715-1.427 3.145-3.142 3.145h-172.96v172.96c0 1.709-1.437 3.145-3.142 3.145h-15.726c-1.708 0-3.145-1.417-3.145-3.145v-172.96h-47.175c-1.724 0-3.138-1.43-3.138-3.145v-15.726c0-1.715 1.427-3.146 3.138-3.146h47.175v-47.167c0-1.704 1.437-3.141 3.145-3.141h15.726c1.705 0 3.142 1.414 3.142 3.141v47.168z" fill="#3c9"/>
                        <path d="m-643.33 118.65h449.69c1.728 0 3.142 1.427 3.142 3.145v15.727c0 1.718-1.428 3.145-3.142 3.145h-449.69v449.68c0 1.718-1.427 3.145-3.145 3.145h-15.727c-1.718 0-3.145-1.414-3.145-3.145v-449.69h-22.015c-1.724 0-3.138-1.426-3.138-3.141v-15.729c0-1.715 1.423-3.142 3.138-3.142h22.012v-22.012c0-1.714 1.427-3.141 3.145-3.141h15.726c1.719 0 3.145 1.414 3.145 3.141v22.012h4e-3z" fill="#f06"/>
                        <path d="m-470.37 316.77h-216.99c-1.724 0-3.138-1.431-3.138-3.145v-15.726c0-1.714 1.427-3.145 3.138-3.145h198.12v-198.11c0-1.708 1.437-3.145 3.142-3.145h15.729c1.705 0 3.142 1.417 3.142 3.145v216.98c-0.021 1.737-1.393 3.145-3.143 3.145z" fill="#ccf"/>
                        <path d="m-489.25 348.26c0-1.728 1.43-3.142 3.145-3.142h15.726c1.715 0 3.145 1.427 3.145 3.142v242.1c-0.022 1.739-1.392 3.145-3.145 3.145h-15.732c-1.724 0-3.138-1.414-3.138-3.145-1e-3 -164.84-1e-3 -77.267-1e-3 -242.1zm53.464-31.488c-1.731 0-3.145-1.433-3.145-3.145v-15.726c0-1.715 1.43-3.145 3.145-3.145h242.14c1.736 0.022 3.145 1.392 3.145 3.145v15.732c0 1.725-1.418 3.138-3.145 3.138-164.84 1e-3 -77.309 1e-3 -242.14 1e-3z" fill="#63f"/>
                        <path d="m-435.78 345.07h242.14c1.728 0 3.139 1.437 3.139 3.145v15.727c0 1.711-1.431 3.145-3.139 3.145h-223.27v223.27c0 1.705-1.443 3.145-3.145 3.145h-15.726c-1.705 0-3.145-1.414-3.145-3.145v-242.14c0.019-1.737 1.388-3.145 3.145-3.145z" fill="#c30"/>
                        <path d="m-193.64 593.5h-493.72c-1.724 0-3.138-1.431-3.138-3.145v-15.727c0-1.715 1.427-3.145 3.138-3.145h474.85v-474.84c0-1.704 1.437-3.141 3.142-3.141h15.729c1.705 0 3.142 1.417 3.142 3.141v493.72c-0.02 1.739-1.392 3.145-3.142 3.145z" fill="#fc0"/>
                        <path d="m-567.86 96.64v97.484h374.21c1.73 0 3.145 1.437 3.145 3.145v15.726c0 1.715-1.433 3.145-3.145 3.145h-374.21v374.22c0 1.711-1.437 3.145-3.145 3.145h-15.729c-1.712 0-3.145-1.414-3.145-3.145v-374.22h-97.48c-1.737-0.022-3.145-1.389-3.145-3.145v-15.729c0-1.728 1.414-3.142 3.145-3.142h97.48v-97.483c0.022-1.736 1.388-3.141 3.145-3.141h15.731c1.729 1e-3 3.143 1.415 3.143 3.141z" fill="#9f0"/>
                        <path d="m-442.07 96.64v223.27h248.43c1.728 0 3.142 1.431 3.142 3.145v15.727c0 1.718-1.428 3.145-3.142 3.145h-248.43v248.43c0 1.714-1.431 3.145-3.145 3.145h-15.729c-1.718 0-3.145-1.414-3.145-3.145v-248.43h-223.26c-1.74-0.02-3.145-1.389-3.145-3.145v-15.729c0-1.728 1.414-3.142 3.145-3.142h223.26v-223.27c0.022-1.736 1.389-3.141 3.145-3.141h15.732c1.728 1e-3 3.142 1.415 3.142 3.141z" fill="#0ff"/>
                        <path d="m-416.91 313.62c0 1.731-1.434 3.145-3.145 3.145h-15.726c-1.715 0-3.145-1.43-3.145-3.145v-216.98c0.019-1.737 1.388-3.145 3.145-3.145h15.729c1.728 0 3.142 1.417 3.142 3.145v216.98zm-53.464 31.49c1.728 0 3.145 1.431 3.145 3.142v15.729c0 1.714-1.43 3.141-3.145 3.141h-216.98c-1.737-0.019-3.145-1.388-3.145-3.141v-15.732c0-1.728 1.414-3.139 3.145-3.139h216.98z" fill="#c3f"/>
                        <path d="m-687.35 93.5h493.71c1.728 0 3.139 1.427 3.139 3.141v15.729c0 1.715-1.424 3.142-3.139 3.142h-474.84v474.84c0 1.722-1.423 3.145-3.141 3.145h-15.729c-1.718 0-3.142-1.414-3.142-3.145v-493.71c0.02-1.736 1.389-3.14 3.142-3.14z" fill="#00f"/>
                        <path d="m-561.57 219.29h66.048c1.73 0 3.145 1.414 3.145 3.142v66.038c0 1.731-1.414 3.145-3.145 3.145h-66.048c-1.728 0-3.142-1.413-3.142-3.145v-66.038c0-1.728 1.414-3.142 3.142-3.142z" fill="#f00"/>
                        <path d="m-561.57 370.22h66.044c1.728 0 3.145 1.414 3.145 3.145v191.83c0 1.728-1.413 3.145-3.145 3.145h-66.044c-1.728 0-3.142-1.417-3.142-3.145v-191.83c0-1.731 1.41-3.145 3.142-3.145zm147.8-147.8v66.041c0 1.731 1.413 3.145 3.141 3.145h191.83c1.73 0 3.145-1.413 3.145-3.145v-66.041c0-1.728-1.414-3.145-3.145-3.145h-191.83c-1.728 0-3.141 1.414-3.141 3.145zm0-75.472v40.892c0 1.728 1.413 3.145 3.141 3.145h191.83c1.73 0 3.145-1.417 3.145-3.145v-40.892c0-1.728-1.414-3.146-3.145-3.146h-191.83c-1.728 0-3.141 1.418-3.141 3.146zm-223.27 223.27h40.892c1.728 0 3.142 1.414 3.142 3.145v191.83c0 1.728-1.414 3.145-3.142 3.145h-40.892c-1.73 0-3.145-1.417-3.145-3.145v-191.83c0-1.731 1.414-3.145 3.145-3.145z" fill="#f00"/>
                        <path d="m-410.63 370.22h191.83c1.73 0 3.145 1.414 3.145 3.145v191.83c0 1.728-1.414 3.145-3.145 3.145h-191.83c-1.728 0-3.141-1.417-3.141-3.145v-191.83c0-1.731 1.413-3.145 3.141-3.145z" fill="#00f"/>
                    </svg>
                </div>
            </div>
    );
}
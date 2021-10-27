import React, { useContext } from "react";
import { PracticeContext } from "../context/PracticeContext";

export default function Chart(props) {
    const {
        multiplicand,
        setMultiplicand,
        multiplicator,
        setMultiplicator
    } = useContext(PracticeContext);

    const dir = props.direction || "x";
    const id = props.id || 1;
    const labelName = `${ id }${ dir }`;
    const isSelected = dir === "x"? multiplicand.includes(id) : multiplicator.includes(id);

    const onChangeHandler = (e, opperand) => {
        const value = Number(e.target.value);
        const res = opperand === "x"? [...multiplicand] : [...multiplicator];

        if(e.target.checked) {
            res.push(value);
        } else {
            res.splice(res.indexOf(value), 1);
        }

        if(opperand==="x"){
            setMultiplicand(res);
        } else {
            setMultiplicator(res);
        }
    }

    return(
        <div>
            <input
                type="checkbox"
                id={ labelName }
                checked={ isSelected }
                value={ id }
                onChange={ (e)=>{ onChangeHandler(e, dir) } }
            />
            <label
                htmlFor={ labelName }
                className={ `chart-checkbox ${ props.isMini? "mini-chart-checkbox" : "" }` }
            >
                <span>{ id }</span>
            </label>
        </div>
    )
}
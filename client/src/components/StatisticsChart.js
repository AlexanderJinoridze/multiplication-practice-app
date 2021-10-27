import React from "react";

export default function StatisticsChart(props) {

    const title = props.title;
    let data = [...props.data];
    let maxValue = Math.max(...data);
    let percentageList = [];

    Array(20).fill("").forEach((_, number) => {
        percentageList[number] = data[number] / maxValue * 100;
    });

    return(
        <>
            { title && <span className="mb-2 text-pale italic">{ title }</span> }

            <div className="statistics-chart">
            {
                percentageList.map((value, index)=>{
                    return(
                        <div key={index}>
                            <div className="chart-column-container">
                                <div style={{height: value+"%", background: props.color }}></div>
                            </div>
                            <div className="chart-column-title">
                                <span>{ index + 1 }</span>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </>
    );
}
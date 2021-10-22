import React, { useCallback, useContext, useEffect, useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StatisticsChart from "../components/StatisticsChart";
import { AuthContext } from "../context/AuthContext";
import { LightToggleContext } from "../context/LightToggleContext";
import useHttp from "../hooks/http.hook";

export default function StatisticsPage() {
    const [userResult, setUserResult] = useState([]);
    const [totalPractice, setTotalPractice] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalWrong, setTotalWrong] = useState(0);
    
    const [correctData, setCorrectData] = useState(Array(20).fill(0));
    const [wrongData, setWrongData] = useState(Array(20).fill(0));
    const [ratioData, setRatioData] = useState(Array(20).fill(0));
    const [timeData, setTimeData] = useState(Array(20).fill(0));
    
    const [heatMapData, setHeatMapData] = useState([]);
    const [heatMapColorScheme, setHeatMapColorScheme] = useState();

    const { loading, request } = useHttp();

    const { isDark } = useContext(LightToggleContext);
    const { token, userId } = useContext(AuthContext);

    const fetchUser = useCallback(async () => {
        try {
            const fetched = await request(`/api/result/${ userId }`, "GET", null, {
                Authorization: `Bearer ${ token }`
            });
            setUserResult(fetched);
        } catch(e) {}
    }, [token, userId, request]);

    const msToTime = (s) => {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = s % 60;
        s = (s - secs) / 60;
        var mins = s % 60;
        var hrs = (s - mins) / 60;

        return (hrs < 9? ("0" + hrs) : hrs) + ' : ' + (mins < 9? ("0" + mins) : mins) + ' : ' + (secs < 9? ("0" + secs) : secs);
    }

    const getOccurrence = (array, value) => {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        let time = 0;
        let correct = 0;
        let wrong = 0;
        let count = {}

        userResult.forEach((result) => {
            time += Number(result.timeNeeded);

            if(result.isCorrect) {
                correct += 1;
            } else {
                wrong += 1;
            }

            count[result.dateCreated] = (count[result.dateCreated]||0) + 1;
        });

        Object.keys(count).forEach(function(key) {
            heatMapData.push({ date: key.replaceAll("-","/"), count: count[key] });
        });

        Array(20).fill("").forEach((_, number) => {
            userResult.forEach((result) => {
                let points = getOccurrence(result.operands, number+1);
                if(points) {
                    if(result.isCorrect) {
                        correctData[number] += points;
                    } else {
                        wrongData[number] += points;
                    }

                    ratioData[number] =  correctData[number] < wrongData[number]? correctData[number] / wrongData[number] : wrongData[number] / correctData[number];
                    timeData[number] += result.timeNeeded * points;
                }
            });
        });

        setTotalPractice(userResult.length);
        setTotalTime(msToTime(time));
        setTotalCorrect(correct);
        setTotalWrong(wrong);

        setCorrectData([...correctData]);
        setWrongData([...wrongData]);
        setRatioData([...ratioData]);
        setTimeData([...timeData]);
        setHeatMapData([...heatMapData]);
    },[userResult]);

    useEffect(() => {
        if(isDark) {
            setHeatMapColorScheme({
                0: "#2D3339",
                5000: "#00AF00",
                1000: "#008600",
                100: "#006300",
                10: "#004400"
            });
        } else {
            setHeatMapColorScheme({
                0: "#E2E6E9",
                10: "#88BFFF",
                100: "#2289FF",
                1000: "#0057BB",
                5000: "#002855"
            });
        }
    }, [isDark])

    if(loading) {
        return <Loader />
    }

    return(
        <>
        {!loading
        &&
        <div className="page">
            <Navbar />
            <main className="flex flex-col max-w-4xl">
                <h2 className="text-center mb-4">Statistics</h2>
                <div className="total-results-panel">
                    <div>
                        <div className="total-result-card">
                            <span>Total practices task solved</span>
                            <h4>{ totalPractice }</h4>
                        </div>
                        <div className="total-result-card">
                            <span>Total time spent</span>
                            <h4>{ totalTime }</h4>
                        </div>
                    </div>
                    <div>
                        <div className="total-result-card">
                            <span>Total correct answers</span>
                            <h4>{ totalCorrect }</h4>
                        </div>
                        <div className="total-result-card">
                            <span>Total wrong answers</span>
                            <h4>{ totalWrong }</h4>
                        </div>
                        <div className="total-result-card">
                            <span>Percentage of right answers</span>
                            <h4>{ totalCorrect / totalPractice * 100 }%</h4>
                        </div>
                    </div>
                </div>
                <div className="text-center max-w-lg mx-auto mb-4">
                    <h5>Result Histograms</h5>
                    <span className="text-pale">This histograms shows relative correct-wrong frequencies and also relative time that tooks to solve for each number</span>
                </div>
                <span className="mb-2 text-pale italic">Correct answer histogram</span>
                <StatisticsChart data={ correctData } color="#00AF00" />
                <span className="mb-2 text-pale italic">Wrong answer histogram</span>
                <StatisticsChart data={ wrongData } color="#F01E1E" />
                <span className="mb-2 text-pale italic">Correct-Wrong answer ratio histogram</span>
                <StatisticsChart data={ ratioData } color="#B140B4" />
                <span className="mb-2 text-pale italic">Time histogram</span>
                <StatisticsChart data={ timeData } color="#2289FF" />
                <div className="text-center max-w-lg mx-auto mb-4 mt-12">
                    <h5>Practice Calendar</h5>
                    <span className="text-pale">This calendar shows the dates of active learning</span>
                </div>
                <div className="heatmap-container">
                    <HeatMap
                        width={740}
                        value={heatMapData}
                        startDate={ new Date(`${ new Date().getFullYear() }/01/01`) }
                        weekLabels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                        panelColors={ heatMapColorScheme }
                    />
                </div>
            </main>
            <Footer />
        </div>
        }
        </>
    );
}
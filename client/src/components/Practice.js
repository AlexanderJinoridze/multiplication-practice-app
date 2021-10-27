import React, { useEffect, useState, useContext, useCallback } from "react";
import toast from 'react-hot-toast';
import useTimer from "../hooks/timer.hook";
import useHttp from "../hooks/http.hook";
import { PracticeContext } from "../context/PracticeContext";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";

export default function Practice() {
    const hints = [
        {patterns: [/^1$/,/^\d*$/], message: "Everything multiplied by 1 is that number."},
        {patterns: [/^10$/,/^20$|^1[0-9]$|^[2-9]$/], message: "Just take whatever number multiplied by 10 and then merge 0 to it."},
        {patterns: [/^11$/,/^[2-9]$/], message: "Just duplicate two times the number which is multiplied by 11."},
        {patterns: [/^9$/,/^20$|^1[2-9]$/], message: "When multiplying 2 digit numbers by 9 you have to subtract 2 from that number and merge to it a number that is needed to get 18."},
        {patterns: [/^11$/,/^20$|^1[0-9]$/], message: "When multiplying 11 by 2 digit number you just write that number and put sum of each individual digit in the center."},
        {patterns: [/^5$/,/^20$|^1[2-9]$|^[3-9]$/], message: "Divide whatever number you are multiplying by 5 in half and erase the floating-point."},
        {patterns: [/^9$/,/^[2-4]$|^[6-9]$/], message: "When multiplying 1 digit number by 9 you have to subtract 1 from that number and merge to it number that is needed to get 9."},
        {patterns: [/^2$/,/^[2-8]$|^1[2-9]$/], message: "Simply add whatever number is multplied by 2 to itself."},
        {patterns: [/^3$/,/^[3-4]$|^[6-8]$/], message: "Multiplication by 3 has to be learned by heart through constant practice, sorry."},
        {patterns: [/^4$/,/^4$|^[6-8]$/], message: "Multiplication by 4 has to be learned by heart through constant practice, sorry."},
        {patterns: [/^[7-8]$/,/^[7-8]$/], message: "When multiplying 7 by 8 or 8 by 7 just remember this delightful equation 56=7x8."},
        {patterns: [/^[6-8]$/,/^[6-8]$/], message: "Multiplying numbers from 6 to 8 to each other is tough and have to be learned by heart through practicing."},
        {patterns: [/^20$/,/^[2-4]$|^[6-8]$|^1[2-9]$|^20$/], message: "Just multiply whatever number multiplied by 20 to 2 and then merge 0 to it."},
        {patterns: [/^[3-4]$|^[6-8]$|^1[2-9]$/,/^1[2-9]$/], message: "No hint for this problem, sorry, you have to learn it by heart through practicing, BTW that's why this website exists"}
    ];

    const [answer, setAnswer] = useState("");
    const [task, setTask] = useState([1,1]);
    const [oneChance, setOneChance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timerID, setTimerID] = useState("");
    const [isCorrect, setIsCorrect] = useState(true);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showHint, setShowHint] = useState("");
    const [currentHint, setCurrentHint] = useState("");

    const timer = useTimer();
    const { request } = useHttp();

    const {
        setPracticeState,
        multiplicand,
        multiplicator
    } = useContext(PracticeContext);
    const { token, userId, isAuthenticated } = useContext(AuthContext);

    const randomNumber = (n = 1, rounding = "floor") => Math[rounding](Math.random()*n);

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;

        while (currentIndex !== 0) {

          randomIndex = randomNumber(currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const generateTask = () => {
        setShowAnswer(false);
        setShowHint(false);
        setTask(shuffle([multiplicand[randomNumber(multiplicand.length)], multiplicator[randomNumber(multiplicator.length)]]));
    };

    const handleResult = useCallback(
        async (result) => {
            if(isAuthenticated) {
                try{
                    let historyEntity = {};
                    let ISODateString = new Date().toISOString();
                    historyEntity.dateCreated = ISODateString.slice(0, ISODateString.indexOf("T"));
                    historyEntity.operands = [...task];
                    historyEntity.timeNeeded = timer.restart(timerID);
                    historyEntity.user = userId;

                    setLoading(true);
                    await request(`/api/result/add`, "POST", {...historyEntity, isCorrect: result }, {
                        Authorization: `Bearer ${ token }`
                    });
                    setLoading(false);
                } catch(e) {}
            }
            generateTask();
        }, [task, token, timerID, request]
    );

    const handleAnswer = useCallback(() => {
        try{
            if(answer === "") {
                toast.error("Should not be empty");
                return;
            }

            if(Number(answer) === task[0]*task[1]) {
                if(isCorrect){
                    handleResult(true);
                    toast.success("You are right");
                } else {
                    handleResult(false);
                    toast("And now that's correct")
                    setIsCorrect(true);
                }
            } else {
                if(oneChance) {
                    toast.error("You are wrong, sorry");
                    handleResult(false);
                } else {
                    setIsCorrect(false);
                    toast.error("You are wrong, try again");
                }
            }
    
            setAnswer("");
        } catch(e) {}
    },[isCorrect, answer]);

    const findUsefulHint = useCallback(() => {
        let isValueFounded = false;

        hints.map((hint) => {
            if(!isValueFounded) {
                let patterns = [...hint.patterns];
                let tasksArray = [...task];
                let isFirstMatched = false;

                hint.patterns.map((testedPattern, testPatternIndex) => {
                    task.map((testedTask, testedTaskIndex) => {
                        if(!isFirstMatched && testedPattern.test(testedTask)) {
                            patterns.splice(testPatternIndex,1);
                            tasksArray.splice(testedTaskIndex,1);
                            isFirstMatched = true;
                        }
                    });
                });

                if(isFirstMatched){
                    if(patterns[0].test(tasksArray[0])){
                        console.log(hint.message);
                        isValueFounded = true;
                        setCurrentHint(hint.message);
                    }
                }
            }
        })
    }, [task, hints]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAnswer();
        }
    }

    const handleSkip = () => {
        if(isAuthenticated) {
            timer.restart(timerID);
        }
        generateTask();
        setAnswer("");
    }

    const onFocus = () => {timer.play(timerID)};

    const onBlur = () => {timer.pause(timerID)};

    useEffect(
        () => {
            if(isAuthenticated) {
                setTimerID(timer.start());
            }
            generateTask();

            return () => {
                if(isAuthenticated) {
                    timer.finish(timerID);

                    window.removeEventListener('focus', onFocus);
                    window.removeEventListener('blur', onBlur);
                }
            };
        }, []
    );

    useEffect(
        ()=>{
            if(timerID && isAuthenticated){
                window.addEventListener('focus', onFocus);
                window.addEventListener('blur', onBlur);
            }
        }, [timerID]
    );

    if(loading) {
        return(<Loader />);
    } else {
        return(
            <>
                <div className="flex-1 max-w-xl w-full mb-8">
                    <div className="task-display">
                        <h1 className="flex-1 text-right">{task[0]}</h1>
                        <h1 className="mx-4">x</h1>
                        <h1 className="flex-1 text-left">{task[1]}</h1>
                    </div>
                    <div>
                        <input type="text" maxLength="3" autoFocus className="text-center" value={ answer } onChange={ (e)=>{ setAnswer(e.target.value.replace(/\D/,'')) } } onKeyDown={handleKeyDown} />
                    </div>
                    <div className="flex mt-2 mb-4 items-center">
                        <input type="checkbox" id="one_chance" checked={ oneChance } onChange={()=>setOneChance(!oneChance)} />
                        <label htmlFor="one_chance" className="checkbox"></label>
                        <label htmlFor="one_chance" className="pl-2">Took only one chance and instant transfer to the next task</label>
                    </div>
                    <div className="mb-6">
                        <button className="btn-small btn-theme-primary mr-4" onClick={handleAnswer}>Check</button>
                        <button className="btn-small btn-theme-link" onClick={handleSkip}>Skip</button>
                    </div>
                    <div className="mb-4 flex justify-center">
                        {!showHint && <a onClick={()=>{findUsefulHint(); setShowHint(true)}}>Show Hint</a>}
                        {showHint &&
                            <div className="hint-panel">
                                <i className="icon-lightbulb"></i>
                                <span>{ currentHint }</span>
                            </div>
                        }
                    </div>
                    <div className="flex justify-center">
                        {!showAnswer && <a onClick={()=>{setIsCorrect(false); setShowAnswer(true);}}>Show Answer</a>}
                        {showAnswer &&
                            <div className="flex flex-col items-center">
                                <div><i>The answer is</i></div>
                                <h2>{ task[0]*task[1] }</h2>
                            </div>
                        }
                    </div>
                </div>
                <div className="self-center">
                    <button className="btn-small btn-theme-danger" onClick={() => { if(isAuthenticated){timer.finish(timerID)}; setPracticeState("tuning-quiz") } }>Finish Quiz</button>
                </div>
            </>
        )
    }
}
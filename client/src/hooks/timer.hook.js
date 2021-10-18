import { useCallback } from "react";
import uniqid from "uniqid";

const timerList = {};

export default function useTimer() {

    const start = useCallback(
        (timerID) => {
            const newTimerId = timerList[timerID]? timerID : uniqid();
            const timePassed = timerList[timerID]? timerList[timerID].timePassed : 0;

            timerList[newTimerId] = { time: Date.now(), timePassed: 0, isPlaying: true };

            return timerList[timerID]? timePassed : newTimerId;
        }, []
    );

    const pause = useCallback(
        (timerID) => {
            const currentTimer = timerList[timerID];

            if (!currentTimer) { return }
            if (!currentTimer.isPlaying) { return }

            const lastTimeCheck = currentTimer.time;
            const newTimeCheck = Date.now();

            currentTimer.time = newTimeCheck;
            currentTimer.timePassed += newTimeCheck - lastTimeCheck;
            currentTimer.isPlaying = false;

            timerList[timerID] = currentTimer;
        }, []
    );

    const play = useCallback(
        (timerID) => {
            const currentTimer = timerList[timerID];

            if (!currentTimer) { return }
            if (currentTimer.isPlaying) { return }

            currentTimer.time = Date.now();
            currentTimer.isPlaying = true;

            timerList[timerID] = currentTimer;
        }, []
    );

    const finish = useCallback(
        (timerID, deleteId = true) => {
            const currentTimer = timerList[timerID];

            if (!currentTimer) { return }

            const lastTimeCheck = currentTimer.time;
            const newTimeCheck = Date.now();

            if (currentTimer.isPlaying) {
                currentTimer.timePassed += newTimeCheck - lastTimeCheck;
            }

            if(deleteId) {
                delete timerList[timerID];
                timerList[timerID] = { ...timerList };
            }
        }, []
    );

    const restart = useCallback(
        (timerID) => {
            finish(timerID, false);
            return start(timerID);
        }, [ finish, start ]
    );

    return { start, pause, play, finish, restart };
}
import { useRef, useState, useCallback, useEffect } from 'react';

const START_TIME = '00';
const formatTimeString = (n) => Math.floor(n).toString().padStart(2, '0');
const useCountDown = (initialTime, startImmediately = true) => {
    const timer = useRef({ timeLeft: initialTime });
    const [timeRemain, setTimeRemain] = useState({
        dd: START_TIME,
        hh: START_TIME,
        mm: START_TIME,
        ss: START_TIME
    });
    const updateTime = useCallback((currTs) => {
        const days = currTs / 1000 / 60 / 60 / 24;
        const hours = currTs / 1000 / 60 / 60 - (24 * Math.floor(days));
        const minutes = currTs / 1000 / 60 - (24 * 60 * Math.floor(days)) - (60 * Math.floor(hours));
        const seconds = currTs / 1000 - (24 * 60 * 60 * Math.floor(days)) - (60 * 60 * Math.floor(hours)) - (60 * Math.floor(minutes));
        setTimeRemain({
            dd: Math.floor(days).toString(),
            hh: formatTimeString(hours),
            mm: formatTimeString(minutes),
            ss: formatTimeString(seconds)
        });
    }, []);
    const run = ts => {
        if (!timer.current.startedTime || !timer.current.lastInterval) {
            timer.current.startedTime = ts;
            timer.current.lastInterval = ts;
        }
        const currElapsed = Math.min(1000, timer.current.timeLeft);
        if (currElapsed <= ts - timer.current.lastInterval) {
            timer.current.lastInterval += currElapsed;
            timer.current.timeLeft -= currElapsed;
            updateTime(timer.current.timeLeft);
        }
        if (0 < timer.current.timeLeft) {
            timer.current.requestRef = window.requestAnimationFrame(run);
        }
        else {
            timer.current = { timeLeft: 0 };
        }
    };
    const start = useCallback(() => {
        if ('number' === typeof timer.current.requestRef) {
            window.cancelAnimationFrame(timer.current.requestRef);
        }
        timer.current.requestRef = window.requestAnimationFrame(run);
    }, []);
    useEffect(() => {
        if (startImmediately) {
            start();
        }
    }, []);
    return [timeRemain, start];
};

export default useCountDown;
export { START_TIME };
//# sourceMappingURL=index.js.map

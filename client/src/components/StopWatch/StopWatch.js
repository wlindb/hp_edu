import React, { useState, useRef } from 'react';

const StopWatch = () => {
    const [timer, setTimer] = useState({
        minutes: 0,
        seconds: 0
    });
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef();

    const formatTime = val => {
        let value = val.toString();
        if (value.length < 2) {
          value = '0' + value;
        }
        return value;
    };
    
    const start = () => {
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimer(prevTimer => {
                const nextSecond = (prevTimer.seconds+1)%60;
                if(nextSecond === 0) {
                    return {minutes: (prevTimer.minutes+1)%60, seconds: nextSecond}
                }
                return {minutes: prevTimer.minutes, seconds: nextSecond}
            });
        }, 1000);
    };
    
    const stop = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    };
    
    const reset = () => {
        setTimer({minutes: 0, seconds: 0});
    };
    

    return (
        <div className="stopwatch">
            <h2>{formatTime(timer.minutes)} : {formatTime(timer.seconds)}</h2>
            {isRunning ? <button onClick={stop}>Stop</button> : <button onClick={start}>Start</button>}
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default StopWatch;

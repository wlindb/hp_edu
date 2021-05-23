import React, { useState, useEffect } from 'react';
import StopwatchDisplay from './StopWatchDisplay';

const StopWatch = () => {
    
    const [isRunning, setIsRunning ] = useState(false);
    const [currentTimeMin, setCurrentTimeMin] = useState(0);
    const [currentTimeMs, setCurrentTimeMs] = useState(0);
    const [currentTimeSec, setCurrentTimeSec] = useState(0);

    useEffect(() => {
        if(!isRunning) return;

        const interval = setInterval(() => {
            setCurrentTimeSec(currentTimeSec+1)
            console.log(currentTimeSec)
        }, 1000);
        // return () => clearInterval(interval);
    }, [isRunning]);

    const formatTime = val => {
        let value = val.toString();
        if (value.length < 2) {
          value = '0' + value;
        }
        // if (rest[0] === 'ms' && value.length < 3) {
        //   value = '0' + value;
        // }
        return value;
    };
    
    const start = () => {
        if (!isRunning) {
          setIsRunning(true);
        }
    };
    
    const stop = () => {
        setIsRunning(false);
        // clearInterval(watch);
    };
    
    const pace = () => {
        setCurrentTimeSec(currentTimeSec+1);
        if (currentTimeSec >= 60) {
            setCurrentTimeMin(currentTimeMin+1);
            setCurrentTimeSec(0);
        }
        console.log(currentTimeMin, ":", currentTimeSec, ":", currentTimeMs)
    };
    
    const reset = () => {
        setCurrentTimeMs(0);
        setCurrentTimeSec(0);
        setCurrentTimeMin(0);
    };
    

    return (
        <div className="stopwatch">
            <h2>Stopwatch</h2>
            {!isRunning ? <button onClick={start}>START</button> : <button onClick={stop}>STOP</button>}
            <button onClick={reset}>RESET</button>
            <div className={"stopwatch__display"}>
                <span>
                    {formatTime(currentTimeMin)}:
                    {formatTime(currentTimeSec)}
                </span>
            </div>
        </div>
    )
}

export default StopWatch;

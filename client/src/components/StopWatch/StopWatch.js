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
        <div className="stopwatch content-center">
            <div className="clock" id="clock">
                <p className="time">{formatTime(timer.minutes)}:{formatTime(timer.seconds)}</p>
            </div>
            <div className="btn-container">
                {isRunning ? 
                <button className="btn-test" onClick={stop}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" className="btn-pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3f46ad" d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"></path></svg>
                </button> : 
                <button className="btn-test" onClick={start}>
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" className="btn-play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#3f46ad" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg>
                </button>}
                <button className="btn-test" onClick={reset}>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo-alt" className="btn-reset" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#3f46ad" d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z"></path></svg>
                </button>
            </div>
        </div>
    )
}

export default StopWatch;

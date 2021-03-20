import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ProgressCard = ({ active, title, nrSolvedExercises, totalNrOfExercises, link }) => {

    const [progressPercentage, setProgressPercentage] = useState(0); //Math.round(nrSolvedExercises/totalNrOfExercises);

    useEffect(() => {
        const percentage = Math.round((nrSolvedExercises/totalNrOfExercises)*100)
        setProgressPercentage(percentage)
    }, [progressPercentage, nrSolvedExercises, totalNrOfExercises])

    // useEffect(() => {
    //     () => setProgressPercentage(Math.round(nrSolvedExercises/totalNrOfExercises)
    // }, [windowSize])

    return (
        <div className="skill-progress-card card-box">
            <div className="base-card">
                <div className={`ui-card ui-layer-3${active ? ' active-card' : ''}`}>
                    {/* <h2 className="ui-title text-sec-headline-xs">{title}</h2> */}
                    <div className="card-content">
                        <h2 id="base-card-1" className="ui-header">{title}</h2>
                        <div className="base-card-detail text-content">
                            <div className="skill-progress-bar">
                                <div className="ui-progress-bar">
                                    <div className="progress-filler" style={{width: `${progressPercentage}%`}}></div>
                                </div>
                                <div className="progress-count text-content">
                                    <span className="percentage">{progressPercentage}%</span>
                                    <span className="points-left"> ({nrSolvedExercises}/{totalNrOfExercises} avklarade uppgifter)</span>
                                </div>
                            </div>
                        </div>
                        <a href={link} className={`btn-${active ? 'primary' : 'secondary'}`}>Fortsätt öva</a>
                    </div>
                </div>
            </div>   
        </div>
    )
}

ProgressCard.propTypes = {
    active: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    nrSolvedExercises: PropTypes.number.isRequired,
    totalNrOfExercises: PropTypes.number.isRequired,
    link: PropTypes.string.isRequired
}

export default ProgressCard


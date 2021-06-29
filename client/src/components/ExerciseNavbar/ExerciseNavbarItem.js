import React from 'react';
const ExerciseNavbarItem = ({ score, date, part, exerciseNumber, onClick}) => {
    return (
        <li onClick={onClick}>
            <div className="exercises-navbar-item">
                <div className="exercises-navbar-item-badge">{score}</div>
                <div className="exercises-navbar-item-text">
                    <span>{date} </span>
                    <span>Provpass {part} </span>
                    <span>Uppgift {exerciseNumber} </span>
                </div>
            </div>
        </li>
    )
}

export default ExerciseNavbarItem;

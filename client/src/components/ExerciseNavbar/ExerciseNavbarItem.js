import React from 'react';
const ExerciseNavbarItem = ({ score, user_difficulty, date, part, exerciseNumber, onClick}) => {
    const getUserDifficultyName = nr => {
        switch (nr) {
            case 1:
                return "easy";
            case 2:
                return "intermediate";
            case 3:
                return "medium"
            case 4:
                return "hard"
            case 5:
                return "extreme"
        
            default:
                return "";
        }
    };

    return (
        <li onClick={onClick}>
            <div className={`exercises-navbar-item ${user_difficulty ? getUserDifficultyName(user_difficulty) : ''}`}>
                <div className={`exercises-navbar-item-badge ${user_difficulty ? getUserDifficultyName(user_difficulty) : ''}`}>{parseFloat(score).toFixed(1)}</div>
                <div className={`exercises-navbar-item-text ${user_difficulty ? getUserDifficultyName(user_difficulty) : ''}`}>
                    <span>{date} </span>
                    <span>Provpass {part} </span>
                    <span>Uppgift {exerciseNumber} </span>
                </div>
            </div>
        </li>
    )
}

export default ExerciseNavbarItem;

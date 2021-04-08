import React, { useState } from 'react';
import ExerciseNavbarItem from './ExerciseNavbarItem';
const ExerciseNavbar = (props) => {
    const [listItems, setListItems] = useState([
        {score: 0.7, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1},
        {score: 0.5, date: "2020-10-25", part: "3", exerciseNumber: 1}
    ]);

    return (
        <div className="exercises-navbar">
            <ul>
                {listItems.map(item =>
                    <ExerciseNavbarItem 
                        score={item.score}
                        date={item.date}
                        part={item.part}
                        exerciseNumber={item.exerciseNumber} />
                )}
            </ul>
        </div>
    )
}

export default ExerciseNavbar;

import React, { useState, useEffect } from 'react';
import ExerciseNavbarItem from './ExerciseNavbarItem';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import { getSubCategoryExercises } from '../../actions/exerciseActions';

const ExerciseNavbar = ({exercise, ...props}) => {

    // const { category, sub_category, exercises } = exercise;
    const category = useSelector(state => state.exercise.category);
    const sub_category = useSelector(state => state.exercise.sub_category);
    const sub_category_exercises = useSelector(state => state.exercise.exercises[category][sub_category]);
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

    useEffect(() => {
        console.log('ExerciseNavbar useeffect', category, sub_category, sub_category_exercises);
    }, [])

    return (
        <div className="exercises-navbar">
            <ul>
                {/* {listItems.map(item =>
                    <ExerciseNavbarItem 
                        score={item.score}
                        date={item.date}
                        part={item.part}
                        exerciseNumber={item.exerciseNumber} />
                )} */}
                {sub_category_exercises.map(item => {
                    const [ date, part, number ] = item.exercise_id.split('_'); 
                    return (<ExerciseNavbarItem 
                                score={0.0}
                                date={date}
                                part={part}
                                exerciseNumber={number} />)

                }
                )}
            </ul>
        </div>
    )
}

ExerciseNavbar.propTypes = {
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    exercise: state.exercise,
    category: state.category,
    sub_category: state.sub_category,
    exercises: state.exercise.exercises,
    [state.category]: state.exercise.exercises[state.category],
    [state.sub_category]: [state.category][state.sub_category]
});


export default connect(
    mapStateToProps,
    { getSubCategoryExercises }
)(ExerciseNavbar)
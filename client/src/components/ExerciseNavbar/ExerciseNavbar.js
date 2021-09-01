import React, { useState, useEffect } from 'react';
import ExerciseNavbarItem from './ExerciseNavbarItem';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import { getSubCategoryExercises } from '../../actions/exerciseActions';

const ExerciseNavbar = ({exercises, currentIndex, handleClick, sub_category_exercises, ...props}) => {

    // useEffect(() => {
    //     console.log('ExerciseNavbar useeffect', sub_category_exercises);
    //     console.log('test ', exercises[props.category][props.sub_category], props);//exercises[category][sub_category])
    // }, [props])



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
                {sub_category_exercises.map((item, i) => {
                    const [ date, part, number ] = item.exercise_id.split('_');
                    const user_difficulty = item.user_has_done_exercise ? item.done_exercises[0].user_difficulty : undefined 
                    return (<ExerciseNavbarItem
                                key={item.exercise_id} 
                                score={item.difficulty !== undefined ? item.difficulty : "3"}
                                user_difficulty={user_difficulty}
                                date={date}
                                part={part}
                                exerciseNumber={number} 
                                onClick={() => handleClick(i)}
                                active={i === currentIndex}/>)

                }
                )}
            </ul>
        </div>
    )
}

ExerciseNavbar.propTypes = {
    // exercise: PropTypes.object.isRequired,
    exercises: PropTypes.object.isRequired,
    sub_category_exercises: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    exercise: state.exercise,
    category: state.exercise.category,
    sub_category: state.exercise.sub_category,
    sub_category_exercises: state.exercise.exercises[state.exercise.category][state.exercise.sub_category],
    exercises: state.exercise.exercises,
    // [state.category]: state.exercise.exercises[state.category],
    // [state.sub_category]: [state.category][state.sub_category]
});


export default connect(
    mapStateToProps,
    { getSubCategoryExercises }
)(ExerciseNavbar)
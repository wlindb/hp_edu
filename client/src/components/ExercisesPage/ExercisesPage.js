import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import ExerciseNavbar from '../ExerciseNavbar/ExerciseNavbar';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import StopWatch from '../StopWatch/StopWatch';
import { getSubCategoryExercises } from '../../actions/exerciseActions';


export const ExercisesPage = ({ exercise, getSubCategoryExercises, ...props }) => {
    // const { category, sub_category } = exercise;
    const category = useSelector(state => state.exercise.category);
    const sub_category = useSelector(state => state.exercise.sub_category);
    const sub_category_exercises = useSelector(state => state.exercise.exercises[category][sub_category]);
    const [ currentExercise, setCurrentExercise ] = useState({}); 

    useEffect(() => {
        // TODO: Fetch only when exercises are not in memory.
        console.log('Exercisepage useeffect', category, sub_category, exercise.exercises);
        // getSubCategoryExercises(category, sub_category);
        // console.log(exercise.exercises)
        // console.log('efter');
        setCurrentExercise(sub_category_exercises[0]);
    }, []);

    const handleNavbarClick = (index) => {
        console.log('ExerciseNavbar HandleClick index: ', index);
        console.log(sub_category_exercises[index])
        setCurrentExercise(sub_category_exercises[index]);
    };

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar handleClick={handleNavbarClick}/>
            <div className="exercise-container">
                <div className="exercise-content">
                    <ExerciseCard exercise={currentExercise}/>
                </div>
            </div>
            <div className="exercise-utilities-container">
                <div>
                    Rating
                </div>
                <StopWatch/>
            </div>
        </div>
    )
}

ExercisesPage.propTypes = {
    getSubCategoryExercises: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    exercise: state.exercise,
    category: state.category,
    sub_category: state.sub_category,
    exercises: state.exercise.exercises,
    [state.category]: state.exercise.exercises[state.category],
    [state.sub_category]: [state.category][state.sub_category]
});

export default connect(
    mapStateToProps,
    { getSubCategoryExercises } // TODO: Actions for ExercisesPage
)(ExercisesPage)
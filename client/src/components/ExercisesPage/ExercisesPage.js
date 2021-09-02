import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import ExerciseNavbar from '../ExerciseNavbar/ExerciseNavbar';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import StopWatch from '../StopWatch/StopWatch';
import RatingCard from '../RatingCard/RatingCard';
import AdminExerciseOptionsCard from '../AdminExerciseOptionCard/AdminExerciseOptionsCard';
import EditExercise from '../EditExercise/EditExercise';
import { getSubCategoryExercises } from '../../actions/exerciseActions';


export const ExercisesPage = ({ exercise, getSubCategoryExercises, ...props }) => {
    // const { category, sub_category } = exercise;
    const category = useSelector(state => state.exercise.category);
    const sub_category = useSelector(state => state.exercise.sub_category);
    // const sub_category_exercises = useSelector(state => state.exercise.exercises[category][sub_category]);
    // const [ currentExercise, setCurrentExercise ] = useState({}); 
    const [ exerciseIndex, setExerciseIndex ] = useState(0);
    const currentExercise = useSelector(state => state.exercise.exercises[category][sub_category][exerciseIndex])
    const [ isEditExerciseActive, setEditExerciseActive ] = useState(false);

    // useEffect(() => {
    //     // TODO: Fetch only when exercises are not in memory.
    //     console.log('Exercisepage useeffect', category, sub_category, exercise.exercises);
    //     // getSubCategoryExercises(category, sub_category);
    //     // console.log(exercise.exercises)
    //     // console.log('efter');
    //     // setCurrentExercise(sub_category_exercises[0]);
    // }, [sub_category_exercises]);

    const handleNavbarClick = (index) => {
        console.log('ExerciseNavbar HandleClick index: ', index, sub_category);
        // console.log(sub_category_exercises[index])
        // setCurrentExercise(sub_category_exercises[index]);
        console.log('isAdmin', props.auth.user.isAdmin);        
        setExerciseIndex(index);
    };

    const getUserDifficulty = () => {
        if(currentExercise === undefined) return -1;
        const { _id, done_exercises, user_has_done_exercise } = currentExercise;
        if(user_has_done_exercise) {
            const { user_difficulty } = done_exercises.find(exercise => exercise.exercise_id === _id);
            return user_difficulty !== undefined ? user_difficulty : -1;
        }
        return -1;
    };

    const handleAdminOptionsOnClick = (index) => {
        // console.log('index', index);
        setEditExerciseActive(props.auth.user.isAdmin && !isEditExerciseActive);
    };

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar handleClick={handleNavbarClick} currentIndex={exerciseIndex}/>
            <div className="exercise-container">
                <div className="exercise-content">
                    {currentExercise !== undefined ?  
                        <ExerciseCard exercise={currentExercise} current_sub_category={sub_category}/> :<></>
                    }
                    {isEditExerciseActive && <EditExercise/>}
                </div>
            </div>
            <div className="exercise-utilities-container">
                {currentExercise !== undefined ?  
                    <>
                        <RatingCard exercise_id={currentExercise._id} user_difficulty={getUserDifficulty()}/>
                        <StopWatch/>
                        {props.auth.user.isAdmin === true && <AdminExerciseOptionsCard adminOptionsOnClick={handleAdminOptionsOnClick}/>}
                    </>
                    :<></>
                }
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
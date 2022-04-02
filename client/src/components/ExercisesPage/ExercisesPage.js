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
    const [previewExercise, setPreviewExercise] = useState(null);

    const handleNavbarClick = (index) => {
        console.log('ExerciseNavbar HandleClick index: ', index, sub_category);
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

    const handleAdminOptionsOnClick = (isNewExericse) => {
        if(!(props.auth.user.isAdmin === true)) return;
        if(isNewExericse) {
            setPreviewExercise({
                    description: {
                        description_body: [],
                        description_header: ""
                    },
                    difficulty: 3,
                    sub_category: [],
                    img_src: [],
                    img_description: [],
                    exercise_id: "",
                    category: "",
                    questions: [],
                });
        }
        setEditExerciseActive(props.auth.user.isAdmin && !isEditExerciseActive);
    };

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar handleClick={handleNavbarClick} currentIndex={exerciseIndex}/>
            <div className="exercise-container">
                <div className="exercise-content">
                    {currentExercise && 
                        <ExerciseCard exercise={previewExercise ? previewExercise : currentExercise} current_sub_category={sub_category}/> 
                    }
                    {(isEditExerciseActive && currentExercise) && <EditExercise currentExercise={previewExercise ? previewExercise : currentExercise} setPreview={setPreviewExercise}/>}
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
import React from 'react';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import { rateExercise, getSubCategoryExercises } from '../../actions/exerciseActions';

export const RatingCard = ({ exercise_id, user_difficulty, rateExercise, getSubCategoryExercises, ...props }) => {

    const category = useSelector(state => state.exercise.category);
    const sub_category = useSelector(state => state.exercise.sub_category);

    const handleOnClick = e => {
        console.log("Innan ", e.target.value);
        // console.log(user_difficulty)
        onRating(e.target.value)
    };

    const onRating = async (rating) => {
        await rateExercise(exercise_id, rating);
        console.log("Efter ", rating, category, sub_category);
        await getSubCategoryExercises(category, sub_category);
    };


    return (
        <div className="rating-container">
            <h4>Hur svår var den här uppgiften?</h4> 
            <div className="rating-btn-container">
                <button className={`rating-btn ${user_difficulty === 1 ? "easy": ""}`} title="Väldigt lätt" value={1} onClick={handleOnClick}>1</button>
                <button className={`rating-btn ${user_difficulty === 2 ? "intermediate": ""}`} title="Lätt" value={2} onClick={handleOnClick}>2</button>
                <button className={`rating-btn ${user_difficulty === 3 ? "medium": ""}`} title="Medel" value={3} onClick={handleOnClick}>3</button>
                <button className={`rating-btn ${user_difficulty === 4 ? "hard": ""}`} title="Svår" value={4} onClick={handleOnClick}>4</button>
                <button className={`rating-btn ${user_difficulty === 5 ? "extreme": ""}`} title="Väldigt svår" value={5} onClick={handleOnClick}>5</button>
            </div>
        </div>
    )
}

RatingCard.propTypes = {
    rateExercise: PropTypes.func.isRequired
    // getSubCategoryExercises: PropTypes.func.isRequired,
    // exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    { rateExercise, getSubCategoryExercises } // TODO: Actions for ExercisesPage
)(RatingCard)


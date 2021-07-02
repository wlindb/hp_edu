import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect, useSelector } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';
import { getUserProgress, setCategory } from '../../actions/exerciseActions';

const CategoriesPage = ({ getUserProgress, setCategory, exercise, ...props } ) => {

    const [subCategories, setSubCategories] = useState([]);

    const { isExerciseMetaLoaded, exercises_meta } = useSelector(state => state.exercise)

    useEffect(() => {
        if(!isExerciseMetaLoaded) {
            getUserProgress()
        }
        console.log('useEffect exercise = ', exercise);

    }, [isExerciseMetaLoaded]);

    useEffect(() => {
        console.log('useEffect exercise.section = ', exercise.section)
        if(exercise.section === "kvant") {
            console.log('quant = ', exercises_meta.quant);
            setSubCategories(exercises_meta.quant)
        } else {
            console.log('verb = ', exercises_meta.verb);
            setSubCategories(exercises_meta.verb)
        }

    }, [exercises_meta]);

    return (
        <div className="dashboard-container">
            <div className="my-tracks">
                <div className="v2-section-header">
                    <h2 className="ui-header">Dina Kunskaper</h2>
                </div>
                <div className="tracks-row">
                    {subCategories.map((e, i) => {
                        const card_title = e._id; // XYZ, KVA, etc...
                        return <ProgressCard
                                        key={i}
                                        title={card_title}
                                        link={`/exercises/${exercise.section}/${card_title.toLowerCase()}`}
                                        active={false}
                                        nrSolvedExercises={e.user_amount}
                                        totalNrOfExercises={e.number_of_category_exercises}
                                        onCardClicked={() => {setCategory(card_title)}}
                                    />
                    })}
                </div>
            </div>
        </div>
    )
}

CategoriesPage.propTypes = {
    getUserProgress: PropTypes.func.isRequired,
    setCategory: PropTypes.func.isRequired,
    exercise: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    exercise: state.exercise,
    isExerciseMetaLoaded: state.exercise.isExerciseMetaLoaded
});

export default connect(
    mapStateToProps,
    { getUserProgress, setCategory }
)(CategoriesPage)
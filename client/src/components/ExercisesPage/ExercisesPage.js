import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ExerciseNavbar from '../ExerciseNavbar/ExerciseNavbar';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import StopWatch from '../StopWatch/StopWatch';
import { getSubCategoryExercises } from '../../actions/exerciseActions';


export const ExercisesPage = ({ getSubCategoryExercises, ...props }) => {

    useEffect(() => {
        // TODO: Fetch only when exercises are not in memory.
        console.log('Exercisepage useeffect');
        getSubCategoryExercises("XYZ", "Ekvationer");
        console.log('efter');
    }, []);

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar/>
            <div className="exercise-container">
                <div className="exercise-content">
                    <ExerciseCard/>
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

ExercisesPage.propTypes = {};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getSubCategoryExercises } // TODO: Actions for ExercisesPage
)(ExercisesPage)
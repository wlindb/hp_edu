import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';
import ExerciseNavbar from '../ExerciseNavbar/ExerciseNavbar';


export const ExercisesPage = (props) => {

    return (
        <div className="exercisepage-container">
            <ExerciseNavbar/>
            <div className="exercise-container">
                <div className="exercise-card">
                    Exercise
                </div>
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
    {} // TODO: Actions for ExercisesPage
)(ExercisesPage)
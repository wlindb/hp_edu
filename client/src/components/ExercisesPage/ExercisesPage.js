import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';


export const ExercisesPage = (props) => {

    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        // TODO fetch these along with the exercises
        if(props.match.params.category === "kvant") {
            setSubCategories(["XYZ","KVA","NOG","DTK"]);
        } else {
            setSubCategories(["ORD","LÄS","MEK","ELF"]);
        }
    }, [props.match.params.category])

    return (
        <div className="dashboard-container">
            <div className="my-tracks">
                <div className="v2-section-header">
                    <h2 className="ui-header">Dina Kunskaper</h2>
                </div>
                <div className="tracks-row">
                    {subCategories.map((title, i) => {
                        return <ProgressCard
                                key={i}
                                title={title}
                                link={`/exercises/${props.match.params.category}/${title.toLowerCase()}`}
                                active={false} nrSolvedExercises={i*i} totalNrOfExercises={20}/>
                    })}
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
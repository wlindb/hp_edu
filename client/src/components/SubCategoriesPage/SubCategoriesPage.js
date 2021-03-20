import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';


export const SubCategoriesPage = (props) => {

    const [subCategories, setSubCategories] = useState(["Algebra", "Ekvationer", "Svåra tal", "Jättesvåra tal", "lätta tal", "Geometri", "Procent", "Addition", "Multiplikation"]);

    useEffect(() => {
        console.log(props.match.params);
        // TODO fetch these along with the exercises
        if(props.match.params.category === "kvant") {
            // setSubCategories(["XYZ","KVA","NOG","DTK"]);
        } else {
            // setSubCategories(["ORD","LÄS","MEK","ELF"]);
        }
    }, [props.match.params.category, props.match.params.subcategory])

    return (
        <div className="dashboard-container">
            <div className="my-tracks">
                <div className="v2-section-header">
                    <h2 className="ui-header">{props.match.params.subcategory.toUpperCase()}</h2>
                </div>
                <div className="tracks-row">
                    {subCategories.map((title, i) => {
                        return <ProgressCard
                                key={i}
                                title={title}
                                link="/profile"
                                active={false} nrSolvedExercises={i*i} totalNrOfExercises={100}/>
                    })}
                </div>
            </div>
        </div>
    )
}

SubCategoriesPage.propTypes = {};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {} // TODO: Actions for ExercisesPage
)(SubCategoriesPage)
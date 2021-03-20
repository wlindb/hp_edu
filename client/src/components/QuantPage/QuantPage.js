import React from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import ProgressCard from '../ProgressCard/ProgressCard';


export const QuantPage = ({
    isAuthenticated,
}) => {
    return (
        <div className="dashboard-container">
            <div className="my-tracks">
                <div className="v2-section-header">
                    <h2 className="ui-header">Dina Kunskaper</h2>
                </div>
                <div className="tracks-row">
                    <ProgressCard title="XYZ" link="/exercises/kvant/xyz" active={true}  nrSolvedExercises={12} totalNrOfExercises={89}/>
                    <ProgressCard title="KVA" link="/exercises/kvant/kva" active={false} nrSolvedExercises={20} totalNrOfExercises={100}/>
                    <ProgressCard title="NOG" link="/exercises/kvant/nog" active={false} nrSolvedExercises={41} totalNrOfExercises={72}/>
                    <ProgressCard title="DTK" link="/exercises/kvant/dtk" active={false} nrSolvedExercises={28} totalNrOfExercises={137}/>
                </div>
            </div>
        </div>
    )
}

QuantPage.propTypes = {};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {} // TODO: Actions for Quantpage
)(QuantPage)
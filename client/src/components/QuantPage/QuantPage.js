import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';


export const QuantPage = ({
    isAuthenticated,
}) => {
    return (
        <div className="container" style={{backgroundColor: 'green', color: 'red'}}>
            <p>Välkomen till kvant</p>
        </div>
    )
}

// Profile.propTypes = {
//    dummyToggle: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps
)(QuantPage)
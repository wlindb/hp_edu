import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dummyToggle, verifyUser } from "../../actions/authActions";
import axios from 'axios';

export const Confirmation = ({
    isAuthenticated,
    dummyToggle,
    verifyUser,
    history
}) => {

    // const [username, setUserName] = useState();
    const { token } = useParams(); 

    useEffect(() => {
        verifyUser(`Bearer ${token}`, history);
    }, [token]);

    // const handleClickDummy = (e) => {
    //     e.preventDefault();
    //     console.log('dummytoggle i Profile');
    //     dummyToggle('hej');
    // };

    return (
        <div className="container" style={{backgroundColor: 'green', color: 'red'}}>
            <p>Confirmation</p>
            {/* <button onClick={handleClickDummy}>TOGGLE</button> */}
        </div>
    )
}

Confirmation.propTypes = {
   dummyToggle: PropTypes.func.isRequired,
   verifyUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { dummyToggle, verifyUser }
)(Confirmation)

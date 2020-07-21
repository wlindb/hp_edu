import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { dummyToggle } from "../../actions/authActions";
import axios from 'axios';

export const Profile = ({
    isAuthenticated,
    dummyToggle
}) => {

    const [username, setUserName] = useState();

    useEffect(() => {
        console.log('userEffect körs');
        axios
            .get('/api/profile')
            .then(res => {
                console.log('inne i axios then');
                console.log(res.data);
                setUserName(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [username]);

    const handleClickDummy = (e) => {
        e.preventDefault();
        console.log('dummytoggle i Profile');
        dummyToggle('hej');
    };

    return (
        <div className="container" style={{backgroundColor: 'green', color: 'red'}}>
            <p>Välkomen {username}</p>
            <button onClick={handleClickDummy}>TOGGLE</button>
        </div>
    )
}

Profile.propTypes = {
   dummyToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { dummyToggle }
)(Profile)

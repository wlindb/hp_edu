import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const Profile = (
    isAuthenticated
) => {

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

    return (
        <div className="container" style={{backgroundColor: 'green', color: 'red'}}>
            <p>Välkomen {username}</p>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {  }
)(Profile)

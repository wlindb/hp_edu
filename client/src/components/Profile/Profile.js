import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { isAuth } from '../../actions/authActions';
import { useParams } from 'react-router-dom';

export const Profile = (
    isAuth
) => {

    // const [usr, fetchUsr] = useState({});
    // const { id } = useParams();
    // useEffect(() => {
    //     console.log('id= ', id);
    //     const config = {
    //         credentials: "include",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             "Access-Control-Allow-Credentials": true
    //         }
    //     };
    //     const data = {
    //         id: id
    //     }
    //     axios
    //         .post("/api/users/oauth/login", data)
    //         .then(res => {
    //            const { token } = res.data;
    //            console.log('token =', token);
    //         //    localStorage.setItem("jwtToken", token);
    //         //    setAuthToken(token);
    //         //    const decoded = jwt_decode(token);
    //         //    console.log('decoded = \n',decoded);
    //         //    dispatch(setCurrentUser(decoded));
    //         //    dispatch(toggleUserLoading());
    //         })
    //         .catch(err => {
    //             console.log('axios error ', err);
    //         //    dispatch(setErrors(err.response.data));
    //         //    dispatch(toggleUserLoading());
    //         });
        
    // }, [usr])

    return (
        <div style={{backgroundColor: 'green', color: 'red'}}>
            Profile
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { isAuth }
)(Profile)

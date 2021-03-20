import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { verifyUser } from "../../actions/authActions";

export const Confirmation = ({
    verifyUser,
    history
}) => {
    const { token } = useParams(); 

    useEffect(() => {
        verifyUser(`Bearer ${token}`, history);
    }, [token, verifyUser, history]);

    return (
        <div className="container" style={{backgroundColor: 'green', color: 'red'}}>
            <p>Confirmation</p>
        </div>
    )
}

Confirmation.propTypes = {
   verifyUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { verifyUser }
)(Confirmation)

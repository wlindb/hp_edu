import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProgressBar = ({ loading }) => {
   return <div className={`progress-bar ${loading ? 'is-loading' : 'not-loading'}`}/>;
};

const mapStateToProps = state => ({
   loading:
      state.auth.userLoading
});

ProgressBar.propTypes = {
   loading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ProgressBar);
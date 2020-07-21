import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const ProgressBar = ({ loading }) => {

   // const [toggle, setToggle] = useState(false) 

   // useEffect(() => {
   //    console.log('progressbar kör useEffect');
   //    setToggle(true);
   // }, [loading])

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
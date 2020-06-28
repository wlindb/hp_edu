import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Validate from "../../utils/Validate";

const SignUp = ({ history, registerUser, auth, errors, clearErrors }) => {
   const [user, setUser] = useState({
      user_name: "",
      email: "",
      password: "",
      errors: {}
   });

   // clearing error incase user switches to login page while already having errors in login page
   useEffect(() => {
      const unlisten = history.listen(() => clearErrors());
      return () => unlisten();
   }, [history, clearErrors]);

   useEffect(() => {
      if (auth.isAuthenticated) history.push("/blog");
      setUser(user => {
         return { ...user, errors };
      });
   }, [errors, auth, history]);

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleBlur = e => {
      const { name, value } = e.target;
      const err = { ...user.errors, ...Validate(name, value).errors };
      setUser({ ...user, errors: { ...err } });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { user_name, email, password } = user;
      registerUser({ user_name, email, password }, history);
   };

   return (
    <div className="register-view-wrapper" >
        <div className="register-container">
            <div className="register-box">
                <h2>Register</h2>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* <i className="fa fa-user"/> */}
                        <input
                            className="form-control"
                            name="user_name"
                            type="text"
                            required
                            placeholder="Användarnamn"
                            value={user.user_name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group">
                        {/* <i className="fa fa-user"/> */}
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            required
                            placeholder="Email"
                            value={user.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group">
                        {/* <i className="fa fa-lock"/> */}
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            required
                            placeholder="Password"
                            value={user.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={false} // TODO: Add input field and disable if errors/password does not match
                        className="register-btn"
                    >
                        Register user
                    </button>
                    <p>{errors.password}</p>
                </form>
            </div>
        </div>
    </div>
   );
};

SignUp.propTypes = {
   registerUser: PropTypes.func.isRequired,
   clearErrors: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors
});

export default connect(
   mapStateToProps,
   { registerUser, clearErrors }
)(SignUp);
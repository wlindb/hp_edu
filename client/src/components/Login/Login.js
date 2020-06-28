import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Validate from "../../utils/Validate";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

const Login = ({ loginUser, auth, errors, history, clearErrors }) => {
   const [user, setUser] = useState({
      email: "",
      password: "",
      errors: {}
   });

   const [message, setMessage] = useState("");

   // clearing error incase user switches to login page while already having errors in signup page
   useEffect(() => {
      const unlisten = history.listen(() => clearErrors());
      if (localStorage.loginMessage) {
         setMessage(localStorage.loginMessage);
         localStorage.setItem("loginMessage", "");
      }
      return () => unlisten();
   }, [history, clearErrors]);

   useEffect(() => {
      if (auth.isAuthenticated) {
         history.push("/blog");
      }
      setUser(user => {
         return { ...user, errors };
      });
   }, [auth, errors, history]);

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleBlur = e => {
      const { name, value } = e.target;
      const error = { ...user.errors, ...Validate(name, value).errors };
      setUser({ ...user, errors: { ...error } });
   };

   const handleSubmit = e => {
      e.preventDefault();
      const { email, password } = user;
      loginUser({ email, password });
   };

   return (
    <div className="login-view-wrapper" >
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        {/* <i className="fa fa-user"/> */}
                        <input 
                            name="email"
                            type="email"
                            placeholder="Username"
                            className="form-control"
                            value={user.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="form-group">
                        {/* <i className="fa fa-lock"/> */}
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={user.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <button type="submit" className="login-btn">Login</button>
                    <div>
                        Inget konto?
                        <Link to={"/signup"}>SignUp</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
   );
};

Login.propTypes = {
   loginUser: PropTypes.func.isRequired,
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
   { loginUser, clearErrors }
)(Login);
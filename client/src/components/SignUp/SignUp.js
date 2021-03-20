import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, loginUserOauth, resendVerification } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import Validate from "../../utils/Validate";
import SocialMediaContainer from "../SocialMediaContainer/SocialMediaContainer";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


const SignUp = ({ history, registerUser, loginUserOauth, resendVerification, auth, errors, clearErrors, messages }) => {
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
      if (auth.isAuthenticated) history.push("/profile");
      setUser(user => {
         return { ...user, errors };
      });
   }, [errors, auth, history]);

   // id: url param, redirecting to /signup/success
   // Then validate user on the backend
   const { id } = useParams();
   useEffect(() => {
      if(id) {
         loginUserOauth(history);
      }
   }, [id, loginUserOauth, history]);

   const handleChange = e => {
      setUser({
         ...user,
         [e.target.name]: e.target.value
      });
   };

   const handleResend = e => {
      e.preventDefault();
      // TODO: fetch /api/users/resendVerification
      // const { user_name, email, password } = user;
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
    <div className="container" id="container" >
        <div className="form-container sign-up-container">
            { messages.signUpSuccess ? 
            <div className="text-section-small">
               <div>
                  <h1>Nästan klart...</h1>
                  {/* <p>Vad kul att du bestämt dig för att besegra högskoleprovet!</p> */}
                  <p>{messages.signUpSuccess}</p>
                  <p>Vänligen klicka på verifiera i epostmeddelandet för att gå vidare.</p>
               </div>
               <div className="info-link">
                  Har du inte fått något meddelande? <br/>
                  <a href={handleResend}>Skicka igen</a>
               </div>
            </div>
            :
            <>
            <form id="form" onSubmit={handleSubmit}>
            <h1>Skapa Konto</h1>
               <SocialMediaContainer/>
                <span>eller registrera manuellt</span>
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
                {/* <i className="fa fa-user"/> */}
                <p className="p-error">{errors.user_name}</p>
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
                {/* <i className="fa fa-lock"/> */}
                <p className="p-error">{errors.email}</p>
                <input
                    className="form-control"
                    name="password"
                    type="password"
                    required
                    placeholder="Lösenord"
                    value={user.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <p className="p-error">{errors.password}</p>
                <button
                    type="submit"
                    disabled={false} // TODO: Add input field and disable if errors/password does not match
                    className="btn-primary"
                >
                    Registrera
                    </button>
            </form>
            <div className="info-link">
               Har du redan ett konto? <br/>
               <Link to={"/login"}>Logga in</Link>
            </div>
            </>
            }
        </div>
    </div>
   );
};

SignUp.propTypes = {
   registerUser: PropTypes.func.isRequired,
   loginUserOauth: PropTypes.func.isRequired,
   resendVerification: PropTypes.func.isRequired,
   clearErrors: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   errors: PropTypes.object.isRequired,
   messages: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   auth: state.auth,
   errors: state.errors,
   messages: state.messages
});

export default connect(
   mapStateToProps,
   { registerUser, loginUserOauth, resendVerification, clearErrors }
)(SignUp);
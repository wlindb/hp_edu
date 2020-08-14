import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from "./types";
import { setErrors } from "./errorActions";
import { setMessage } from './messageActions';

export const registerUser = (userData, history) => dispatch => {
   dispatch(toggleUserLoading());
   axios
      .post("/api/users/signup", userData)
      .then(res => {
         console.log('authActions res', res);
         dispatch(toggleUserLoading());
         localStorage.setItem(
            "loginMessage",
            "Successfully registered. Login to continue"
         );
         // history.push("/login");
         dispatch(setMessage({ signUpSuccess: res.data }));
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
      });
};

export const resendVerification = (userData, history) => dispatch => {
   dispatch(toggleUserLoading());
   axios
      .post("/api/users/resendVerification", userData)
      .then(res => {
         console.log('resendVerification res', res);
         localStorage.setItem(
            "loginMessage",
            "Successfully registered. Login to continue"
            );
            // history.push("/login");
         dispatch(setMessage({ signUpSuccess: res.data }));
         dispatch(toggleUserLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
      });
};

export const loginUserOauth = (history) => dispatch => {
   axios
      .get('/api/users/auth/login/success')
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
         setAuthToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentUser(decoded));
         dispatch(toggleUserLoading());
         history.push("/profile");
      })
      .catch(err => {
         console.log('axios error ', err);
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
      });
};

export const loginUser = userData => dispatch => {
   dispatch(toggleUserLoading());
   axios
      .post("/api/users/login", userData)
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
         setAuthToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentUser(decoded));
         dispatch(toggleUserLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
      });
};

export const verifyUser = (token, history) => dispatch => {
   dispatch(toggleUserLoading());
   localStorage.setItem("jwtToken", token);
   setAuthToken(token);
   axios
      .post('/api/users/confirmation')
      .then(res => {
         const { user } = res.data;
         if(user) {
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            dispatch(toggleUserLoading());
            history.push('/profile');
         } else {
            console.log('authAction verifyUser :( ');
            dispatch(toggleUserLoading());
         }
      })
      .catch(err => {
         console.log('error i authAction verifyUser :( ', err.response.data)
         dispatch(setErrors(err.response.data));
         localStorage.removeItem("jwtToken");
         setAuthToken(false);
         dispatch(setCurrentUser({}));
         dispatch(toggleUserLoading());
      })
};

export const setCurrentUser = userData => {
   return {
      type: SET_CURRENT_USER,
      payload: userData
   };
};

export const dummyToggle = wth => dispatch => {
   console.log('dummytoggle i authActions');
   dispatch(toggleUserLoading());
};

export const toggleUserLoading = () => {
   console.log('toggleUserLoading');
   return {
      type: TOGGLE_USER_LOADING
   };
};

export const logoutUser = () => dispatch => {
   localStorage.removeItem("jwtToken");
   setAuthToken(false);
   dispatch(setCurrentUser({}));
};
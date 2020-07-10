import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER, TOGGLE_USER_LOADING } from "./types";
import { setErrors } from "./errorActions";

export const registerUser = (userData, history) => dispatch => {
   dispatch(toggleUserLoading());
   axios
      .post("/api/users/signup", userData)
      .then(res => {
         dispatch(toggleUserLoading());
         localStorage.setItem(
            "loginMessage",
            "Successfully registered. Login to continue"
         );
         history.push("/login");
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
         console.log('token =', token);
         localStorage.setItem("jwtToken", token);
         setAuthToken(token);
         const decoded = jwt_decode(token);
         console.log('decoded = \n',decoded);
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
         console.log('decoded = \n',decoded);
         dispatch(setCurrentUser(decoded));
         dispatch(toggleUserLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleUserLoading());
      });
};

export const isAuth = dispatch => {
   console.log('is Auth körs');
   axios
      .get("/api/profile")
      .then(res => {
         const { token } = res.data;
         localStorage.setItem("jwtToken", token);
         setAuthToken(token);
         const decoded = jwt_decode(token);
         dispatch(setCurrentUser(decoded));
      })
      .catch(err => {
         console.log('isAuth error ', err);
      });
};

export const setCurrentUser = userData => {
   return {
      type: SET_CURRENT_USER,
      payload: userData
   };
};

export const toggleUserLoading = () => {
   return {
      type: TOGGLE_USER_LOADING
   };
};

export const logoutUser = () => dispatch => {
   localStorage.removeItem("jwtToken");
   setAuthToken(false);
   dispatch(setCurrentUser({}));
};
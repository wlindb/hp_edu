
import axios from "axios";
import { TOGGLE_USER_LOADING } from "./types";

export const getUserProgress = () => dispatch => {
    console.log('Inne i getUserProgress');
    dispatch(toggleUserLoading());
    axios
        .get("/api/excercises/progress")
        .then(res => {
            console.log('getUserProgress res', res);
            dispatch(toggleUserLoading());
        })
        .catch(err => {
            console.log('getUserProgress res ERROR', err);
            dispatch(toggleUserLoading());
        });
};


export const toggleUserLoading = () => {
   console.log('toggleUserLoading');
   return {
      type: TOGGLE_USER_LOADING
   };
};

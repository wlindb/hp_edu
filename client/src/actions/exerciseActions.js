
import axios from "axios";
import { SET_EXERCISES_META, SET_IS_EXERCISES_META_LOADED, SET_CATEGORY, SET_SUB_CATEGORY, SET_EXERCISE_SECTION } from "./types";
import { toggleUserLoading } from './authActions'

export const getUserProgress = () => dispatch => {
    console.log('Inne i getUserProgress');
    dispatch(toggleUserLoading());
    axios
        .get("/api/excercises/progress")
        .then(res => {
            // console.log('getUserProgress res', res);
            const user_exercise_progress = res.data;
            user_exercise_progress.sort((exercise_group1, exercise_group2) => exercise_group1._id < exercise_group2._id)
            let exercise_meta = {quant: [], verb: []}
            user_exercise_progress.forEach(exercise_group => {
                if (exercise_group._id === "XYZ" || exercise_group._id === "KVA" || exercise_group._id === "NOG" || exercise_group._id === "DTK") {
                    exercise_meta.quant.push(exercise_group)
                } else {
                    exercise_meta.verb.push(exercise_group)
                }
            })
            console.log(exercise_meta)
            dispatch(setExercisesMeta(exercise_meta));
            dispatch(setIsExercisesMetaLoaded(true));
            dispatch(toggleUserLoading());
        })
        .catch(err => {
            console.log('getUserProgress res ERROR', err);
            dispatch(toggleUserLoading());
        });
};

export const setExercisesMeta = exercisesMeta => {
    return {
        type: SET_EXERCISES_META,
        payload: exercisesMeta
    };
};

export const setIsExercisesMetaLoaded = (bool) => {
    return {
       type: SET_IS_EXERCISES_META_LOADED,
       payload: bool
    };
};

export const setCategory = category_string => dispatch => {
    return dispatch({
        type: SET_CATEGORY,
        payload: category_string
    });
};

export const setSubCategory = sub_category_string => dispatch => {
    return dispatch({
        type: SET_SUB_CATEGORY,
        payload: sub_category_string
    });
};

export const setSection = section_string => dispatch => {
    return dispatch({
        type: SET_EXERCISE_SECTION,
        payload: section_string
    });
};

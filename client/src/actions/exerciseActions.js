
import axios from "axios";
import { SET_EXERCISES_META, SET_IS_EXERCISES_META_LOADED, SET_CATEGORY, SET_SUB_CATEGORY, SET_EXERCISE_SECTION, SET_SUB_CATEGORY_EXERCISES, SET_SUB_CATEGORY_EXERCISES_IF_EMPTY } from "./types";
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
            const initialExercises = {}; // e.g. { XYZ: ["Ekvationssystem", "Problemlösning", "Ekvationer", "Prioriteringsregler"] }
            user_exercise_progress.forEach(exercise_group => {
                if (exercise_group._id === "XYZ" || exercise_group._id === "KVA" || exercise_group._id === "NOG" || exercise_group._id === "DTK") {
                    exercise_meta.quant.push(exercise_group)
                } else {
                    exercise_meta.verb.push(exercise_group)
                }
                initialExercises[exercise_group._id] = exercise_group.sub_category.map(sub_cat => sub_cat.name);
            })
            console.log('getUserProgress initialExercises', initialExercises);
            console.log(exercise_meta)
            dispatch(setExercisesMeta(exercise_meta));
            dispatch(setIsExercisesMetaLoaded(true));
            dispatch(setInitialExercises(initialExercises));
            dispatch(toggleUserLoading());
        })
        .catch(err => {
            console.log('getUserProgress res ERROR', err);
            dispatch(toggleUserLoading());
        });
};

export const getSubCategoryExercises = (category_string, sub_category_string) => dispatch => {
    console.log('Inne i getSubCategoryExercises');
    dispatch(toggleUserLoading());
    axios
        .get(`/api/excercises/${category_string}/${sub_category_string}`)
        .then(res => res.data)
        .then(sub_category_exercises => {
            // console.log('getUserProgress res', res);
            // const sub_category_exercises = res.data;
            console.log('sub_category_exercise : ', sub_category_exercises);
            dispatch(setSubCategoryExercises(sub_category_exercises));
            dispatch(toggleUserLoading());
        })
        .catch(err => {
            console.log('getUserProgress res ERROR', err);
            dispatch(toggleUserLoading());
        });
};

export const rateExercise = (exercise_id, user_difficulty) => dispatch => {
    console.log("Rate exercise", exercise_id, user_difficulty);
    dispatch(toggleUserLoading());
    axios
        .post("/api/excercises/completed", {exercise_id, user_difficulty})
        // .then(res => res.data)
        .then(res => {
            // TODO UPDATE EXERCISE ON FRONTEND
            // console.log('inne i then', res.status);
            dispatch(toggleUserLoading());
            // return res.status === 200;
            // dispatch(setMessage({ signUpSuccess: res.data }));
        })
        .catch(err => {
            // dispatch(setErrors(err.response.data));
            dispatch(toggleUserLoading());
            // return false;
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

export const setInitialExercises = initialExercises => {
    return {
        type: SET_SUB_CATEGORY_EXERCISES_IF_EMPTY,
        payload: initialExercises
    };
};

export const setSubCategoryExercises = (sub_category_exercises) => {
    return {
       type: SET_SUB_CATEGORY_EXERCISES,
       payload: sub_category_exercises
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

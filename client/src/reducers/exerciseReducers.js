import { SET_EXERCISES_META, SET_IS_EXERCISES_META_LOADED, SET_CATEGORY, SET_SUB_CATEGORY, SET_EXERCISE_SECTION, SET_SUB_CATEGORY_EXERCISES } from "../actions/types";

const initialState = {
   section: '',
   category: '',
   sub_category: '',
   isExerciseMetaLoaded: false,
   exercises_meta: {
      quant: [],
      verb: []
   },
   exercises: {}
};

export default function(state = initialState, action) {
   switch (action.type) {
      case SET_EXERCISES_META:
         return {
            ...state,
            exercises_meta: action.payload
         }
      case SET_IS_EXERCISES_META_LOADED:
         return {
            ...state,
            isExerciseMetaLoaded: action.payload
         }
      case SET_CATEGORY:
         return {
            ...state,
            category: action.payload
         }
      case SET_SUB_CATEGORY:
         return {
            ...state,
            sub_category: action.payload
         }
      case SET_EXERCISE_SECTION:
         return {
            ...state,
            section: action.payload
         }
      case SET_SUB_CATEGORY_EXERCISES:
         return {
            ...state,
            exercises: {
               ...state.exercises,
               [state.sub_category]: action.payload 
            } 
         }
      default:
         return state;
   }
}
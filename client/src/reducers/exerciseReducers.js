import { SET_EXERCISES_META, SET_IS_EXERCISES_META_LOADED, SET_CATEGORY, SET_SUB_CATEGORY, SET_EXERCISE_SECTION, SET_SUB_CATEGORY_EXERCISES, SET_SUB_CATEGORY_EXERCISES_IF_EMPTY } from "../actions/types";

const initialState = {
   section: '',
   category: '',
   sub_category: '',
   isExerciseMetaLoaded: false,
   exercises_meta: {
      quant: [],
      verb: []
   },
   exercises: { XYZ: {}, KVA: {}, DTK: {}, NOG: {}, LÄS: {}, MEK: {}, ORD: {}, ELF: {}}
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
               [state.category]: {
                  ...state.exercises[state.category],
                  [state.sub_category]: action.payload 
               },
            } 
         }
      case SET_SUB_CATEGORY_EXERCISES_IF_EMPTY:
         const categories_with_sub_categories = action.payload; // e.g. { XYZ: ["Ekvationssystem", "Problemlösning", "Ekvationer", "Prioriteringsregler"] }
         let newExercises = {}
         Object.entries(categories_with_sub_categories).forEach(([cat, sub_cat_array]) => {
            newExercises[cat] = {}
            sub_cat_array.forEach(sub_cat => {
               if(state.exercises[cat][sub_cat] === undefined) {
                  newExercises[cat][sub_cat] = [];
               } else {
                  newExercises[cat][sub_cat] = state.exercises[cat][sub_cat];
               }
            })
         })
         return {
            ...state,
            exercises: newExercises
         }
      default:
         return state;
   }
}
import { SET_EXERCISES_META, SET_IS_EXERCISES_META_LOADED } from "../actions/types";

const initialState = {
   isExerciseMetaLoaded: false,
   exercises_meta: {
      quant: [],
      verb: []
   }
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
      default:
         return state;
   }
}
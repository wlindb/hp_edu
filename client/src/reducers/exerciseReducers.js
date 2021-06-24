import { TOGGLE_USER_LOADING, SET_EXERCISES_META } from "../actions/types";

const initialState = {
   userLoading: false,
   exercises_meta: {}
};

export default function(state = initialState, action) {
   switch (action.type) {
      case TOGGLE_USER_LOADING:
         return {
            ...state,
            userLoading: !state.userLoading
         };
      case SET_EXERCISES_META:
         return {
            ...state,
            exercises_meta: action.payload
         }
      default:
         return state;
   }
}
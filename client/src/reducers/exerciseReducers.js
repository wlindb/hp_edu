import { TOGGLE_USER_LOADING } from "../actions/types";

const initialState = {
   userLoading: false
};

export default function(state = initialState, action) {
   switch (action.type) {
      case TOGGLE_USER_LOADING:
         return {
            ...state,
            userLoading: !state.userLoading
         };
      default:
         return state;
   }
}
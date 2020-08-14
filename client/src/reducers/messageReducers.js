import { SET_MESSAGE } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
   switch (action.type) {
      case SET_MESSAGE:
         return action.payload;
      default:
         return state;
   }
}
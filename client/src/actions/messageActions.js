import { SET_MESSAGE } from "./types";

export const setMessage = msg => {
   return {
      type: SET_MESSAGE,
      payload: msg
   };
};

export const clearMessage = () => {
   return {
      type: SET_MESSAGE,
      payload: {}
   };
};

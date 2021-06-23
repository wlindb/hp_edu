import { combineReducers } from 'redux';
import authReducer from './authReducers';
import errorReducer from './errorReducers';
import messageReducer from './messageReducers';
import exerciseReducer from './exerciseReducers'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    messages: messageReducer,
    exercise: exerciseReducer
});
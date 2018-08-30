import {
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS
  } from '../actions/types';
  
  export default function(state = {}, action) {
    switch (action.type) {
      case GOOGLE_LOGIN_SUCCESS:
        return { token: action.payload };
      case GOOGLE_LOGIN_FAIL:
        return { token: null };
      default:
        return state;
    }
  }
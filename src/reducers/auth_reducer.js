import {
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    SET_HIGHSCORE
} from '../actions/types';

const INITIAL_STATE = {
    token: null,
    highscore: 0
}

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case GOOGLE_LOGIN_SUCCESS:
        return { ...state, token: action.payload };
        case GOOGLE_LOGIN_FAIL:
        return { ...state, token: null };
        case SET_HIGHSCORE:
        return { ...state, highscore: action.payload };
        default:
        return state;
    }
}
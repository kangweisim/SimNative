import {
  GAME_NUMBER_PRESSED_CORRECT
} from '../actions/types';

const INITIAL_STATE = {
  input: [{num: "3"}, {num:"."}],
  currentIndex: 0
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_NUMBER_PRESSED_CORRECT:
    return { 
      ...state, 
      input: [...state.input, {num: action.payload}], 
      currentIndex: state.currentIndex + 1
    };
    default:
    return state;
  }
}
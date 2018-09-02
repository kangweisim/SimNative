import {
  GAME_NUMBER_PRESSED_CORRECT, 
  GAME_NUMBER_PRESSED_WRONG, 
  GAME_RESET
} from '../actions/types';

const INITIAL_STATE = {
  input: [{num: "3"}, {num:"."}],
  currentIndex: 0,
  gameEnded: false
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GAME_NUMBER_PRESSED_CORRECT:
      return { 
        ...state, 
        input: [...state.input, {num: action.payload}], 
        currentIndex: state.currentIndex + 1
      };
    case GAME_NUMBER_PRESSED_WRONG:
      return {
        ...state, gameEnded: true
      }
    case GAME_RESET:
      return {
        ...INITIAL_STATE
      }
    default:
      return state;
  }
}
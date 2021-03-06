import { AsyncStorage } from 'react-native';
import { PI_LIST } from '../config/constants';

import {
    GAME_NUMBER_PRESSED_CORRECT,
    GAME_NUMBER_PRESSED_WRONG,
    GAME_RESET,
    SET_HIGHSCORE
} from './types';

export const pressNumber = (navigation, { number, currentIndex, highscore }) => dispatch => {
    if (PI_LIST[currentIndex] === number) {
        dispatch({ type: GAME_NUMBER_PRESSED_CORRECT, payload: number });
        if (currentIndex + 1 > highscore) dispatch({ type: SET_HIGHSCORE, payload: currentIndex + 1 });
        return true;
    } else {
        dispatch({ type: GAME_NUMBER_PRESSED_WRONG });
        return false;
    }
};

export const reset = () => dispatch => {
    dispatch({ type: GAME_RESET })
};

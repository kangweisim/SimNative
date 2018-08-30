import { AsyncStorage } from 'react-native';
import { PI_LIST } from '../config/constants';

import {
    GAME_NUMBER_PRESSED_CORRECT,
    GAME_NUMBER_PRESSED_WRONG,
    SET_HIGHSCORE
} from './types';

export const pressNumber = (navigation, { number, currentIndex, highscore }) => dispatch => {
    if (PI_LIST[currentIndex] === number) {
        dispatch({ type: GAME_NUMBER_PRESSED_CORRECT, payload: number });
        console.log(currentIndex, highscore);
        if (currentIndex + 1 > highscore) dispatch({ type: SET_HIGHSCORE, payload: currentIndex + 1 });
    } else {
        dispatch({ type: GAME_NUMBER_PRESSED_WRONG, payload: number });
    }
};

import { AsyncStorage } from 'react-native';
import { PI_LIST } from '../config/constants';

import {
    GAME_NUMBER_PRESSED_CORRECT,
    GAME_NUMBER_PRESSED_WRONG
} from './types';

export const pressNumber = (navigation, {number, currentIndex, list}) => dispatch => {
    if (PI_LIST[currentIndex] === number) {
        dispatch({ type: GAME_NUMBER_PRESSED_CORRECT, payload: number });
        return true;
    }
};

import { combineReducers } from 'redux';
import auth from './auth_reducer';
import game from './game_reducer';

export default combineReducers({
  auth, game
});
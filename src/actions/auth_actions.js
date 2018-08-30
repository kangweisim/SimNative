import { AsyncStorage } from 'react-native';
import { Google } from 'expo';

import {
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAIL,
  SET_HIGHSCORE
} from './types';

// How to use AsyncStorage:
// AsyncStorage.setItem('fb_token', token);
// AsyncStorage.getItem('fb_token');

export const googleLogin = (navigation) => async dispatch => {
  let token = await AsyncStorage.getItem('google_token');

  if (token) {
    // Dispatch an action saying FB login is done
    dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login process
    doGoogleLogin(dispatch, navigation);
  }
};

const doGoogleLogin = async (dispatch, navigation) => {
    try {
      const { type, accessToken } = await Expo.Google.logInAsync({
        androidClientId: "",
        iosClientId: "819324643725-5arrip9a7ciucs1i3v2jniitl8cdfvsg.apps.googleusercontent.com",
        scopes: ['profile', 'email'],
      });
  
      if (type === 'cancel') {
          return dispatch({ type: GOOGLE_LOGIN_FAIL });
      }
  
      await AsyncStorage.setItem('google_token', accessToken);
      dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
  
      return true;
    } catch(err) {
      navigation.navigate('Welcome');
    }
};
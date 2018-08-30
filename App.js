import React, { Component } from 'react';
import {
  createBottomTabNavigator,
  createSwitchNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { StyleSheet, Button, Text, View, } from 'react-native';
import AuthLoadingScreen from './src/screens/AuthLoadingScreen';
import Main from './src/Main';

const app = createSwitchNavigator({
  AuthLoading: AuthLoadingScreen
})

export default class App extends Component {
  render() {
    return (
      <Main />
    );
  }
}
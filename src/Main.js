import React, { Component } from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createDrawerNavigator
} from 'react-navigation';
import { Provider } from 'react-redux';
import store from './store';
import { ScreenOrientation } from 'expo';
import { StatusBar } from 'react-native';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen'
import WelcomeScreen from './screens/WelcomeScreen';
import SideMenu from './components/SideMenu';
import LearnScreen from './screens/LearnScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen });
const AppStack = createDrawerNavigator({ 
    Home: HomeScreen,
    Learn: LearnScreen
}, {
    contentComponent: (props) => (
        <SideMenu {...props} />
    )
});


const MainApp = createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    Welcome: WelcomeScreen,
    Auth: AuthStack,
    App: AppStack
}, {
    initialRouteName: 'AuthLoading'
})

export default class Main extends Component {
    componentWillMount() {
        StatusBar.setHidden(true);
    }
    render() {
        
        return (
            <Provider store={store}>
                <MainApp />
            </Provider>
        );
    }
}
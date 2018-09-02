import React, { Component } from 'react';
import { Font, AppLoading } from 'expo'; 
import Main from './src/Main';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { fontLoaded: false };
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
      'montserrat-light': require('./assets/fonts/Montserrat-Light.ttf'),
      'montserrat-extralight': require('./assets/fonts/Montserrat-ExtraLight.ttf'),
      'montserrat-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
      'montserrat': require('./assets/fonts/Montserrat-Regular.ttf')
    });
    this.setState({ fontLoaded: true });
  }
  
  
  render() {
    if (!this.state.fontLoaded) return (
      <AppLoading />
    );

    return (
      <Main />
    );
  }
}
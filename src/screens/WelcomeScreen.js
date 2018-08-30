import lodash from 'lodash';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import { Slides } from '../components/commons';

const SLIDE_DATA = [
    { text: "Use the power of rote learning", color: "#B22222" },
    { text: "Memorize 𝛑 like never before", color: "#B22222" }
]

class WelcomeScreen extends Component {
    state = { token: null }
  
    async componentWillMount() {
      let token = await AsyncStorage.getItem('google_token');
  
      if (token) {
        this.props.navigation.navigate('App');
        this.setState({ token });
      } else {
        this.setState({ token: false });
      }
    }
  
    onSlidesComplete = () => {
      this.props.navigation.navigate('Auth');
    }
  
    render() {
      if (lodash.isNull(this.state.token)) {
        return <AppLoading />;
      }
  
      return (
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
      );
    }
  }
  
  export default WelcomeScreen;
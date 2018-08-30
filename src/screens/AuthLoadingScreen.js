import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Spinner } from '../components/commons';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('google_token');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(token ? 'App' : 'Welcome');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.loadStyle}>
        <StatusBar barStyle="default" />
        <View style={styles.spinnerViewStyle}>
            <Spinner size="large"/>
        </View>
      </View>
    );
  }
}

const styles = {
    loadStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    spinnerViewStyle: {
        flex: 2
    },
}
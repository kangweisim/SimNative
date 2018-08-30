import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { googleLogin } from '../actions';


class SignInScreen extends Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    componentDidMount() {
        let signedIn = this.props.googleLogin();
        if (signedIn) this.props.navigation.navigate('App');
    }
    
    render() {
        return (
            <View style={{flex: 1}}>
                <Button title="Sign in!" onPress={this._signInAsync} />
            </View>
        );
    }
    
    _signInAsync = async () => {
        // await AsyncStorage.setItem('token', 'abc');
        // this.props.navigation.navigate('App');
    };
}

function mapStateToProps({ auth }) {
    return { token: auth.token };
}

export default connect(mapStateToProps, { googleLogin })(SignInScreen);
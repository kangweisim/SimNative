import React from 'react';
import {
    AsyncStorage,
    Text,
    Button,
    View,
    ScrollView,
    Image,
    Platform,
    StyleSheet
} from 'react-native';
import { DrawerItems } from 'react-navigation';

export default class SideMenu extends React.Component {
    
    constructor(props) {
        super(props);
    }
    
    _renderIcon() {
        return <Image style={styles.icon} source={require('../../assets/spiro.png')}/>
        
    }
 
    _signOutAsync = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    };
    
    render() {
        return (
            <View>
            <ScrollView
            showsVerticalScrollIndicator={false}>
            <View style={[styles.container, styles.content]}>
            {this._renderIcon()}
            <Text>Sim Native</Text>
            </View>
            <DrawerItems {...this.props} />
            <Button title="Logout" onPress={this._signOutAsync}/>
            </ScrollView>
            </View>
        )
    }
}

let styles = {
    container: {
        height: 80,
        paddingHorizontal: 16,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: "#ffffff"
    },
    root: {
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
        backgroundColor: "#ffffff"
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        marginRight: 13,
        height: 50,
        width: 50
    }
};
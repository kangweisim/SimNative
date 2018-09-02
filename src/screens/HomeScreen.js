import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableHighlight } from 'react-native';
import Expo from 'expo';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { pressNumber } from '../actions'
import PiList from '../components/PiList';
import Score from '../components/Score';

const paddingValue = 8;

const BUTTONS = [
    {text: "1", value: 1, pressed: false},
    {text: "2", value: 2, pressed: false},
    {text: "3", value: 3, pressed: false},
    {text: "4", value: 4, pressed: false},
    {text: "5", value: 5, pressed: false},
    {text: "6", value: 6, pressed: false},
    {text: "7", value: 7, pressed: false},
    {text: "8", value: 8, pressed: false},
    {text: "9", value: 9, pressed: false},
    {text: "0", value: 0, pressed: false},
]


class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
        this.state = {
            buttons: [...BUTTONS]
        }
    }
    
    async componentWillMount() {
        this.errorSound = new Expo.Audio.Sound();
        
        try {
            await this.errorSound.loadAsync(require('../../assets/error.mp3'));
        } catch(err) {
            console.log(err);
        }
    };

    renderItem({item, index}) {
        return (
            <View style={{justifyContent: 'flex-end' }}>
                <Text style={{fontSize: 50, color: "#ffffff", fontFamily: 'montserrat-medium' }}>{item.num}</Text>
            </View>
        )
    }
    renderItem = this.renderItem.bind(this);
    
    setRef(list) {
        this.inputList = list;
    }
    setRef = this.setRef.bind(this);
    
    _calculateItemSize() {
        let {height, width} = Dimensions.get('window');
        return (width - paddingValue * 6) / 3;
    }

    componentWillReceiveProps(nextProps) {
        if (this.inputList && nextProps.currentIndex === 0) {
            this.inputList.scrollToOffset({ offset: 0, animated: false });
        }
        if (this.inputList && nextProps.currentIndex !== 0 && nextProps.currentIndex != this.props.currentIndex) {
            this.inputList.scrollToIndex({ index: this.props.input.length - 1, viewPosition: 0.4 });
        }
    }

    async onButtonPress(button) {
        let { highscore, currentIndex } = this.props;
        let success = this.props.pressNumber(this.props.navigation, {number: button.text, currentIndex, highscore});
        if (!success) {
            await this.errorSound.playFromPositionAsync(0);
        } else {
            let clickSound = new Expo.Audio.Sound();
            await clickSound.loadAsync(require('../../assets/click.mp3'));
            clickSound.playAsync();
        }
    }

    onButtonPressIn(index) {
        let buttons = [...this.state.buttons];
        buttons[index] = {...buttons[index], pressed: true}
        this.setState({ buttons });
    }

    onButtonPressOut() {
        let buttons = [...BUTTONS];

        this.setState({ buttons });
    }

    render() {
        let size = this._calculateItemSize();
        let navigate = this.props.navigation.navigate;

        return (
            <View style={{flex: 1, backgroundColor:"#FFFFFF", justifyContent: "space-between"}}>
                <Header 
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer, underlayColor: 'rgba(255,255,255,0.5)', }}
                    backgroundColor="#D32F2F"
                />
                <View style={{flex: 1, justifyContent: "space-around"}}>
                    <Score score={this.props.currentIndex} highscore={this.props.highscore}/>
                    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20, backgroundColor: '#D32F2F' }}>
                        <PiList renderItem={this.renderItem} setRef={this.setRef} data={this.props.input} />
                    </View>
                    <View style={{ flex :1, backgroundColor: "#D32F2F" }}>
                        <Text>Hello</Text>
                    </View>
                </View>
                <View style={styles.keypadsStyle}>
                    {this.renderKeypad(size)}
                </View>
            </View>
        )
    }
    
    renderKeypad(size) {
        let renderButtonContainerStyle = (button, size) => {
            let pressedStyle = button.pressed ? {
                transform: [{translateY: 4}],
                shadowOpacity: 0,
                shadowRadius: 0
            } : {};
            let buttonStyle = {
                width: size, 
                height: 40, 
                backgroundColor: "#D32F2F", 
                margin: 8, 
                justifyContent: 'center',
                borderRadius: 3,
                shadowColor: "#D32F2F",
                shadowOffset: { width: 0, height: 5},
                shadowOpacity: 1,
                shadowRadius: 0,
                borderBottomColor: "#BD2A2A",
                borderBottomWidth: 2,
            }
            return [buttonStyle, pressedStyle];
        }

        let buttons = this.state.buttons.map((button, index) => {
            return (
                <TouchableHighlight 
                    onPressIn={() => {this.onButtonPressIn(index)}}
                    onPressOut={() => {this.onButtonPressOut()}}
                    underlayColor="#fff"
                    key={button.text} 
                    onPress={() => this.onButtonPress(button)}>
                    <View style={renderButtonContainerStyle(button, size)}>
                        <Text style={{alignSelf: "center", fontSize: 30, color: '#fff', fontFamily: 'montserrat-medium'}}>
                            {button.text}{button.pressed}
                        </Text>
                    </View>
                </TouchableHighlight>
            )
        });
        return buttons;
    }
    renderKeypad = this.renderKeypad.bind(this);
}

const styles = {
    keypadsStyle: { 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-evenly',
        alignContent: 'flex-end', 
        height: 226, 
        backgroundColor: "#FFFFFF", 
        alignSelf: "flex-end",
        borderTopColor: "#D7DBE0",
        borderTopWidth: 1,
        marginTop: 0,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: -3},
        shadowColor: "#BDBDBD",
        shadowOpacity: 0.2

    }
}

const mapStateToProps = (state) => {
    let { game, auth } = state;
    return {
        input: game.input,
        currentIndex: game.currentIndex,
        highscore: auth.highscore
    }
}

export default connect(mapStateToProps, { pressNumber })(HomeScreen);
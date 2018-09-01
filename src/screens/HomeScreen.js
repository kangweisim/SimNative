import React, { Component } from 'react';
import { View, FlatList, Text, Dimensions, TouchableHighlight } from 'react-native';
import Expo from 'expo';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { pressNumber } from '../actions'
import Highscore from '../components/Highscore';

const paddingValue = 8;
const buttons = [
    {text: "1", value: 1},
    {text: "2", value: 2},
    {text: "3", value: 3},
    {text: "4", value: 4},
    {text: "5", value: 5},
    {text: "6", value: 6},
    {text: "7", value: 7},
    {text: "8", value: 8},
    {text: "9", value: 9},
    {text: "0", value: 0},
]

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
    };

    constructor(props) {
        super(props);
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
                <Text style={{fontSize: 50, color: "#ffffff"}}>{item.num}</Text>
            </View>
        )
    }
    
    
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
        }
    }

    render() {
        let size = this._calculateItemSize();
        let navigate = this.props.navigation.navigate;
        
        let renderButtonContainerStyle = (button, size) => {
            return {
                width: size, 
                height: size, 
                backgroundColor: "#D32F2F", 
                margin: 8, 
                justifyContent: 'center',
                borderRadius: 5
            }
        }
        let renderItems = () => {
            return buttons.map((button, index) => {
                return (
                    <TouchableHighlight underlayColor="#fff" key={button.text} onPress={() => this.onButtonPress(button)}>
                        <View style={renderButtonContainerStyle(button, size)}>
                            <Text style={{alignSelf: "center", fontSize: 30, color: '#fff'}}>
                                {button.text}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )
            });
        }

        return (
            <View style={{flex: 1, backgroundColor:"#FFFFFF"}}>
                <Header 
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer, underlayColor: 'rgba(255,255,255,0.5)', }}
                    rightComponent={<Highscore highscore={this.props.highscore} />}
                    backgroundColor="#D32F2F"
                />
                <View style={{ marginTop: 20, paddingLeft: 20, paddingRight: 20, backgroundColor: '#D32F2F' }}>
                    <FlatList
                        onScrollToIndexFailed={()=>{}}
                        ref={(inputList) => this.inputList = inputList}
                        contentContainerStyle={{alignContent: "center" }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={this.props.input}
                        keyExtractor={(item, index) => index + "" }
                        renderItem={this.renderItem}
                    />
                </View>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', alignContent: 'flex-end'}}>
                    {renderItems()}
                </View>
            </View>
        )
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
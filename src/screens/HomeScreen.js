import React, { Component } from 'react';
import { AsyncStorage, View, Button, StatusBar, FlatList, Text, Dimensions, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { pressNumber } from '../actions'

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

        this.state = {
            input: [
                {num: "3"},
                {num: "."}
            ]
        }
    }
    
    renderItem({item, index}) {
        return (
            <View style={{justifyContent: 'flex-end'}}>
                <Text style={{fontSize: 50, color: "#FFFFFF"}}>{item.num}</Text>
            </View>
        )
    }
    
    
    _calculateItemSize() {
        let {height, width} = Dimensions.get('window');
        return (width - paddingValue * 6) / 3;
    }

    componentWillReceiveProps(nextProps) {
        if (this.inputList && nextProps.currentIndex != this.props.currentIndex) this.inputList.scrollToIndex({index: this.props.input.length - 1, viewPosition: 0.4 });
    }

    onButtonPress(button) {
        let success = this.props.pressNumber(this.props.navigation, {number: button.text, currentIndex: this.props.currentIndex, list: this.inputList});
        if(success) this.inputList.scrollToEnd();
        // this.setState({input: [...this.state.input, {num: button.text}]})
        // this.inputList.scrollToEnd();
    }

    render() {
        let size = this._calculateItemSize();
        let navigate = this.props.navigation.navigate;
        
        let renderButtonContainerStyle = (button, size) => {
            return {
                width: size, 
                height: size, 
                backgroundColor: "#FFFFFF", 
                margin: 8, 
                justifyContent: 'center',
                borderRadius: 5
            }
        }
        let renderItems = () => {
            return buttons.map((button, index) => {
                return (
                    <TouchableHighlight key={button.text} onPress={() => this.onButtonPress(button)}>
                        <View style={renderButtonContainerStyle(button, size)}>
                            <Text style={{alignSelf: "center", fontSize: 30}}>
                                {button.text}
                            </Text>
                        </View>
                    </TouchableHighlight>
                )
            });
        }

        
        return (
            <View style={{flex: 1, backgroundColor:"#B22222"}}>
                <View >
                    <FlatList
                        ref={(inputList) => this.inputList = inputList}
                        contentContainerStyle={{alignContent: "center"}}
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

const mapStateToProps = ({ game }) => {
    return {
        input: game.input,
        currentIndex: game.currentIndex
    }
}

export default connect(mapStateToProps, { pressNumber })(HomeScreen);
import React, { Component } from 'react';
import {  View, Button, StatusBar, FlatList, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { PI_LIST } from '../config/constants';

let piList = PI_LIST.split("").map((num) => {return {num}});

class LearnScreen extends Component {
    componentDidMount() {
        if (this.inputList) {
            setTimeout(() => {
                this.inputList.scrollToIndex({index: this.props.highscore, viewOffset: 0, viewPosition: 0.5, animated: true });
            }, 500)
        }
    }

    renderItem({item, index}) {
        let highscoreStyle = index === this.props.highscore ? { fontWeight: '900' } : {}
        let renderMarker = (index) => {
            if (index % 10 == 0) {
                return (
                    <Text style={[{alignSelf: 'center', color: "#D32F2F"}, highscoreStyle]}>{index}</Text>
                )
            }
        }
        return (
            <View style={{justifyContent: 'flex-end'}}>
                {renderMarker(index)}
                <Text style={[{fontSize: 50, color: "#D32F2F", margin: 2}, highscoreStyle]}>{item.num}</Text>
            </View>
        )
    }

    renderItem = this.renderItem.bind(this);
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor:"#FFFFFF"}}>
                <Header 
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
                    backgroundColor="#D32F2F"
                />
                <View style={{ flex: 1, marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <FlatList
                    ref={(inputList) => this.inputList = inputList}
                    onScrollToIndexFailed={()=>{}}
                    decelerationRate="fast"
                    snapToAlignment="center"
                    snapToInterval={80}
                    contentContainerStyle={{justifyContent: "center", alignContent: "center", alignSelf: "center"}}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    data={piList}
                    keyExtractor={(item, index) => index + "" }
                    renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        highscore: state.auth.highscore
    }
}

export default connect(mapStateToProps)(LearnScreen);
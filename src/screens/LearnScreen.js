import React, { Component } from 'react';
import {  View, Button, StatusBar, FlatList, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import { PI_LIST } from '../config/constants';
import PiList from '../components/PiList';

let piList = PI_LIST.split("").map((num) => {return {num}});

class LearnScreen extends Component {

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
            <View style={{justifyContent: 'flex-end', borderBottomColor: "#D32F2F", borderBottomWidth: 2}}>
                {renderMarker(index)}
                <Text style={[{fontSize: 50, color: "#D32F2F", margin: 2, marginBottom: -6}, highscoreStyle]}>{item.num}</Text>
            </View>
        )
    }
    renderItem = this.renderItem.bind(this);

    setRef(list) {
        this.inputList = list;
    }
    setRef = this.setRef.bind(this);

    onMount() {
        setTimeout(() => {
            this.inputList.scrollToIndex({index: this.props.highscore, viewOffset: 0, viewPosition: 0.5, animated: true });
        }, 800)
    }
    onMount = this.onMount.bind(this);

    render() {
        return (
            <View style={{flex: 1, backgroundColor:"#FFFFFF"}}>
                <Header 
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
                    backgroundColor="#D32F2F"
                />
                <View style={{ flex: 1, marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <PiList
                    onMount={this.onMount}
                    renderItem={this.renderItem} 
                    setRef={this.setRef} 
                    data={piList} 
                    decelerationRate="fast"
                    snapToAlignment="center"
                    snapToInterval={80}
                    contentContainerStyle={{justifyContent: "center", alignContent: "center", alignSelf: "center"}}/>
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
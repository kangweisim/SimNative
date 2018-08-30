import React, { Component } from 'react';
import {  View, Button, StatusBar, FlatList, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { PI_LIST } from '../config/constants';

let piList = PI_LIST.split("").map((num) => {return {num}});

class LearnScreen extends Component {

    renderItem({item, index}) {
        let renderMarker = (index) => {
            if (index % 10 == 0) {
                return (
                    <Text style={{alignSelf: 'center', color: "#8B0000"}}>{index}</Text>
                )
            }
        }
        return (
            <View style={{justifyContent: 'flex-end'}}>
                {renderMarker(index)}
                <Text style={{fontSize: 50, color: "#8B0000", margin: 2}}>{item.num}</Text>
            </View>
        )
    }
    
    render() {
        return (
            <View style={{flex: 1, backgroundColor:"#FFFFFF"}}>
                <Header 
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: this.props.navigation.toggleDrawer }}
                    backgroundColor="#8B0000"
                />
                <View style={{ flex: 1, marginTop: 20, paddingLeft: 20, paddingRight: 20 }}>
                    <FlatList
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

export default LearnScreen;
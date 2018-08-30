import React, { Component } from 'react';
import { AsyncStorage, View, Button, StatusBar, FlatList, Text } from 'react-native';
import { PI_LIST } from '../config/constants';

let piList = PI_LIST.split("").map((num) => {return {num}});

class LearnScreen extends Component {

    renderItem({item, index}) {
        let renderMarker = (index) => {
            if (index % 10 == 0) {
                return (
                    <Text style={{alignSelf: 'center', color: "#FFFFFF"}}>{index}</Text>
                )
            }
        }
        return (
            <View style={{justifyContent: 'flex-end'}}>
                {renderMarker(index)}
                <Text style={{fontSize: 50, color: "#FFFFFF", margin: 2}}>{item.num}</Text>
            </View>
        )
    }
    
    render() {
        return (
            <View style={{flex: 1, alignItems: "center", backgroundColor:"#B22222"}}>
            <FlatList
            contentContainerStyle={{justifyContent: "center", alignContent: "center", alignSelf: "center"}}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={piList}
            keyExtractor={(item, index) => index + "" }
            renderItem={this.renderItem}
            />
            </View>
        );
    }
}

export default LearnScreen;
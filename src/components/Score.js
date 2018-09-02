import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';

class Score extends Component {
    componentWillMount() {
        this.springValue = new Animated.Value(1);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.highscore > this.props.highscore) {
            this.springValue.setValue(0.4);
            Animated.spring(this.springValue, {
                toValue: 1,
                friction: 100,
                velocity: 5,
            }).start();
        }
    }
    
    render() {
        return (
            <View 
            style={{
                flex: 1, 
                justifyContent: "center",
                backgroundColor: "#D32F2F",
            }}
            >
                <Text style={{ flex: 1, alignSelf: "flex-end" }}>Hello</Text>
                <View style={{ flex: 1, backgroundColor: "#000000", justifyContent: "center"}}>
                    <View style={{flex: 1, justifyContent: "flex-end"}}>
                    <Text 
                    style={{
                        fontSize: 18, 
                        color: '#FFF',
                        alignSelf: "center",
                        fontFamily: "montserrat-medium"
                    }}>
                    Score
                    </Text>
                    </View>
                </View>
                <Animated.View 
                    style={{ 
                        flex: 2,
                        justifyContent: "center",
                        backgroundColor: "#F0F0F0",
                        // backgroundColor: "#D32F2F", 
                        transform: [{scale: this.springValue}]}}>
                        <Text 
                        style={{
                            fontSize: 32, 
                            color: '#FFF',
                            alignSelf: "center",
                            fontFamily: "montserrat-medium"
                        }}>
                        {this.props.highscore}
                        </Text>
                        
                    </Animated.View>
            </View>
                
            );
        }
    }
    
    export default Score;
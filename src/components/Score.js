import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

class Score extends Component {
    componentWillMount() {
        this.springValueHighscore = new Animated.Value(1);
        this.springValueScore = new Animated.Value(1);
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.highscore > this.props.highscore) {
            this.springValueHighscore.setValue(0.4);
            Animated.spring(this.springValueHighscore, {
                toValue: 1,
                friction: 100,
                velocity: 5,
            }).start();
        }
        if (nextProps.score > this.props.score) {
            this.springValueScore.setValue(0.4);
            Animated.spring(this.springValueScore, {
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
                borderBottomColor: "#FFF", 
                borderBottomWidth: 1,
                shadowColor: "#0F0F0F",
                shadowOpacity: 0.1,
                shadowRadius: 3,
                zIndex: 2,
                shadowOffset: {height: 2, width: 0 }
                
            }}
            >
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", marginTop: 3 }}>
                    <Animated.Text style={{ color:"#FFF", fontFamily: "montserrat", fontSize: 25, transform: [{scale: this.springValueHighscore}]}}>
                    {this.props.highscore} 
                    </Animated.Text>
                    <Text  style={{ marginTop: 3, marginLeft: 3, marginRight: 5 }}>
                        <FontAwesome name="trophy" color="#FFFFFF" size={24} />
                    </Text>
                </View>
                
                <View style={{ flex: 1, justifyContent: "center"}}>
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
                        backgroundColor: "#D32F2F", 
                        transform: [{ scale: this.springValueScore }]}}>
                        <Text 
                        style={{
                            fontSize: 32, 
                            color: '#FFF',
                            alignSelf: "center",
                            fontFamily: "montserrat-medium"
                        }}>
                        {this.props.score}
                        </Text>
                        
                    </Animated.View>
            </View>
                
            );
        }
    }
    
    export default Score;
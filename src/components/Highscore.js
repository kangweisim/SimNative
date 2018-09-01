import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';

class Highscore extends Component {
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
            <Animated.View style={{transform: [{scale: this.springValue}]}}>
                <Text 
                style={{
                    fontSize: 18, 
                    color: '#fff'
                }}>
                {this.props.highscore}
                </Text>
            </Animated.View>
        );
    }
}

export default Highscore;
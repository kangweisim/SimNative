import React, { Component } from 'react';
import { View, Animated, Text } from 'react-native';

class MessageArea extends Component {
    constructor(props) {
        super(props);
    }
    
    componentWillMount() {
        this.springValueMessage = new Animated.Value(1);
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps != this.springValueMessage.messageEvent) {
        //     Animated.spring(this.springValueMessage).stop();
        //     this.springValueMessage.setValue(0.8);
        //     Animated.spring(this.springValueMessage, {
        //         toValue: 1,
        //         stiffness: 1000,
        //         damping: 10000,
        //         mass: 0.1
        //     }).start();
        // }
    }

    componentWillUpdate() {
        
    }
    render() {
        let messageEvent = this.props.messageEvent;
        if (!messageEvent) messageEvent = {type:"", message: ""}
        return (
            <View style={{
                backgroundColor: "#D32F2F",
                justifyContent: "center",
                alignSelf: "center",
                // transform: [{scale: this.springValueMessage}],
            }}>
                <Text style={{
                    color: "#FFF", 
                    fontSize: 30, 
                    alignSelf: "center", 
                    textAlign: "center", 
                    fontFamily: "montserrat-medium"}}>
                    {messageEvent.message}
                </Text>
                <Text style={{
                    color: "#FFF", 
                    fontSize: 14, 
                    alignSelf: "center", 
                    textAlign: "center",
                    fontFamily: "montserrat"
                    }}>{messageEvent.subtitle}</Text>
            </View>
        );
    }
}

export default MessageArea;
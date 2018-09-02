import React, { Component } from 'react';
import { FlatList } from 'react-native';

class PiList extends Component {
    componentDidMount() {
        if(this.props.onMount) {
            this.props.onMount();
        }
    }
    render() {
        return (
            <FlatList
            onScrollToIndexFailed={()=>{}}
            ref={this.props.setRef}
            contentContainerStyle={{alignContent: "center", alignSelf: "center" }}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={this.props.data}
            keyExtractor={(item, index) => index + "" }
            renderItem={this.props.renderItem}
            decelerationRate={this.props.decelerationRate}
            snapToAlignment={this.props.snapToAlignment}
            snapToInterval={this.props.snapToInterval}
            contentContainerStyle={this.props.contentContainerStyle}
            />
        )
    }
}

export default PiList;
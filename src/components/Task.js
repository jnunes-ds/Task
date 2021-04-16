import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default props => {
    return (
        <View style={styles.container}>
            <Text>{props.desc}</Text>
            <Text>{props.estimateAt + ""}</Text>
            <Text>{props.done + ""}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        alignItems: 'center',
        paddingVertical: 10,
    },
});
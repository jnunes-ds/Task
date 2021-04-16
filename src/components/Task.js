import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commomStyles';

export default props => {
    const Done = !props.done ? "" : props.done + "";
    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.done)}
            </View>
            <View>
                <Text>{props.desc}</Text>
                <Text>{props.estimateAt + ""}</Text>
                <Text>{Done}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt){
    if(doneAt){
        return (
            <View style={styles.done}>
                <Icon 
                    name="check"
                    size={20}
                    color="#FFF" 
                />
            </View>
            )
    }else{
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#AAA',
        alignItems: 'center',
        paddingVertical: 10,
    },
    checkContainer: {
        width: "20%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
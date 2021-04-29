import React from 'react';
import { 
    View, Text, StyleSheet, 
    Alert, TouchableWithoutFeedback 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment  from 'moment';
import 'moment/locale/en-ca';

import commonStyles from '../commomStyles';

export default props => {
    const doneOrNotStyle = props.done 
    ? { textDecorationLine: 'line-through' }
    : {}
    
    const Date = !props.done ? props.estimateAt : props.done;
    
    const formattedDate = moment(Date).locale('en-ca')
        .format('ddd, MMMM D');
    
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback
                onPress={() => props.toggleTask(props.id)}
            >
                <View style={styles.checkContainer}>
                    {getCheckView(props.done)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text 
                    style={[styles.desc, doneOrNotStyle]}
                >
                    {props.desc}
                    </Text>
                <Text style={styles.date}>{formattedDate}</Text>
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
    }, 
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subtext,
    }
});
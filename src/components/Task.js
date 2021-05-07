import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    TouchableWithoutFeedback,
    TouchableOpacity 
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';'react-native-gesture-handler/Swipeable';
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
    
    const getRightContent = () => {
        return (
            <TouchableOpacity
                style={styles.right}
                onPress={() => props.onDelete && props.onDelete(props.id)}
            >
                <Icon 
                    name="trash"
                    size={30}
                    color="#FFF"
                />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon 
                    name="trash"
                    size={20}
                    color="#FFF"
                    style={styles.excludeIcon}
                />
                <Text style={styles.excludeText}>Delete</Text>
            </View>
        )
    }

    return (
        <Swipeable
            renderLeftActions={getLeftContent}
            renderRightActions={getRightContent}
            onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}
        >
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}
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
        </Swipeable>
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
        backgroundColor: '#FFF'
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
    },
    excludeIcon: {
        marginLeft: 10
    },
    excludeText: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 20,
        margin: 10
    },
    left: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center'
    },
    right: {
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    }
});
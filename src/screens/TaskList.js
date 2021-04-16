import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/en-ca';

import commonStyles from '../commomStyles';
import todayImage from '../../assets/imgs/today.jpg';


export default class TaskList extends Component{
    render(){
        const today = moment()
            .locale('en-ca')
            .format('ddd, MMMM D, Y')
            
        return(
            <View style={styles.container}>
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Today</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>Task#01</Text>
                    <Text>Task#02</Text>
                    <Text>Task#03</Text>
                </View>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 30
    }
});
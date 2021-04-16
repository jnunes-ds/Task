import React, { Component } from 'react';
import { ImageBackground, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/en-ca';

import todayImage from '../../assets/imgs/today.jpg';


export default class TaskList extends Component{
    render(){
        const today = moment()
            .locale('en-ca')
            .format('ddd, MMMM D')
            
        return(
            <View style={styles.container}>
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.titleBar}>
                        <Text style={styles.today}>Today</Text>
                        <Text style={styles.today}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <Text>TaskList</Text>
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
    today: {
        color: '#EEE',
        fontSize: 30,
        fontFamily: 'Helvetica'
    }
});
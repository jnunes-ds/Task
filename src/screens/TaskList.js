import React, { Component } from 'react';
import { 
    ImageBackground, Text, View, 
    StyleSheet, FlatList 
} from 'react-native';
import moment from 'moment';
import 'moment/locale/en-ca';

import commonStyles from '../commomStyles';
import todayImage from '../../assets/imgs/today.jpg';

import Task from '../components/Task';


export default class TaskList extends Component{
    state = {
        tasks: [
            {
                id: Math.random(),
                desc: 'Comprar Livro de React-Native',
                estimateAt:  new Date(),
                done: new Date()
            },
            {
                id: Math.random(),
                desc: 'Ler Livro de React-Native',
                estimateAt:  new Date(),
                done: null
            }
        ]
    }

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
                    <FlatList 
                        data={this.state.tasks}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => <Task {...item} />}
                    />
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
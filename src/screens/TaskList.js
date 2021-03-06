import React, { Component } from 'react';
import { 
    ImageBackground, 
    Text, 
    View, 
    StyleSheet, 
    FlatList, 
    TouchableOpacity, 
    Platform,
    Alert 
} from 'react-native';
import moment from 'moment';
import 'moment/locale/en-ca';

import AsyncStorage from '@react-native-community/async-storage';'@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome';

import commonStyles from '../commomStyles';
import todayImage from '../../assets/imgs/today.jpg';

import Task from '../components/Task';
import AddTask from './AddTask'
import commomStyles from '../commomStyles';

const initialState = {
    showDoneTasks: true,
    showAddTask: false,
    visibleTasks: [],
    tasks: []
}

export default class TaskList extends Component{
    state = {
        ...initialState
    }

    componentDidMount = async () => {
        const stateString = await AsyncStorage.getItem('tasksState');
        const state = JSON.parse(stateString) || initialState;
        this.setState(state, this.filterTasks);
    }

    toggleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks){
            visibleTasks = [...this.state.tasks]
        }else{
            const pending = task => task.done === null;
            visibleTasks = this.state.tasks.filter(pending);
        }

        this.setState({ visibleTasks })
        AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
    }

    toggleTask = taskId => {
        const tasks = [...this.state.tasks]
        tasks.forEach(task => {
            if(task.id === taskId){
                task.done = task.done ? null : new Date();
            }
        });

        this.setState({ tasks }, this.filterTasks)
    }

    addTask = newTask => {
        if(!newTask.desc || !newTask.desc.trim()){
            Alert.alert('Dados Inválidos', 'Descrição não informada!');
            return
        }  
        const tasks = [...this.state.tasks];
        tasks.push({
            id: Math.random(),
            desc: newTask.desc,
            estimateAt: newTask.date,
            done: null
        })

        this.setState({ tasks, showAddTask: false }, this.filterTasks)
    }

    deleteTask = id => {
        const tasks = this.state.tasks.filter(task => task.id !== id);
        this.setState({ tasks }, this.filterTasks)
    }

    render(){
        const today = moment()
            .locale('en-ca')
            .format('ddd, MMMM D, Y')
            
        return(
            <View style={styles.container}>
                <AddTask 
                    isVisible={this.state.showAddTask}
                    onCancel={() => this.setState({ showAddTask: false })}
                    onSave={this.addTask}
                />
                <ImageBackground
                    source={todayImage}
                    style={styles.background}
                >
                    <View style={styles.iconBar}>
                        <TouchableOpacity
                            onPress={this.toggleFilter}
                        >
                            <Icon 
                                name={
                                    this.state.showDoneTasks
                                    ? 'eye' : 'eye-slash'
                                }
                                size={20}
                                color={commomStyles.colors.secondary} 
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Today</Text>
                        <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                    <FlatList 
                        data={this.state.visibleTasks}
                        keyExtractor={item => String(item.id)}
                        renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask} onDelete={this.deleteTask}/>
                        }
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.addButton}
                    onPress={() => this.setState({ showAddTask: true })}
                >
                    <Icon 
                        name="plus"
                        size={20}
                        color={commomStyles.colors.secondary}
                    />
                </TouchableOpacity>
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
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: Platform.OS == 'ios' ? 40 : 10
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: commomStyles.colors.today,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
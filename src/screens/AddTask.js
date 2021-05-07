import React, { Component } from 'react';
import {
    Platform,
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';

import moment from  'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

import commomStyles from '../commomStyles';


const initialState = { 
    desc: '', 
    date: new Date(), 
    showDatePicker: false 
}
export default class AddTask extends Component{
    
    state = {
        ...initialState 
    }

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date
        }

        this.props.onSave && this.props.onSave(newTask);
        this.setState({ ...initialState })
    }

    getDatePicker = () => {
        let datePicker = (
            <DateTimePicker 
                value={this.state.date}
                onChange={(_, date) => this.setState({
                     date,
                     showDatePicker: false 
                    })}
                mode="date"
            />
        );

        const dateString = moment(this.state.date).format('ddd, MMMM d, YYYY')

        if(Platform.OS === 'android'){
            datePicker = (
                <View>
                    <TouchableOpacity 
                        onPress={() => this.setState({ showDatePicker: true })}
                    >
                        <Text style={styles.date}>
                            { dateString }
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            );
        }
        return datePicker;
    }
    
    render(){
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.overlay}>
                        
                    </View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova tarefa</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Informe a descrição..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc}    
                    />
                    {this.getDatePicker()}
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={this.props.onCancel}
                        >
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={this.save}
                        >
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}
                >
                    <View style={styles.overlay}>
                        
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        backgroundColor: commomStyles.colors.today,
        fontFamily: commomStyles.fontFamily,
        color: commomStyles.colors.secondary,
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 18,
        padding: 15
    },
    input: {
        fontFamily: commomStyles.fontFamily,
        width: '90%',
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commomStyles.colors.today
    },
    date: {
        fontFamily: commomStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15
    }
});
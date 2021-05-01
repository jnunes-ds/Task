import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';
import commomStyles from '../commomStyles';


const initialState = { desc: '' }
export default class AddTask extends Component{
    
    state = {
        ...initialState 
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
                    <View style={styles.buttons}>
                        <TouchableOpacity
                            onPress={this.props.onCancel}
                        >
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
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
    }
});
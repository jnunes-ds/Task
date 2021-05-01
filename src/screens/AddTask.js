import React, { Component } from 'react';
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    Text,
} from 'react-native';
import commomStyles from '../commomStyles';

export default class AddTask extends Component{
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
        flex: 3,
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
    }
});
import React from 'react';
import {  Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { windowHeigt, windowWidth } from '../utils/Dimentions';

const StandardButton = ({buttonTitle, ...rest}) => {
    return (
        <TouchableOpacity style={styles.buttonContainer} {...rest}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};

export default StandardButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        marginBottom: 10,
        width: windowWidth/1.5,
        height: 65,
        backgroundColor: '#2e64e5',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
    buttonText:{
        fontSize: 19,
        fontWeight: 'bold',
        color: '#ffff',
    },
});
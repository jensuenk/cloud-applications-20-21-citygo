import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { windowWidth } from '../utils/Dimentions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const GoogleButton = ({ buttonTitle, btnType, color, backgroundColor, ...rest }) => {
    let bgColor = backgroundColor;
    return (
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: bgColor }]} {...rest}>
            <View style={styles.iconWrapper}>
                <FontAwesome name={btnType} style={styles.icon} size={22} color={color} />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
            </View>

        </TouchableOpacity>
    );
};

export default GoogleButton;

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 15,
        marginBottom: 10,
        width: windowWidth/1.5,
        height: 65,
        flexDirection: 'row',
        padding: 10,
        borderRadius: 3,
    },
    iconWrapper:{
        width: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        fontWeight: 'bold',
    },
    btnTxtWrapper:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
    },
});
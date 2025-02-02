import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

const InputField = ({labelValue, placeholderText, iconType, ...rest}) => {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <AntDesign name={iconType} size={25} color="#666"/>
            </View>
            <TextInput
                style={styles.input}
                value={labelValue}
                placeholder={placeholderText}
                placeholderTextColor='#666'
                {...rest}
            />
        </View>
    );
};

export default InputField;

const styles = StyleSheet.create({
    inputContainer:{
        marginTop:5,
        marginBottom: 10,
        width: '100%',
        height: 65,
        borderColor: '#ccc',
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    iconStyle:{
        padding:10,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor:'#ccc',
        borderRightWidth:1,
        width:50,
    },
    input:{
        padding:10,
        flex:1,
        fontSize:16,
        color:'#333',
        justifyContent:'center',
        alignItems:'center',
    },
});
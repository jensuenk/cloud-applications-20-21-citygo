import {StyleSheet, View, Text} from 'react-native';
import * as React from 'react';
import Map from './Map';

const MainScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Map />
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#ebeced',
        padding: 15,
        alignItems:"center",
        justifyContent:"center",
        flex:1,
    },
    text:{
        color: "#000000",
        fontSize: 20,
    },
});


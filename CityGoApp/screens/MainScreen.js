import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Map from './Map';
import StandardButton from '../components/StandardButton';
import Firebase from '../config/Firebase';
import { Component } from 'react';

class MainScreen extends React.Component {

    signOut = () => {
        Firebase.auth()
            .signOut()
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch(error => console.log(error))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>MAIN screen</Text>

                <StandardButton
                    buttonTitle="Log Out"
                    onPress={() => { this.signOut() }}
                />
            </View>
        );
    }
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebeced',
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    text: {
        color: "#000000",
        fontSize: 20,
    },
});


import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import Map from './Map';
import StandardButton from '../components/StandardButton';
import Firebase from '../config/Firebase';
import { Component } from 'react';
import AuthNavigator from '../navigation/AuthStack';
import ApplicationNavigator from '../navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

class MainScreen extends React.Component {

    signOut = () => {
        Firebase.auth()
            .signOut()
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch(error => console.log(error))
    }

    render() {
        console.log("testje")
        return (
            <NavigationContainer independent={true}>
                <ApplicationNavigator />
            </NavigationContainer>
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


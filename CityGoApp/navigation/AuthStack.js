import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

const AuthSwitchNavigator = createSwitchNavigator({
    WelcomeScreen: WelcomeScreen,
    LoginScreen: LoginScreen,
    RegisterScreen: RegisterScreen,
    MainScreen: MainScreen,
    },
    {
        initialRouteName: 'WelcomeScreen',
    });


const AuthNavigator = createAppContainer(AuthSwitchNavigator);

export default AuthNavigator;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
import React, { Component, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';

import Firebase from '../config/Firebase';


class RegisterScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: '', 
            confirmPassword:''
        };
    }

    handleSignUp = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch(error => console.log(error))
    }
    

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Create your profile here!</Text>
                <InputField
                    labelValue={this.state.email}
                    onChangeText={(email) => this.setState({ email })}
                    placeholderText="Email"
                    iconType="user"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                <InputField
                    labelValue={this.state.confirmPassword}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    placeholderText="Confirm Password"
                    iconType="lock"
                    secureTextEntry={true}
                />

                <View>
                    <Text style={styles.textPrivate}>By registering you agree with our Terms of Service and Privacy Policy.</Text>
                </View>


                <StandardButton
                    buttonTitle="Register Now"
                    onPress={() => { this.handleSignUp() }}
                />

                <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('LoginScreen')}>
                    <Text style={styles.navButtonText} >Already registered? Sign in</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
    },
    text: {
        fontSize: 27,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    forgotButton: {
        marginVertical: 35,
    },
    navButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#2e64e5',
    },
    textPrivate: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 19,
        textAlign: "center",
    },
});
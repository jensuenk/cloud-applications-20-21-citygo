import React, { createContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, Animatable } from 'react-native';
import StandardButton from '../components/StandardButton';
import InputField from '../components/InputField';
import Firebase from '../config/Firebase';

import AuthNavigator from '../navigation/AuthStack';
import ApplicationNavigator from '../navigation/AppStack';
import { NavigationContainer } from '@react-navigation/native';

class LoginScreen extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: '', 
            password:'',
            isValidEmail:true,
            isValidPassword:true,
            isValidLogin:true,
        };
        global.Myuser=false;
    }

    handleValidPassword = (val) => {
        if(val.trim().length >= 6){
            this.state.isValidPassword = true;
        }
        else{
            this.state.isValidPassword = false;
        }
    }

    handleValidEmail = (val) => {
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (val.trim().length >= 5) {
            if(regEmail.test(val)){
                this.state.isValidEmail = true;
            }
            else{
                this.state.isValidEmail = false;
            }
        }
        else {
            this.state.isValidEmail = false;
        }
    }

    handleInvalidUserInput = () => {
        this.state.isValidLogin = false;
    }

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(global.Myuser = true, this.props.navigation.navigate("MainScreen"))                       
            .catch(error=> console(error), this.handleInvalidUserInput())  
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/LogoWelcome.png')}
                    style={styles.logo}
                />
                <InputField
                    labelValue={this.state.email}
                    onChangeText={(email) => this.setState({ email },(email) => this.handleValidEmail(this.state.email))}
                    placeholderText="Email"
                    iconType="user"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                { this.state.isValidEmail ? null :
                <Text style={styles.errorMessage}>The email needs to look like xxx@domain.</Text>
                }

                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password }, (password) => this.handleValidPassword(this.state.password))}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                { this.state.isValidPassword ? null :
                <Text style={styles.errorMessage}>The password needs to be 6 characters long.</Text>
                }


                <StandardButton
                    buttonTitle="Log In"
                    onPress={() => { this.handleLogin() }}
                />
                { this.state.isValidLogin ? null :
                    <Text style={styles.errorMessage}>The combination of email and password is incorrect.</Text>
                }

                <TouchableOpacity style={styles.forgotButton} onPress={() => this.props.navigation.navigate('RegisterScreen')}>
                    <Text style={styles.navButtonText} >Not registered yet? Register here</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebeced',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'cover',
        marginBottom: 30,
        marginTop: 30,
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
        marginVertical: 20,
    },
    navButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: '#2e64e5',
    },
    errorMessage:{
        color: '#FE0000',
    }
});
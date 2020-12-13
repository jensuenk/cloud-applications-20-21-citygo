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
            isValidEmail:false,
            isValidPassword:false,
        };
        global.Myuser=false;
    }

    handleLogin = () => {
        Firebase.auth()
            .signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(global.Myuser = true, this.props.navigation.navigate("MainScreen"))                       
            .catch(error=> console(error))  
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
                    onChangeText={(email) => this.setState({ email })}
                    placeholderText="Email"
                    iconType="user"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                { this.state.isValidEmail ? null :
                <Text style={styles.errorMessage}>The email needs to look like xxx@domain</Text>
                }

                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password })}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                { this.state.isValidPassword ? null :
                <Text style={styles.errorMessage}>The password needs to be 6 characters long</Text>
                }


                <StandardButton
                    buttonTitle="Log In"
                    onPress={() => { this.handleLogin() }}
                />

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
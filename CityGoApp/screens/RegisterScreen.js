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
            username: '',
            isValidEmail: true,
            isValidPassword: true,
            isInvalidInput:true,
        };
    }

    handleSignUp = () => {
        Firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => this.props.navigation.navigate('LoginScreen'))
            .catch(error => console.log(error))
    }

    handleValidPassword = (val) => {
        if (val.trim().length >= 5) {
            this.state.isValidPassword = true;
        }
        else {
            this.state.isValidPassword = false;
        }
    }

    handleValidEmail = (val) => {
        var regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (val.trim().length >= 5) {
            if (regEmail.test(val)) {
                this.state.isValidEmail = true;
            }
            else {
                this.state.isValidEmail = false;
            }
        }
        else {
            this.state.isValidEmail = false;
        }
    }

    handleValidUsername = (val) => {
        if (val.trim().length >= 1) {
            this.state.isvalidUsername = true;
        }
        else {
            this.state.isvalidUsername = false;
        }
    }

    handleRegister = () => {
            if(this.state.isvalidUsername){
                console.log("username: ", this.state.username);
                if(this.state.isValidPassword){
                    console.log("password: ", this.state.password);
                    if(this.state.isValidEmail){
                        console.log("email: ", this.state.email);
                        this.handleSignUp();
                    }else{
                        alert("There is still invalid input, check each field before pushing the registration button.");
                    }
                }else{
                    alert("There is still invalid input, check each field before pushing the registration button.");
                }
            }else{
                alert("There is still invalid input, check each field before pushing the registration button.");
            }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Create your profile here!</Text>
                <InputField
                    labelValue={this.state.username}
                    onChangeText={(username) => this.setState({ username }, (username) => this.handleValidUsername(this.state.username))}
                    placeholderText="Username"
                    iconType="user"
                    secureTextEntry={false}
                    autoCapitalize="none"
                />
                {this.state.isvalidUsername ? null :
                    <Text style={styles.errorMessage}>The username has to be longer than 1 char.</Text>
                }


                <InputField
                    labelValue={this.state.email}
                    onChangeText={(email) => this.setState({ email }, (email) => this.handleValidEmail(this.state.email))}
                    placeholderText="Email"
                    iconType="user"
                    secureTextEntry={false}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {this.state.isValidEmail ? null :
                    <Text style={styles.errorMessage}>The email needs to look like xxx@domain</Text>
                }

                <InputField
                    labelValue={this.state.password}
                    onChangeText={(password) => this.setState({ password }, (password) => this.handleValidPassword(this.state.password))}
                    placeholderText="Password"
                    iconType="lock"
                    secureTextEntry={true}
                />
                {this.state.isValidPassword ? null :
                    <Text style={styles.errorMessage}>The password needs to be 6 characters long</Text>
                }

                <View>
                    <Text style={styles.textPrivate}>By registering you agree with our Terms of Service and Privacy Policy.</Text>
                </View>

                <StandardButton
                    buttonTitle="Register Now"
                    onPress={() => { this.handleRegister() }}
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
    errorMessage: {
        color: '#FE0000',
    },
    errorMessage2: {
        color: '#FE0000',
        fontSize: 23,
    }
});